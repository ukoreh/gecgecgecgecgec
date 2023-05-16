<script lang="ts">
	import { hasFinished, isRunning, type WorkflowJobStep } from '@models';
	import { Checkmark } from '../icon';

	export let steps: WorkflowJobStep[];
</script>

<ol class="steps steps-vertical">
	{#each steps as step}
		{#if isRunning(step)}
			<li class="step step-primary step-active overflow-hidden">
				<div class="spinner-simple" />
				<h3>{step.name}</h3>
			</li>
		{:else if hasFinished(step)}
			<li class="step step-primary step-done overflow-hidden">
				<div class="step-circle">
					<Checkmark />
				</div>
				<h3>{step.name}</h3>
			</li>
		{:else}
			<li class="step step-primary step-done overflow-hidden">
				<div class="step-circle">{step.number}</div>
				<h3>{step.name}</h3>
			</li>
		{/if}
	{/each}
</ol>
