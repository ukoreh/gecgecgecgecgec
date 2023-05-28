import {
	hasJobCompleted,
	isLeft,
	type RepoUrl,
	type WorkflowInit,
	type WorkflowJob,
	type WorkflowRunUrl,
	unwrapLeft,
	unwrapRight,
	hasJobFailed,
	hasFailed
} from '@models';
import { createStore, type Store } from './store';
import { FoldClient, FolderWorkflowsImpl, type Workflows } from '@http';
import { State, from } from './state';

export const WorkflowJobStore = createWorkflowJobStore();

const logsPrefixRegex =
	/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z) /g;

const endGroupSectionRegex = /##\[endgroup\]/g;
const errorSectionRegex = /##\[error\]/g;

type WorkflowStatestepFailureReason = 'invalid-repo-url' | 'unknown-error';

type WorkflowStateFailure = {
	reason: WorkflowStatestepFailureReason;
	message: string;
};

type WorkflowState = WorkflowJob & WorkflowInit & WorkflowStateFailure;

function createWorkflowJobStore() {
	const store = createStore<WorkflowState>();
	const subscribe = store.subscribe;

	const workflows = new FolderWorkflowsImpl(new FoldClient());

	return {
		subscribe,
		trigger: (url: RepoUrl) => triggerBuildJob(url, workflows, store),
		randomLink: () => sampleRandomLink()
	};
}

async function triggerBuildJob(url: RepoUrl, workflows: Workflows, store: Store<WorkflowState>) {
	let state = from(<WorkflowState>{}, State.loading);

	store.set(state);

	const init = await workflows.trigger(url);

	console.log(init);

	if (isLeft(init)) {
		const value = unwrapLeft(init);

		const reason: WorkflowStatestepFailureReason =
			value.status === 400 ? 'invalid-repo-url' : 'unknown-error';

		const state = from(
			<WorkflowState>{
				reason: reason,
				message: value.message
			},
			State.failure
		);

		return store.set(state);
	}

	const value = unwrapRight(init);

	const job = await workflows.status(value.runUrl);

	if (isLeft(job)) {
		const value = unwrapLeft(init);

		const state = from(
			<WorkflowState>{
				reason: 'unknown-error',
				message: value.message
			},
			State.failure
		);

		return store.set(state);
	}

	const callbackId = setInterval(() => updateJobState(value.runUrl, workflows, store), 6000);

	state = from(<WorkflowState>{ ...unwrapRight(job), ...value }, State.loading);

	store.subscribe(function (state) {
		if (state.success || state.failure) {
			clearInterval(callbackId);
		}
	});

	return store.set(state);
}

async function updateJobState(
	id: WorkflowRunUrl,
	workflows: Workflows,
	store: Store<WorkflowState>
) {
	const job = await workflows.status(id);

	if (isLeft(job)) {
		return;
	}

	const value = unwrapRight(job);

	const completed = hasJobCompleted(value);

	let state = State.loading;

	if (completed) {
		const failed = hasJobFailed(value);

		state = failed ? State.failure : State.success;
	}

	store.update((x) =>
		from(
			<WorkflowState>{
				...x.value,
				...value
			},
			state
		)
	);

	if (state === State.failure) {
		const logsTry = await workflows.logs(value.id);

		if (isLeft(logsTry)) {
			return;
		}

		const logs = unwrapRight(logsTry);

		const failureLogs =
			logs
				.split(endGroupSectionRegex)
				.findLast((x) => x)
				?.split(errorSectionRegex)
				?.find((x) => x)
				?.replaceAll(logsPrefixRegex, '> ')
				?.split('\n') ?? [];

		store.update(function (x) {
			const job = x.value;

			job.steps = job.steps.map(function (step) {
				if (hasFailed(step)) {
					step.logs = failureLogs;
				}

				return step;
			});

			return from(
				<WorkflowState>{
					...job
				},
				state
			);
		});
	}
}

function sampleRandomLink(): string {
	const links = [
		'https://github.com/freitas-labs/flutter-extended-image-crop-info-callback-spike',
		'https://github.com/KensukePark/Cryptocurrency_Wallet_App',
		'https://github.com/LezdCS/irl-link',
		'https://github.com/FCT-LOLU/smartshoeapp',
		'https://github.com/beratergnn/flutter_weather_app'
	];

	return links[Math.floor(Math.random() * links.length)];
}
