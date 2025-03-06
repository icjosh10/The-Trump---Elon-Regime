<script>
	import { fade, fly } from 'svelte/transition';
</script>

<div class="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
	<!-- Hero Section -->
	<div class="mb-16 text-center">
		<h1 class="mb-6 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl">
			<span class="block text-zinc-100">DANGER ALERT:</span>
			<span
				class="bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
				BILLIONAIRE TAKEOVER
			</span>
		</h1>
		<p class="mx-auto mt-6 max-w-2xl text-xl text-zinc-300">
			THE FACTS: Your freedom is at risk. Rich elites want to control YOUR life and YOUR money.
		</p>
		<div class="mt-8 flex justify-center gap-4">
			<a
				href="/trump"
				class="rounded-xl bg-gradient-to-br from-red-600 to-red-700 px-6 py-3 font-medium text-white shadow-lg shadow-red-900/20 transition-all hover:shadow-xl hover:shadow-red-900/30">
				Trump's Threats
			</a>
			<a
				href="/elon"
				class="rounded-xl bg-gradient-to-br from-orange-600 to-orange-700 px-6 py-3 font-medium text-white shadow-lg shadow-orange-900/20 transition-all hover:shadow-xl hover:shadow-orange-900/30">
				Musk's Threats
			</a>
		</div>
	</div>

	<!-- Introduction -->
	<div class="mb-16 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 backdrop-blur-sm">
		<h2 class="mb-6 text-3xl font-bold text-zinc-100">WHY YOU SHOULD CARE</h2>

		<div class="grid gap-8 md:grid-cols-2">
			<div>
				<h3 class="mb-3 text-xl font-semibold text-zinc-100">YOUR FREEDOM AT STAKE</h3>
				<p class="text-zinc-300">
					Trump wants to be a dictator "on day one." He said it himself! Musk controls what you see
					online and uses his money to change elections.
				</p>
			</div>

			<div>
				<h3 class="mb-3 text-xl font-semibold text-zinc-100">YOUR WALLET AT RISK</h3>
				<p class="text-zinc-300">
					These billionaires get tax breaks while YOU pay more. They shut down American factories
					and fire workers while their own bank accounts grow bigger.
				</p>
			</div>
		</div>

		<div class="mt-6">
			<p class="text-lg text-zinc-300">
				<strong>FACT CHECK:</strong>
				 Everything on this site comes from real court documents, news reports, and their own words.
				No fake news here!
			</p>
		</div>
	</div>

	<!-- Call to Action -->
	<div class="mb-16 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 backdrop-blur-sm">
		<h2 class="mb-6 text-3xl font-bold text-zinc-100">TAKE ACTION NOW</h2>

		<div class="grid gap-8 md:grid-cols-2">
			<div class="flex flex-col items-start">
				<h3 class="mb-3 text-xl font-semibold text-zinc-100">SPREAD THE TRUTH</h3>
				<p class="mb-4 text-zinc-300">
					Don't let them control the message! Share these FACTS with your friends and family before
					it's too late.
				</p>
				<button
					class="mt-auto rounded-xl bg-gradient-to-br from-violet-600 to-violet-700 px-6 py-3 font-medium text-white shadow-lg shadow-violet-900/20 transition-all hover:shadow-xl hover:shadow-violet-900/30"
					onclick={() => {
						if (navigator.share) {
							navigator.share({
								title: 'DANGER ALERT: Billionaire Takeover',
								text: 'Your freedom is at risk! Check the FACTS about Trump and Musk:',
								url: window.location.href
							});
						} else {
							navigator.clipboard.writeText(window.location.href);
							alert('Link copied to clipboard!');
						}
					}}>
					Share This Site
				</button>
			</div>

			<div class="flex flex-col items-start">
				<h3 class="mb-3 text-xl font-semibold text-zinc-100">PROTECT YOUR RIGHTS</h3>
				<p class="mb-4 text-zinc-300">
					Your vote is your weapon! Register now and vote for candidates who work for REAL
					AMERICANS, not billionaires.
				</p>
				<a
					href="https://www.vote.org"
					target="_blank"
					rel="noopener noreferrer"
					class="mt-auto rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-700 px-6 py-3 font-medium text-white shadow-lg shadow-emerald-900/20 transition-all hover:shadow-xl hover:shadow-emerald-900/30">
					Register to Vote
				</a>
			</div>
		</div>
	</div>

	<!-- Footer -->
	<footer class="border-t border-zinc-800 pt-10 text-center">
		<p class="text-sm text-zinc-400">
			&copy; {new Date().getFullYear()} DANGER ALERT: Billionaire Takeover | Truth for All Americans
		</p>
		<p class="mt-2 text-sm text-zinc-500">
			All facts verified from public sources and their own statements
		</p>
	</footer>
</div>
