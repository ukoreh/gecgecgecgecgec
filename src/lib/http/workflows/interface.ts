import type { WorkflowInit, WorkflowJob, WorkflowRunId } from '@models';

export interface Workflows {
	trigger(url: RepoUrl): Promise<WorkflowInit | Response>;
	status(id: WorkflowRunId): Promise<WorkflowJob | Response>;
}
