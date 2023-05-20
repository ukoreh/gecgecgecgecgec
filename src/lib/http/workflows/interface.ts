import type { WorkflowInit, WorkflowJob, WorkflowRunId } from '@models';

export interface Workflows {
	trigger(url: URL): Promise<WorkflowInit | Response>;
	status(id: WorkflowRunId): Promise<WorkflowJob | Response>;
}
