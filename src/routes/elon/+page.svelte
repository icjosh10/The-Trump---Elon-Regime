<script>
	import Elon from './Elon.svelte';
	import { fade } from 'svelte/transition';
</script>

<div class="container mx-auto px-4 py-12" in:fade={{ duration: 400 }}>
	<Elon />
	
	<div class="my-12 flex justify-center">
		<a 
			href="/elon/timeline" 
			class="group relative overflow-hidden rounded-xl bg-gradient-to-br from-orange-900/70 to-orange-800/50 px-8 py-4 text-lg font-medium text-white shadow-lg transition-all hover:shadow-xl hover:shadow-orange-500/10"
		>
			<span class="relative z-10 flex items-center gap-2">
				<iconify-icon icon="lucide:history" width="20" height="20"></iconify-icon>
				<span>View Elon's Timeline of Manipulation</span>
			</span>
			<span class="absolute inset-0 -z-10 bg-gradient-to-r from-orange-600 to-orange-500 opacity-0 transition-opacity duration-300 group-hover:opacity-70"></span>
		</a>
	</div>

	<div class="mt-16 rounded-xl border border-zinc-700/50 bg-zinc-900/30 p-6 backdrop-blur-sm">
		<h2 class="mb-4 text-2xl font-bold text-white">
			<span class="bg-gradient-to-r from-orange-500 to-orange-300 bg-clip-text text-transparent">
				The Dangerous Influence of Elon Musk
			</span>
		</h2>
		
		<p class="mb-4 text-lg text-zinc-300">
			With a fortune greater than the GDP of many countries, Elon Musk wields unprecedented influence 
			over global communication, transportation, and space infrastructure. However, instead of using this 
			power responsibly, he has consistently undermined democratic discourse and worker protections.
		</p>
		
		<p class="mb-4 text-lg text-zinc-300">
			Since acquiring Twitter/X, Musk has systematically dismantled content moderation, amplified conspiracy 
			theories, and provided a platform for extremism. His financial and public support for Donald Trump and other 
			far-right figures demonstrates his commitment to an authoritarian vision for society.
		</p>
		
		<p class="text-lg text-zinc-300">
			From market manipulation to labor violations, Musk's business practices reveal a pattern of disregard 
			for rules that apply to everyone else.
			<a href="/elon/timeline" class="ml-1 font-medium text-orange-400 hover:text-orange-300">Explore the full timeline</a>
			to understand how Musk has used his wealth and platforms to push dangerous agendas.
		</p>
	</div>
</div>