<script lang="ts">
	import { DropInput, WorkflowJobStatusStepper } from '@components';
	import type { WorkflowJobStep } from '@models';

	const steps = new Array<WorkflowJobStep>(
		...[
			{
				name: 'Set up job',
				status: 'completed',
				conclusion: 'success',
				number: 1,
				started_at: '2023-05-15T20:15:18.000Z',
				completed_at: '2023-05-15T20:15:21.000Z'
			},
			{
				name: 'Clone or Checkout repository',
				status: 'completed',
				conclusion: 'success',
				number: 2,
				started_at: '2023-05-15T20:15:21.000Z',
				completed_at: '2023-05-15T20:15:23.000Z'
			},
			{
				name: 'Set up Flutter',
				status: 'in_progress',
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
	);
</script>

<DropInput />

<div class="flex justify-center">
	<WorkflowJobStatusStepper {steps} />
</div>
