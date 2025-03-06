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

<div class="relative min-h-screen bg-zinc-950 selection:bg-red-500/30 selection:text-white">
	<!-- Background elements -->
	<div class="fixed inset-0 -z-10 overflow-hidden">
		<!-- Animated gradient background -->
		<div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(50,20,60,0.15),rgba(0,0,0,0))]"></div>
		
		<!-- Accent lines -->
		<div class="absolute top-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-red-500/50 to-transparent opacity-30"></div>
		<div class="absolute top-0 right-0 h-full w-px bg-gradient-to-b from-transparent via-blue-500/50 to-transparent opacity-30"></div>
		<div class="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-30"></div>
		<div class="absolute top-0 left-0 h-full w-px bg-gradient-to-b from-transparent via-red-500/50 to-transparent opacity-30"></div>
		
		<!-- Grid overlay -->
		<div class="absolute inset-0 bg-[url('/images/grid.svg')] bg-center opacity-[0.02]"></div>
	</div>

	<svelte:boundary>
		<SEO {data} />
		<Navigation />
		{@render children()}

		{#snippet failed(error, reset)}
			<div class="flex min-h-dvh flex-col items-center gap-4 bg-zinc-950 p-10">
				<div class="rounded-lg border border-red-500/20 bg-red-950/20 p-4 text-red-400">{error}</div>
				{#if dev}
					<SuperDebug data={error} />
				{/if}
				<button 
					onclick={reset}
					class="rounded-lg bg-red-600/80 px-6 py-2 font-medium text-white transition-all hover:bg-red-500"
				>
					Try again
				</button>
			</div>
		{/snippet}
	</svelte:boundary>
</div>
