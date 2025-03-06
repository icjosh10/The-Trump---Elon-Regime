<!-- App.svelte -->
<script>
	export let path;
	export let width;
	export let height;
	import { LottiePlayer } from '@lottiefiles/svelte-lottie-player';
	let ready;
</script>

<svelte:window bind:online={ready} />

{#if ready}
	<!-- Only set either width or height, not both -->
	<div style="width: {width}px; height: {height}px;">
		<LottiePlayer
			src={path}
			autoplay={true}
			loop={true}
			controls={false}
			controlsLayout="nodisplay"
			renderer="svg"
			background="transparent" />
	</div>
{/if}
