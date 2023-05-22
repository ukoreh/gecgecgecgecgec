<script lang="ts">
	import { LL } from '@i18n';

	export let onClick: () => void;
	export let disabled: boolean = false;
</script>

<button class="btn btn-primary" on:click={onClick} {disabled}>{$LL.deploy()}</button>
