<script lang="ts">
	import { typewriter } from '../transition';

	export let value: string;
	export let disabled = false;
	export let useTypewriterTransition: boolean = false;

	function transition(input: HTMLInputElement) {
		return typewriter(input, value);
	}
</script>

{#if useTypewriterTransition}
	<input
		class="input input-block input-ghost-primary"
		placeholder="https://github.com/freitas-labs/flutter-extended-image-crop-info-callback-spike"
		type="text"
		in:transition
		disabled={true}
	/>
{:else}
	<input
		class="input input-block input-ghost-primary"
		placeholder="https://github.com/freitas-labs/flutter-extended-image-crop-info-callback-spike"
		type="text"
		bind:value
		{disabled}
	/>
{/if}
