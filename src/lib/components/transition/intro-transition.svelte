<script lang="ts">
	import { onMount } from 'svelte';
	import { elasticOut } from 'svelte/easing';
	import { UkorehWizardCat } from '../image';

	export let onTransitionEnd: () => void;

	let trigger: object;

	onMount(() => (trigger = {}));

	function spin(node: Node) {
		return {
			duration: 3000,
			node: node,
			css: (tick: number) => {
				const eased = elasticOut(tick);

				return `transform: scale(${eased}) rotate(${eased * 720}deg);`;
			}
		};
	}
</script>

{#key trigger}
	<div class="flex justify-center">
		<div in:spin on:introend={onTransitionEnd}>
			<UkorehWizardCat />
		</div>
	</div>
{/key}
