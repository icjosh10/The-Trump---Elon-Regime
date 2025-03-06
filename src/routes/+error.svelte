<script>
	let { data } = $props();
	import Layout from '$components/nav/Layout.svelte';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { random } from '$images/backgrounds';

	let currentUrl = $state('');
	onMount(() => (currentUrl = window.location.pathname));
</script>

<Layout {data} showHeader={true} footer={false}>
	<div class="relative flex min-h-[calc(100dvh-56px)] items-center justify-center overflow-hidden">
		<!-- Background with overlay -->
		<div
			class="absolute inset-0 bg-cover bg-center bg-no-repeat"
			style="background-image: url({random()})">
			<div class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
		</div>

		<!-- Error Card -->
		<div class="relative w-full max-w-lg px-4">
			<div class="overflow-hidden rounded-2xl bg-bg1 p-8 shadow-2xl ring-1 ring-white/10">
				<!-- Error Status -->
				<div class="flex items-center justify-center">
					<h2
						class="text-7xl font-black tracking-tight"
						class:text-red-500={$page.status === 404}
						class:text-yellow-500={$page.status === 500}>
						{$page.status}
					</h2>
				</div>

				<!-- Error Type -->
				<h3 class="mt-2 text-center text-2xl font-bold tracking-tight text-gray-200">
					{$page.status === 404 ? 'Page Not Found' : 'Server Error'}
				</h3>

				<!-- Error Message -->
				<div class="mt-6 text-center">
					<p class="text-lg text-gray-300">
						{#if $page.status === 404}
							{$page.error?.message || "We couldn't find the page you're looking for:"}
						{:else if $page.status === 500}
							{$page.error?.message || 'An unexpected error occurred'}
							<span class="mt-2 block text-sm text-gray-400">
								Our team has been notified and is working on it.
							</span>
						{:else}
							{$page.error?.message || 'Something went wrong'}
						{/if}
					</p>
				</div>

				<!-- Action Buttons -->
				<div class="mt-8 flex justify-center gap-4">
					{#if $page.status !== 500}
						<button
							onclick={() => window.history.back()}
							class="inline-flex items-center rounded-lg bg-gray-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-800">
							<iconify-icon icon="icon-park-solid:back" class="mr-2" width="20" height="20" />
							Go Back
						</button>
					{/if}
					<a
						href="/"
						class="inline-flex items-center rounded-lg bg-cyan-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-gray-800">
						<iconify-icon icon="ic:round-home" class="mr-2" width="20" height="20" />
						Home
					</a>
				</div>
			</div>
		</div>
	</div>
</Layout>
