import type {
	Either,
	RepoUrl,
	WorkflowInit,
	WorkflowInitFailure,
	WorkflowJob,
	WorkflowJobId,
	WorkflowStepLogsFailure,
	WorkflowRunUrl,
	WorkflowStatusFailure
} from '@models';

export interface Workflows {
	trigger(url: RepoUrl): Promise<Either<WorkflowInitFailure, WorkflowInit>>;
	status(id: WorkflowRunUrl): Promise<Either<WorkflowStatusFailure, WorkflowJob>>;
	logs(id: WorkflowJobId): Promise<Either<WorkflowStepLogsFailure, string>>;
}
