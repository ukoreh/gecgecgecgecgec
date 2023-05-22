import type { Either, RepoUrl, WorkflowInit, WorkflowInitFailure, WorkflowJob, WorkflowRunUrl, WorkflowStatusFailure } from '@models';

export interface Workflows {
	trigger(url: RepoUrl): Promise<Either<WorkflowInitFailure, WorkflowInit>>;
	status(id: WorkflowRunUrl): Promise<Either<WorkflowStatusFailure, WorkflowJob>>;
}
