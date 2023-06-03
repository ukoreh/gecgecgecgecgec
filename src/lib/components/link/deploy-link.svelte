<script lang="ts">
	import type { DeployUrl } from '@models';

	export let url: DeployUrl;
</script>

<div class="flex flex-col items-center">
	<p>👇</p>
	<a class="link link-primary" href={`${url}/index.html`} target="_blank" rel="noreferrer">{url}</a>
</div>
