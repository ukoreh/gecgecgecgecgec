<script lang="ts">
	import {
		DeployLink,
		DropInput,
		TriggerDeployButton,
		WorkflowJobStatusStepper
	} from '@components';
	import { WorkflowJobStore } from '@stores';

	const store = WorkflowJobStore;

	let repoUrl: string;
	let submittedRepoUrl: string;

	let hasRepoUrlChanged = false;

	$: {
		if (repoUrl?.length === 0 || repoUrl === submittedRepoUrl) {
			hasRepoUrlChanged = false;
		} else {
			hasRepoUrlChanged = true;
		}
	}

	function triggerWorkflow() {
		submittedRepoUrl = repoUrl;

		const url = new URL(repoUrl);

		store.trigger(url);
	}
</script>

<form on:submit|preventDefault={triggerWorkflow} action=".">
	<DropInput bind:value={repoUrl} />
</form>

<div class="flex flex-col items-center">
	{#if hasRepoUrlChanged}
		<TriggerDeployButton onClick={triggerWorkflow} />
	{/if}
	{#if $store.loading || $store.success}
		<WorkflowJobStatusStepper steps={$store.value.steps} />

		{#if $store.success}
			<DeployLink url={$store.value.deployUrl} />
		{/if}
	{/if}
</div>
