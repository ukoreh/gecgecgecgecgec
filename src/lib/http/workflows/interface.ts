import type { RepoUrl, WorkflowInit, WorkflowJob, WorkflowRunUrl } from '@models';

export interface Workflows {
	trigger(url: RepoUrl): Promise<WorkflowInit | Response>;
	status(id: WorkflowRunUrl): Promise<WorkflowJob | Response>;
}
