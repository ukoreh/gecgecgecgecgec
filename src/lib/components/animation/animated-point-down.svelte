<script lang="ts">
	import './index.css';

	export let includeSelfSpace = true;
</script>

<span class="point-animation-down">👇</span>

{#if includeSelfSpace}
	<div class="h-4" />
{/if}
