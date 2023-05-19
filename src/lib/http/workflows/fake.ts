import { isRunning, type WorkflowJob, type WorkflowRunId } from '@models';
import type { Workflows } from './interface';

export class FakeWorkflowsImpl implements Workflows {
	private job = <WorkflowJob>{
		name: '',
		run_url: '',
		steps: [
			{
				name: 'Set up job',
				status: 'in_progress',
				conclusion: 'success',
				number: 1,
				started_at: '2023-05-15T20:15:18.000Z',
				completed_at: '2023-05-15T20:15:21.000Z'
			},
			{
				name: 'Clone or Checkout repository',
				status: 'queued',
				conclusion: 'success',
				number: 2,
				started_at: '2023-05-15T20:15:21.000Z',
				completed_at: '2023-05-15T20:15:23.000Z'
			},
			{
				name: 'Set up Flutter',
				status: 'queued',
				conclusion: 'success',
				number: 3,
				started_at: '2023-05-15T20:15:23.000Z',
				completed_at: '2023-05-15T20:16:17.000Z'
			},
			{
				name: 'Clean flutter',
				status: 'queued',
				conclusion: 'success',
				number: 4,
				started_at: '2023-05-15T20:16:17.000Z',
				completed_at: '2023-05-15T20:16:22.000Z'
			},
			{
				name: 'Get packages',
				status: 'queued',
				conclusion: 'success',
				number: 5,
				started_at: '2023-05-15T20:16:22.000Z',
				completed_at: '2023-05-15T20:16:27.000Z'
			}
		]
	};

	status(id: WorkflowRunId): Promise<WorkflowJob | Response> {
		console.info(`faking completion of workflow with run id = ${id}`);

		const lastRunning = this.job.steps.findLast((x) => isRunning(x));

		if (lastRunning == null) {
			return Promise.resolve(this.job);
		}

		const nextJobIndex = this.job.steps.indexOf(lastRunning) + 1;

		if (nextJobIndex < this.job.steps.length) {
			this.job.steps[nextJobIndex].status = 'in_progress';
		}

		console.log(this.job.steps);

		lastRunning.status = 'completed';

		return Promise.resolve(this.job);
	}
}
