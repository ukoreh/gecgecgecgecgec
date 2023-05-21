<script lang="ts">
	import { LL } from '@i18n';

	export let onClick: () => void;
</script>

<button class="btn btn-primary" on:click={onClick}>{$LL.deploy()}</button>
