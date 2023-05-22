<script lang="ts">
	export let value: string;
	export let disabled: boolean = false;
</script>

<input
	class="input input-block input-ghost-primary"
	placeholder="https://github.com/freitas-labs/flutter-extended-image-crop-info-callback-spike"
	type="text"
	bind:value
	{disabled}
/>
