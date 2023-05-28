<script lang="ts">
	import {
		AnimatedPointRight,
		DeployLink,
		DropInput,
		FeelingLuckyButton,
		IntroTransition,
		InvalidRepoUrlTransition,
		TriggerDeployButton,
		UkorehWizardCat,
		UnknownErrorTransition,
		WorkflowJobStatusStepper,
		WorkflowStatusDivider
	} from '@components';
	import { WorkflowJobStore } from '@stores';
	import { LL } from '@i18n';
	import { createRepoUrl } from '@models';

	type StepsState = 'input' | 'deploy-button' | 'stepper';

	const store = WorkflowJobStore;

	let visibility = false;

	let url: string;

	let currentState: StepsState = 'input';

	$: repoUrl = createRepoUrl(url);

	$: {
		if (repoUrl) {
			currentState = 'deploy-button';
		} else {
			currentState = 'input';
		}
	}

	let shouldTransitionToInvalidRepoUrl = false;
	let shouldTransitionToUnknownError = false;
	let useTypewriterTransition = false;

	$: shouldFocusDropInput = currentState === 'input';
	$: shouldFocusTriggerDeployButton = currentState === 'deploy-button';
	$: canShowTriggerDeployButton = repoUrl;
	$: canShowFeelingLuckyButton = !repoUrl;

	function triggerWorkflow() {
		if (repoUrl) {
			shouldTransitionToInvalidRepoUrl = false;
			shouldTransitionToUnknownError = false;
			useTypewriterTransition = false;

			currentState = 'stepper';

			store.trigger(repoUrl);
		}
	}

	function useRandomSampleLink() {
		useTypewriterTransition = true;

		url = store.randomLink();
	}

	function onTransitionEnd() {
		visibility = true;
	}

	store.subscribe(function (state) {
		if (state.failure && state.value.reason) {
			if (state.value.reason === 'invalid-repo-url') {
				shouldTransitionToInvalidRepoUrl = true;
				currentState = 'input';
			} else {
				shouldTransitionToUnknownError = true;
				currentState = currentState === 'stepper' ? 'deploy-button' : 'input';
			}
		}
	});
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

				<DropInput bind:value={url} bind:useTypewriterTransition disabled={$store.loading} />
			</form>

			<div class="flex flex-col items-center">
				<div class="pt-4 flex flex-row items-center">
					{#if canShowFeelingLuckyButton}
						<FeelingLuckyButton onClick={useRandomSampleLink} />
					{/if}

					{#if shouldFocusTriggerDeployButton}
						<AnimatedPointRight />
					{/if}

					{#if canShowTriggerDeployButton}
						<TriggerDeployButton onClick={triggerWorkflow} disabled={$store.loading} />
					{/if}
				</div>
				{#if $store.success || ($store.loading && $store.value.steps) || ($store.failure && $store.value.steps)}
					<div class="pt-4">
						<WorkflowStatusDivider />
						<WorkflowJobStatusStepper steps={$store.value.steps} />
					</div>

					{#if $store.success}
						<DeployLink url={$store.value.deployUrl} />
					{/if}
				{:else if $store.loading}
					<div class="pt-8" />
					<div class="flex flex-col items-center">
						<div class="spinner-circle" />
						<p class="pt-2">{$LL.startingWorkflow()}</p>
					</div>
				{/if}

				{#if shouldTransitionToInvalidRepoUrl}
					<InvalidRepoUrlTransition message={$store.value.message} />
				{/if}

				{#if shouldTransitionToUnknownError}
					<UnknownErrorTransition />
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
