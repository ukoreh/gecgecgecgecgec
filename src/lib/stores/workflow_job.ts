import type { WorkflowJob, WorkflowRunId } from '@models';
import { createStore, type Store } from './store';
import { FakeWorkflowsImpl, type Workflows } from '@http';
import { State, from } from './state';

export const WorkflowJobStore = createWorkflowJobStore();

function createWorkflowJobStore() {
	const store = createStore<WorkflowJob>();
	const subscribe = store.subscribe;

	const workflows = new FakeWorkflowsImpl();

	return {
		subscribe,
		observe: (id: WorkflowRunId) => observeJobState(id, workflows, store)
	};
}

async function observeJobState(id: WorkflowRunId, workflows: Workflows, store: Store<WorkflowJob>) {
	setInterval(() => updateJobState(id, workflows, store), 3000);
}

async function updateJobState(id: WorkflowRunId, workflows: Workflows, store: Store<WorkflowJob>) {
	const job = await workflows.status(id);

	if (job instanceof Response) {
		return;
	}

	const state = from<WorkflowJob>(job, State.success);

	store.set(state);
}
