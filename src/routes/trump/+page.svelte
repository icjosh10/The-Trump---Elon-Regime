<script>
	import Trump from './Trump.svelte';
	import { fade } from 'svelte/transition';
</script>

<div class="container mx-auto px-4 py-12" in:fade={{ duration: 400 }}>
	<Trump />
	
	<div class="my-12 flex justify-center">
		<a 
			href="/trump/timeline" 
			class="group relative overflow-hidden rounded-xl bg-gradient-to-br from-red-900/70 to-red-800/50 px-8 py-4 text-lg font-medium text-white shadow-lg transition-all hover:shadow-xl hover:shadow-red-500/10"
		>
			<span class="relative z-10 flex items-center gap-2">
				<iconify-icon icon="lucide:history" width="20" height="20"></iconify-icon>
				<span>View Trump's Timeline of Corruption</span>
			</span>
			<span class="absolute inset-0 -z-10 bg-gradient-to-r from-red-600 to-red-500 opacity-0 transition-opacity duration-300 group-hover:opacity-70"></span>
		</a>
	</div>

	<div class="mt-16 rounded-xl border border-zinc-700/50 bg-zinc-900/30 p-6 backdrop-blur-sm">
		<h2 class="mb-4 text-2xl font-bold text-white">
			<span class="bg-gradient-to-r from-red-500 to-red-300 bg-clip-text text-transparent">
				Why Trump Must Be Stopped
			</span>
		</h2>
		
		<p class="mb-4 text-lg text-zinc-300">
			Donald Trump represents the greatest threat to American democracy in modern history. His efforts 
			to overturn the 2020 election, including inciting the violent attack on the US Capitol, demonstrate 
			his willingness to destroy democratic institutions to maintain power.
		</p>
		
		<p class="mb-4 text-lg text-zinc-300">
			If returned to office, Trump has openly stated he would use the Justice Department to target his 
			political enemies, pardon insurrectionists, and act as a "dictator on day one." These are not mere 
			campaign promises—they are explicit threats to the constitutional order.
		</p>
		
		<p class="text-lg text-zinc-300">
			The evidence is overwhelming: from his racist policies and rhetoric to his numerous criminal indictments, 
			Trump has proven himself unfit for any public office.
			<a href="/trump/timeline" class="ml-1 font-medium text-red-400 hover:text-red-300">Explore the full timeline</a>
			to understand the extent of his corruption and dangerous behavior.
		</p>
	</div>
</div>