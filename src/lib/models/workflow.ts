export type WorkflowRunUrl = string;
export type DeployUrl = string;

type StepStatus = 'queued' | 'in_progress' | 'completed' | 'pending';
type StepConclusion =
	| 'success'
	| 'failure'
	| 'neutral'
	| 'cancelled'
	| 'skipped'
	| 'timed_out'
	| 'action_required';

export interface WorkflowInit {
	runUrl: WorkflowRunUrl;
	deployUrl: DeployUrl;
}

export interface WorkflowInitFailure {
	status: number;
	message: string;
}

export interface WorkflowStatusFailure {
	status: number;
}

export interface WorkflowJob {
	run_url: string;
	name: string;
	steps: WorkflowJobStep[];
}

export interface WorkflowJobStep {
	name: string;
	status: StepStatus;
	conclusion: StepConclusion;
	number: number;
	started_at: string;
	completed_at: string;
}

// todo: passar para metodos da interface e depois adicionar funcao que cria essa interface com um json
export function isRunning(step: WorkflowJobStep) {
	return step.status === 'in_progress' || step.status === 'pending';
}

export function hasFinished(step: WorkflowJobStep) {
	return step.status === 'completed';
}

export function hasJobCompleted(job: WorkflowJob) {
	return job.steps[job.steps.length - 1].status === 'completed';
}
