import {
	hasJobCompleted,
	type RepoUrl,
	type WorkflowInit,
	type WorkflowJob,
	type WorkflowRunUrl
} from '@models';
import { createStore, type Store } from './store';
import { FoldClient, FolderWorkflowsImpl, type Workflows } from '@http';
import { State, from } from './state';

export const WorkflowJobStore = createWorkflowJobStore();

type WorkflowState = WorkflowJob & WorkflowInit;

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

	if (init instanceof Response) {
		const state = from(<WorkflowState>{}, State.failure);

		return store.set(state);
	}

	const job = await workflows.status(init.runUrl);

	if (job instanceof Response) {
		const state = from(<WorkflowState>{}, State.failure);

		return store.set(state);
	}

	setInterval(() => updateJobState(init.runUrl, workflows, store), 6000);

	const state = from(<WorkflowState>{ ...job, ...init }, State.loading);

	return store.set(state);
}

async function updateJobState(
	id: WorkflowRunUrl,
	workflows: Workflows,
	store: Store<WorkflowState>
) {
	const job = await workflows.status(id);

	if (job instanceof Response) {
		return;
	}

	const completed = hasJobCompleted(job);

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
