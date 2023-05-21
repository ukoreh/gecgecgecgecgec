<script lang="ts">
	export let onClick: () => void;
</script>

<button class="btn btn-primary" on:click={onClick}>Deploy</button>
