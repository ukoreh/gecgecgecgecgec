<script lang="ts">
	import { DeployLink, DropInput, WorkflowJobStatusStepper } from '@components';
	import { hasJobCompleted } from '@models';
	import { WorkflowJobStore } from '@stores';

	const store = WorkflowJobStore;

	store.observe(2);
</script>

<DropInput />

<div class="flex flex-col items-center">
	{#if $store.success}
		<WorkflowJobStatusStepper steps={$store.value.steps} />

		{#if hasJobCompleted($store.value)}
			<DeployLink url={new URL('http://localhost:5173/')} />
		{/if}
	{/if}
</div>
