<script lang="ts">
	import './index.css';

	export let includeSelfSpace = true;
</script>

<span class="point-animation">👉</span>

{#if includeSelfSpace}
	<div class="w-4" />
{/if}
