<script lang="ts">
	import type { DeployUrl } from '@models';
	import { AnimatedPointDown } from '../animation';

	export let url: DeployUrl;
</script>

<div class="flex flex-col items-center">
	<AnimatedPointDown />
	<a
		class="link link-primary text-center"
		href={`${url}/index.html`}
		target="_blank"
		rel="noreferrer">{url}</a
	>
</div>
