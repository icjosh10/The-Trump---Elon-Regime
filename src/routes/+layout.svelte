<script>
	const { data, children } = $props();
	import '$src/app.postcss';
	import SEO from '$components/SEO.svelte';
	import Navigation from '$lib/components/Navigation.svelte';
	import SuperDebug from 'sveltekit-superforms';
	import { dev } from '$app/environment';
	import { inject } from '@vercel/analytics';
	if (!dev) inject({ mode: 'production' });
</script>

<svelte:boundary>
	<SEO {data} />
	<Navigation />
	{@render children()}

	{#snippet failed(error, reset)}
		<div class="flex min-h-dvh flex-col items-center gap-4 bg-slate-950 p-10">
			<div class="bg-slate-700">{error}</div>
			<SuperDebug data={error} />
			<button onclick={reset}>oops! try again</button>
		</div>
	{/snippet}
</svelte:boundary>
