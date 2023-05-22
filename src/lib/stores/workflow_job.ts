import {
	hasJobCompleted,
	isLeft,
	type RepoUrl, type WorkflowInit,
	type WorkflowJob,
	type WorkflowRunUrl,
	unwrapLeft,
	unwrapRight
} from '@models';
import { createStore, type Store } from './store';
import { FoldClient, FolderWorkflowsImpl, type Workflows } from '@http';
import { State, from } from './state';

export const WorkflowJobStore = createWorkflowJobStore();

type WorkflowStateFailureReason = 'invalid-repo-url' | 'unknown-error';

type WorkflowStateFailure = {
	reason: WorkflowStateFailureReason,
	message: string,
};

type WorkflowState = WorkflowJob & WorkflowInit & WorkflowStateFailure;

function createWorkflowJobStore() {
	const store = createStore<WorkflowState>();
	const subscribe = store.subscribe;

	const workflows = new FolderWorkflowsImpl(new FoldClient());

	return {
		subscribe,
		trigger: (url: RepoUrl) => triggerBuildJob(url, workflows, store)
	};
}

async function triggerBuildJob(url: RepoUrl, workflows: Workflows, store: Store<WorkflowState>) {
	const init = await workflows.trigger(url);

	console.log(init)

	if (isLeft(init)) {
		const value = unwrapLeft(init);

		const reason: WorkflowStateFailureReason = value.status === 400 ? 'invalid-repo-url' : 'unknown-error';

		const state = from(<WorkflowState>{
			reason: reason,
			message: value.message
		}, State.failure);

		return store.set(state);
	}

	const value = unwrapRight(init);

	const job = await workflows.status(value.runUrl);

	if (isLeft(job)) {
		const value = unwrapLeft(init);

		const state = from(<WorkflowState>{
			reason: 'unknown-error',
			message: value.message
		}, State.failure);

		return store.set(state);
	}

	setInterval(() => updateJobState(value.runUrl, workflows, store), 6000);

	const state = from(<WorkflowState>{ ...unwrapRight(job), ...value }, State.loading);

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

	const state = completed ? State.success : State.loading;

	store.update((x) =>
		from(
			<WorkflowState>{
				...x.value,
				...job
			},
			state
		)
	);
}
