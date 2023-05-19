<script lang="ts">
	export let url: URL;
</script>

<div class="flex flex-col items-center">
	<p>👇</p>
	<a class="link link-primary" href="https://google.com" target="_blank" rel="noreferrer"
		>{url.href}</a
	>
</div>
