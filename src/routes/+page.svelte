<script lang="ts">
	import {
		DeployLink,
		DropInput,
		IntroTransition,
		TriggerDeployButton,
		UkorehWizardCat,
		WorkflowJobStatusStepper
	} from '@components';
	import { WorkflowJobStore } from '@stores';
	import { LL } from '@i18n';

	const store = WorkflowJobStore;

	let visibility = true;

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

	function onTransitionEnd() {
		visibility = true;
	}
</script>

<div class="cursor-wand flex flex-col h-screen">
	{#if !visibility}
		<div class="grow flex items-center self-center">
			<IntroTransition {onTransitionEnd} />
		</div>
	{:else}
		<div class="grow">
			<h1 class="pt-6 text-4xl text-center">{$LL.title()}</h1>
			<h2 class="pt-2 text-1xl text-center">{$LL.description()}</h2>

			<form class="px-8 pt-4" on:submit|preventDefault={triggerWorkflow} action=".">
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
		</div>

		<footer>
			<div class="flex justify-center sm:justify-end">
				<UkorehWizardCat />
			</div>
		</footer>
	{/if}
</div>
