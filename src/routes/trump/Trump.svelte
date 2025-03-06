<script>
	import { fade, fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { trumpThreats } from './data';

	// Data
	let showMore = $state(false);
	let selectedRisk = $state(null);
	
	// Determine risk label and color based on risk score
	function getRiskLabel(score) {
		if (score >= 90) return 'Extreme';
		if (score >= 80) return 'Severe';
		if (score >= 70) return 'High';
		if (score >= 50) return 'Moderate';
		return 'Low';
	}

	function getRiskColor(score) {
		if (score >= 90) return 'bg-red-500 text-white border-red-400';
		if (score >= 80) return 'bg-orange-500 text-white border-orange-400';
		if (score >= 70) return 'bg-amber-500 text-white border-amber-400';
		if (score >= 50) return 'bg-yellow-500 text-white border-yellow-400';
		return 'bg-green-500 text-white border-green-400';
	}

	function getRiskBgColor(score) {
		if (score >= 90) return 'bg-red-950/40 border-red-900/50';
		if (score >= 80) return 'bg-orange-950/40 border-orange-900/50';
		if (score >= 70) return 'bg-amber-950/40 border-amber-900/50';
		if (score >= 50) return 'bg-yellow-950/40 border-yellow-900/50';
		return 'bg-green-950/40 border-green-900/50';
	}

	function getGradientColor(score) {
		if (score >= 90) return 'from-red-900/20 to-red-800/5';
		if (score >= 80) return 'from-orange-900/20 to-orange-800/5';
		if (score >= 70) return 'from-amber-900/20 to-amber-800/5';
		if (score >= 50) return 'from-yellow-900/20 to-yellow-800/5';
		return 'from-green-900/20 to-green-800/5';
	}

	function getIconColor(score) {
		if (score >= 90) return 'text-red-400';
		if (score >= 80) return 'text-orange-400';
		if (score >= 70) return 'text-amber-400';
		if (score >= 50) return 'text-yellow-400';
		return 'text-green-400';
	}

	// Toggle selected risk
	function toggleRisk(risk) {
		if (selectedRisk && selectedRisk.id === risk.id) {
			selectedRisk = null;
		} else {
			selectedRisk = risk;
		}
	}
</script>

<div class="relative overflow-hidden">
	
	<div class="mb-8 text-center">
		<h1 class="mb-3 text-4xl font-bold leading-tight sm:text-5xl">
			<span class="bg-gradient-to-r from-red-500 to-red-400 bg-clip-text text-transparent">Donald Trump</span>
		</h1>
		<p class="mx-auto max-w-3xl text-lg text-zinc-300/90">
			Trump wants to destroy democracy and become America's dictator. He has already 
			tried to overturn an election and incited violence against the government.
		</p>
	</div>

	<div class="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
		{#each trumpThreats.slice(0, showMore ? trumpThreats.length : 3) as risk, i (risk.id)}
			<div 
				class={`group relative overflow-hidden rounded-xl border backdrop-blur-sm transition-all duration-300 ${getRiskBgColor(risk.riskScore)} ${selectedRisk && selectedRisk.id === risk.id ? 'ring-2 ring-offset-4 ring-offset-zinc-950 ring-red-500/50' : 'hover:border-red-500/30'}`}
				in:fly={{ 
					y: 20, 
					duration: 400, 
					delay: i * 100, 
					easing: quintOut 
				}}
			>
				<div class="relative z-10 p-5">
					<div class="mb-4 flex items-center justify-between">
						<div class="flex items-center gap-2">
							<iconify-icon icon="lucide:alert-triangle" class={getIconColor(risk.riskScore)} width="20" height="20"></iconify-icon>
							<span class={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium ${getRiskColor(risk.riskScore)}`}>
								{getRiskLabel(risk.riskScore)} Risk
							</span>
						</div>
						<span class="text-3xl font-bold tabular-nums text-red-500/80">{risk.riskScore}</span>
					</div>
					
					<h3 class="mb-2 text-xl font-bold text-white group-hover:text-red-100">{risk.title}</h3>
					<p class="mb-4 text-sm text-zinc-300/90">
						{risk.description.length > 120 && !selectedRisk 
							? risk.description.substring(0, 120) + '...' 
							: risk.description}
					</p>

					{#if selectedRisk && selectedRisk.id === risk.id}
						<div class="mt-4 animate-fadeIn">
							<div class="mb-2 text-sm font-medium text-zinc-400">Sources:</div>
							<ul class="space-y-1 text-sm text-zinc-400">
								{#each risk.citations as citation}
									<li class="flex items-start gap-2">
										<iconify-icon icon="lucide:link" class="mt-0.5 text-red-400" width="14" height="14"></iconify-icon>
										<span>{citation}</span>
									</li>
								{/each}
							</ul>
						</div>
					{/if}
					
					<button
						class="mt-3 flex items-center gap-1.5 text-sm font-medium text-red-400 transition-colors hover:text-red-300"
						onclick={() => toggleRisk(risk)}
						aria-expanded={selectedRisk && selectedRisk.id === risk.id}
					>
						<iconify-icon icon={selectedRisk && selectedRisk.id === risk.id ? "lucide:minus-circle" : "lucide:plus-circle"} width="16" height="16"></iconify-icon>
						<span>{selectedRisk && selectedRisk.id === risk.id ? 'Show Less' : 'See More'}</span>
					</button>
				</div>
			</div>
		{/each}
	</div>

	{#if trumpThreats.length > 3}
		<div class="mb-8 flex justify-center">
			<button
				class="group flex items-center gap-2 rounded-xl border border-zinc-700/50 bg-zinc-800/50 px-6 py-3 text-lg font-medium text-white shadow-sm transition-all hover:border-red-500/30 hover:bg-red-900/20 hover:shadow-md hover:shadow-red-900/10"
				onclick={() => (showMore = !showMore)}
				aria-expanded={showMore}
			>
				<iconify-icon
					icon={showMore ? 'lucide:chevron-up' : 'lucide:chevron-down'}
					width="20"
					height="20"
					class="text-red-400">
				</iconify-icon>
				<span>{showMore ? 'Show Less' : 'Show More Threats'}</span>
			</button>
		</div>
	{/if}

	<div class="rounded-xl border border-zinc-700/50 bg-zinc-900/30 p-6 backdrop-blur-sm">
		<h2 class="mb-4 text-2xl font-bold text-white">
			<span class="bg-gradient-to-r from-red-500 to-red-300 bg-clip-text text-transparent">
				Trump's Plan for America
			</span>
		</h2>
		
		<p class="mb-4 text-lg text-zinc-300">
			If re-elected, Trump has promised to be a dictator "on day one" and use the Justice Department 
			to punish his enemies. He plans to fire career officials and replace them with loyalists.
		</p>
		<p class="mb-4 text-lg text-zinc-300">
			He has already tried to overturn one election. If he loses in 2024, he will likely refuse 
			to accept the results and again try to overturn the election through force.
		</p>
		<p class="text-lg text-zinc-300">
			A second Trump term would mean the end of American democracy as we know it, with disastrous consequences
			for civil liberties, minority rights, and the rule of law.
		</p>
	</div>
</div>

<style>
	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(5px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.animate-fadeIn {
		animation: fadeIn 0.3s ease-out forwards;
	}
</style>
