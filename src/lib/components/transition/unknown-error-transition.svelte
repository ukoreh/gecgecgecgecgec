<script lang="ts">
	import { onMount } from 'svelte';
	import { elasticOut } from 'svelte/easing';
	import { SadCat } from '../image';

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
		<SadCat />
		<p class="text-lg text-center">Oh no, something went wrong :(</p>
	</div>
{/key}
