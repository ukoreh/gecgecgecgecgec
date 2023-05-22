<script lang="ts">
	import { onMount } from 'svelte';
	import { elasticOut } from 'svelte/easing';
	import { SadCat } from '../image';

	export let onTransitionEnd: () => void;

	let trigger: object;

	onMount(() => (trigger = {}));

	function transition(node: Node) {
		return {
			duration: 3000,
			node: node,
			css: (tick: number) => {
				const eased = elasticOut(tick);

				return `transform: scale(${eased})`;
			}
		};
	}
</script>

{#key trigger}
	<div class="flex flex-col items-center" in:transition on:introend={onTransitionEnd}>
		<SadCat />
		<p class="text-lg text-center">Oh no, something went wrong :(</p>
	</div>
{/key}
