<script lang="ts">
	import { hasFailed, hasFinished, isRunning, wasSkipped, type WorkflowJobStep } from '@models';
	import { Checkmark, Cross, Minus } from '../icon';

	export let steps: WorkflowJobStep[];
</script>

<ol class="steps steps-vertical">
	{#each steps as step}
		{#if isRunning(step)}
			<li class="step step-primary step-active overflow-hidden">
				<div class="spinner-simple" />
				<h3>{step.name}</h3>
			</li>
		{:else if hasFailed(step)}
			<li class="step step-error step-done overflow-hidden">
				<div class="step-circle">
					<Cross />
				</div>
				<h3>{step.name}</h3>
			</li>
		{:else if wasSkipped(step)}
			<li class="step overflow-hidden">
				<div class="step-circle">
					<Minus />
				</div>
				<h3>{step.name}</h3>
			</li>
		{:else if hasFinished(step)}
			<li class="step step-success step-done overflow-hidden">
				<div class="step-circle">
					<Checkmark />
				</div>
				<h3>{step.name}</h3>
			</li>
		{:else}
			<li class="step step-primary step-done overflow-hidden">
				<div class="step-circle">{steps.length + 1}</div>
				<h3>{step.name}</h3>
			</li>
		{/if}
	{/each}
</ol>
