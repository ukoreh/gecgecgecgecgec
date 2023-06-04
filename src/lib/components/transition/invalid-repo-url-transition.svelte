<script lang="ts">
	import { onMount } from 'svelte';
	import { elasticOut } from 'svelte/easing';
	import { RandomCatGIF } from '../image';

	export let message: string;

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
	<div class="flex flex-col items-center" in:transition>
		<RandomCatGIF />
		<p class="text-lg text-center">Sorry, we don't do business with non repository links!</p>
		<p class="text-error text-center">({message})</p>
		<p class="text-lg text-center">Anyways, here's a cat gif for you.</p>
	</div>
{/key}
