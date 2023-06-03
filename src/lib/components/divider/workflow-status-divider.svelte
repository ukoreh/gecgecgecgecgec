<script lang="ts">
	import { LL } from '@i18n';

	export let includeLabel: boolean = true;
</script>

<div class="divider divider-horizontal">
	{#if includeLabel}
		{$LL.workflowDividerLabel()}
	{/if}
</div>
