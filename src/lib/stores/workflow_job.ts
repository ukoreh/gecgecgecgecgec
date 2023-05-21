import { hasJobCompleted, type WorkflowInit, type WorkflowJob, type WorkflowRunId } from '@models';
import { createStore, type Store } from './store';
import { FakeWorkflowsImpl, type Workflows } from '@http';
import { State, from } from './state';

export const WorkflowJobStore = createWorkflowJobStore();

type WorkflowState = WorkflowJob & WorkflowInit;

function createWorkflowJobStore() {
	const store = createStore<WorkflowState>();
	const subscribe = store.subscribe;

	const workflows = new FakeWorkflowsImpl();

	return {
		subscribe,
		trigger: (url: URL) => triggerBuildJob(url, workflows, store)
	};
}

async function triggerBuildJob(url: URL, workflows: Workflows, store: Store<WorkflowState>) {
	const init = await workflows.trigger(url);

	if (init instanceof Response) {
		const state = from(<WorkflowState>{}, State.failure);

		return store.set(state);
	}

	const job = await workflows.status(init.runId);

	if (job instanceof Response) {
		const state = from(<WorkflowState>{}, State.failure);

		return store.set(state);
	}

	setInterval(() => updateJobState(init.runId, workflows, store), 3000);

	const state = from(<WorkflowState>{ ...job, ...init }, State.loading);

	return store.set(state);
}

async function updateJobState(
	id: WorkflowRunId,
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
