<script lang="ts">
	import {
		AnimatedPointRight,
		DeployLink,
		DropInput,
		IntroTransition,
		TriggerDeployButton,
		UkorehWizardCat,
		WorkflowJobStatusStepper,
		WorkflowStatusDivider
	} from '@components';
	import { WorkflowJobStore } from '@stores';
	import { LL } from '@i18n';
	import { createRepoUrl } from '@models';

	const store = WorkflowJobStore;

	let visibility = true;

	let url: string;

	$: repoUrl = createRepoUrl(url);

	let shouldFocusDropInput = true;
	let shouldFocusTriggerDeployButton = false;

	$: {
		shouldFocusDropInput = !repoUrl;
		shouldFocusTriggerDeployButton = !shouldFocusDropInput;
	}

	function triggerWorkflow() {
		if (repoUrl) {
			shouldFocusTriggerDeployButton = false;

			store.trigger(repoUrl);
		}
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

			<form
				class="px-8 pt-4 flex flex-row items-center justify-between"
				on:submit|preventDefault={triggerWorkflow}
				action="."
			>
				{#if shouldFocusDropInput}
					<AnimatedPointRight />
				{/if}
				<DropInput bind:value={url} />
			</form>

			<div class="flex flex-col items-center">
				<div class="pt-4 flex flex-row items-center">
					{#if shouldFocusTriggerDeployButton}
						<AnimatedPointRight />
					{/if}

					<TriggerDeployButton onClick={triggerWorkflow} />
				</div>
				{#if $store.loading || $store.success}
					<div class="pt-4">
						<WorkflowStatusDivider />
						<WorkflowJobStatusStepper steps={$store.value.steps} />
					</div>

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
