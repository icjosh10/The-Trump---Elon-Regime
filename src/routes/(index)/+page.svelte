<script>
	import { fade, fly, scale } from 'svelte/transition';
	import Trump from './Trump.svelte';
	import Elon from './Elon.svelte';

	let darkMode = $state(true);
	let showTrumpSection = $state(true);
	let showMuskSection = $state(false);

	const showSection = (section) => {
		if (section === 'trump') {
			showTrumpSection = true;
			showMuskSection = false;
		} else {
			showTrumpSection = false;
			showMuskSection = true;
		}
	};
</script>

<div
	class={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-zinc-900 text-white' : 'bg-white text-zinc-900'}`}>
	<!-- Hero Section -->
	<section class="relative overflow-hidden py-32 text-center" id="about">
		<div class="absolute inset-0 z-0">
			<div
				class="absolute inset-0 bg-gradient-to-br from-red-900/40 via-zinc-900/80 to-blue-900/40">
			</div>
			<div
				class="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(217,70,70,0.15),rgba(255,255,255,0))]">
			</div>
		</div>
		<div class="container relative z-10 mx-auto px-4">
			<div in:scale={{ duration: 800, start: 0.9 }}>
				<h2 class="mb-8 text-5xl font-bold leading-tight md:text-7xl">
					<span class="bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent">
						Democracy
					</span>
					at Risk
				</h2>
				<p class="mx-auto mb-16 max-w-3xl text-xl leading-relaxed text-zinc-300/90 md:text-2xl">
					The dangerous influence of oligarchs threatens our democratic institutions. This site
					exposes the truth behind two of the most harmful figures in modern politics.
				</p>
			</div>

			<div class="flex flex-wrap justify-center gap-6">
				<button
					class={`rounded-xl border px-8 py-3 text-lg font-medium transition-all duration-300 ${showTrumpSection ? 'border-red-500 bg-red-600/90 text-white shadow-lg shadow-red-900/20' : 'border-zinc-700 bg-zinc-800/70 text-zinc-300 hover:border-zinc-600 hover:bg-zinc-700/70'}`}
					onclick={() => showSection('trump')}
					aria-pressed={showTrumpSection}>
					<div class="flex items-center gap-2">
						<iconify-icon icon="lucide:alert-triangle" width="20" height="20"></iconify-icon>
						<span>Trump's Threats</span>
					</div>
				</button>
				<button
					class={`rounded-xl border px-8 py-3 text-lg font-medium transition-all duration-300 ${showMuskSection ? 'border-blue-500 bg-blue-600/90 text-white shadow-lg shadow-blue-900/20' : 'border-zinc-700 bg-zinc-800/70 text-zinc-300 hover:border-zinc-600 hover:bg-zinc-700/70'}`}
					onclick={() => showSection('musk')}
					aria-pressed={showMuskSection}>
					<div class="flex items-center gap-2">
						<iconify-icon icon="lucide:alert-triangle" width="20" height="20"></iconify-icon>
						<span>Musk's Manipulations</span>
					</div>
				</button>
			</div>
		</div>
	</section>

	<!-- Facts Section -->
	<section class="relative py-20" id="facts">
		<div class="absolute inset-0 bg-zinc-800/30 backdrop-blur-sm"></div>
		<div class="container relative mx-auto px-4">
			{#if showTrumpSection}
				<Trump />
			{:else if showMuskSection}
				<Elon />
			{/if}
		</div>
	</section>

	<!-- Call to Action -->
	<section class="relative py-24" id="take-action">
		<div class="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent"></div>
		<div class="container relative z-10 mx-auto px-4 text-center">
			<h2 class="relative mb-8 inline-block text-4xl font-bold">
				Take Action Now
				<div class="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-red-500 to-blue-500">
				</div>
			</h2>
			<p class="mx-auto mb-12 max-w-2xl text-xl text-zinc-300">
				Democracy requires active participation. Join our movement to protect democratic
				institutions and hold powerful figures accountable.
			</p>

			<div class="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
				<div
					class="group rounded-xl border border-zinc-700/50 bg-zinc-800/30 p-8 backdrop-blur-sm transition-all duration-300 hover:border-zinc-500/50 hover:shadow-lg hover:shadow-red-900/10">
					<div
						class="mb-6 inline-flex items-center justify-center rounded-xl bg-zinc-700/50 p-3 transition-colors group-hover:bg-red-500/20">
						<iconify-icon icon="lucide:megaphone" width="28" height="28" class="text-red-400">
						</iconify-icon>
					</div>
					<h3 class="mb-3 text-xl font-bold">Contact Officials</h3>
					<p class="mb-6 text-zinc-400">
						Make your voice heard by contacting your representatives.
					</p>
					<a
						href="#"
						class="block w-full rounded-lg bg-zinc-700/80 py-3 text-center transition-all transition-colors group-hover:bg-gradient-to-r group-hover:from-red-600/90 group-hover:to-red-500/90 group-hover:text-white hover:bg-zinc-600/80">
						Find Representatives
					</a>
				</div>

				<div
					class="group rounded-xl border border-zinc-700/50 bg-zinc-800/30 p-8 backdrop-blur-sm transition-all duration-300 hover:border-zinc-500/50 hover:shadow-lg hover:shadow-red-900/10">
					<div
						class="mb-6 inline-flex items-center justify-center rounded-xl bg-zinc-700/50 p-3 transition-colors group-hover:bg-red-500/20">
						<iconify-icon icon="lucide:share" width="28" height="28" class="text-red-400">
						</iconify-icon>
					</div>
					<h3 class="mb-3 text-xl font-bold">Spread Awareness</h3>
					<p class="mb-6 text-zinc-400">Share factual information with your network.</p>
					<div class="flex justify-center gap-4">
						<button
							class="rounded-full bg-zinc-700/80 p-3 transition-all hover:scale-110 hover:bg-blue-600/90"
							aria-label="Share on Twitter">
							<iconify-icon
								icon="lucide:twitter"
								width="20"
								height="20"
								class="flex items-center justify-center">
							</iconify-icon>
						</button>
						<button
							class="rounded-full bg-zinc-700/80 p-3 transition-all hover:scale-110 hover:bg-blue-800/90"
							aria-label="Share on Facebook">
							<iconify-icon
								icon="lucide:facebook"
								width="20"
								height="20"
								class="flex items-center justify-center">
							</iconify-icon>
						</button>
						<button
							class="rounded-full bg-zinc-700/80 p-3 transition-all hover:scale-110 hover:bg-red-600/90"
							aria-label="Share via Email">
							<iconify-icon
								icon="lucide:mail"
								width="20"
								height="20"
								class="flex items-center justify-center">
							</iconify-icon>
						</button>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Footer -->
	<footer class="border-t border-zinc-800/50 py-12">
		<div class="container mx-auto px-4">
			<div class="flex flex-col items-center justify-between md:flex-row">
				<div class="mb-6 flex items-center gap-2 md:mb-0">
					<div class="relative h-6 w-6">
						<div class="absolute inset-0 rotate-45 rounded-md bg-red-500"></div>
						<div class="absolute inset-0 flex items-center justify-center">
							<iconify-icon icon="lucide:shield-alert" width="14" height="14" class="text-white">
							</iconify-icon>
						</div>
					</div>
					<p class="text-zinc-500">
						&copy; {new Date().getFullYear()}
						<span class="text-zinc-400">Democracy Defense Initiative</span>
						| All facts sourced and verified
					</p>
				</div>
				<div class="flex gap-8">
					<a
						href="#"
						class="text-zinc-500 decoration-red-500/50 decoration-2 underline-offset-4 transition-colors hover:text-white hover:underline">
						Privacy Policy
					</a>
					<a
						href="#"
						class="text-zinc-500 decoration-red-500/50 decoration-2 underline-offset-4 transition-colors hover:text-white hover:underline">
						Terms of Use
					</a>
					<a
						href="#"
						class="text-zinc-500 decoration-red-500/50 decoration-2 underline-offset-4 transition-colors hover:text-white hover:underline">
						Contact
					</a>
				</div>
			</div>
		</div>
	</footer>
</div>
