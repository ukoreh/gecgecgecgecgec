export type WorkflowRunId = number;

export interface WorkflowJob {
	run_url: string;
	name: string;
	steps: WorkflowJobStep[];
}

export interface WorkflowJobStep {
	name: string;
	status: string;
	conclusion: string;
	number: number;
	started_at: string;
	completed_at: string;
}

export function isRunning(step: WorkflowJobStep) {
	return step.status === 'in_progress';
}

export function hasFinished(step: WorkflowJobStep) {
	return step.status === 'completed';
}

export function hasJobCompleted(job: WorkflowJob) {
	return job.steps[job.steps.length - 1].status === 'completed';
}
