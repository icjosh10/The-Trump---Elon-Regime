<script>
	import { fade, fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { elonThreats } from './data';

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
			<span class="bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent">Elon Musk</span>
		</h1>
		<p class="mx-auto max-w-3xl text-lg text-zinc-300/90">
			Musk uses his wealth and platforms to push right-wing agendas, spread misinformation, 
			and abuse workers while avoiding taxes that would benefit society.
		</p>
	</div>

	<div class="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
		{#each elonThreats.slice(0, showMore ? elonThreats.length : 3) as risk, i (risk.id)}
			<div 
				class={`group relative overflow-hidden rounded-xl border backdrop-blur-sm transition-all duration-300 ${getRiskBgColor(risk.riskScore)} ${selectedRisk && selectedRisk.id === risk.id ? 'ring-2 ring-offset-4 ring-offset-zinc-950 ring-orange-500/50' : 'hover:border-orange-500/30'}`}
				in:fly={{ 
					y: 20, 
					duration: 400, 
					delay: i * 100, 
					easing: quintOut 
				}}
			>
				<!-- Content -->
				<div class="relative z-10 p-5">
					<!-- Risk indicator -->
					<div class="mb-4 flex items-center justify-between">
						<div class="flex items-center gap-2">
							<iconify-icon icon="lucide:alert-triangle" class={getIconColor(risk.riskScore)} width="20" height="20"></iconify-icon>
							<span class={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium ${getRiskColor(risk.riskScore)}`}>
								{getRiskLabel(risk.riskScore)} Risk
							</span>
						</div>
						<span class="text-3xl font-bold tabular-nums text-orange-500/80">{risk.riskScore}</span>
					</div>
					
					<h3 class="mb-2 text-xl font-bold text-white group-hover:text-orange-100">{risk.title}</h3>
					<p class="mb-4 text-sm text-zinc-300/90">
						{risk.description.length > 120 && !selectedRisk 
							? risk.description.substring(0, 120) + '...' 
							: risk.description}
					</p>

					<!-- Citations and View More button -->
					{#if selectedRisk && selectedRisk.id === risk.id}
						<div class="mt-4 animate-fadeIn">
							<div class="mb-2 text-sm font-medium text-zinc-400">Sources:</div>
							<ul class="space-y-1 text-sm text-zinc-400">
								{#each risk.citations as citation}
									<li class="flex items-start gap-2">
										<iconify-icon icon="lucide:link" class="mt-0.5 text-orange-400" width="14" height="14"></iconify-icon>
										<span>{citation}</span>
									</li>
								{/each}
							</ul>
						</div>
					{/if}
					
					<button
						class="mt-3 flex items-center gap-1.5 text-sm font-medium text-orange-400 transition-colors hover:text-orange-300"
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

	{#if elonThreats.length > 3}
		<div class="mb-8 flex justify-center">
			<button
				class="group flex items-center gap-2 rounded-xl border border-zinc-700/50 bg-zinc-800/50 px-6 py-3 text-lg font-medium text-white shadow-sm transition-all hover:border-orange-500/30 hover:bg-orange-900/20 hover:shadow-md hover:shadow-orange-900/10"
				onclick={() => (showMore = !showMore)}
				aria-expanded={showMore}
			>
				<iconify-icon
					icon={showMore ? 'lucide:chevron-up' : 'lucide:chevron-down'}
					width="20"
					height="20"
					class="text-orange-400">
				</iconify-icon>
				<span>{showMore ? 'Show Less' : 'Show More Threats'}</span>
			</button>
		</div>
	{/if}

	<!-- Analysis Panel -->
	<div class="rounded-xl border border-zinc-700/50 bg-zinc-900/30 p-6 backdrop-blur-sm">
		<h2 class="mb-4 text-2xl font-bold text-white">
			<span class="bg-gradient-to-r from-orange-500 to-orange-300 bg-clip-text text-transparent">
				Musk's Impact on Society
			</span>
		</h2>
		
		<p class="mb-4 text-lg text-zinc-300">
			As one of the richest people in history, Musk has enormous influence over politics, media, 
			and technology but uses this power primarily for his own benefit rather than society's.
		</p>
		<p class="mb-4 text-lg text-zinc-300">
			His takeover of Twitter/X has turned a major communication platform into a haven for 
			misinformation and hate speech while he personally promotes far-right talking points.
		</p>
		
		<div class="mt-8 flex flex-wrap gap-4">
			<div class="flex items-center gap-2">
				<div class="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-900/30">
					<iconify-icon icon="lucide:trending-up" class="text-orange-400" width="24" height="24"></iconify-icon>
				</div>
				<div>
					<div class="text-sm text-zinc-400">Overall Risk Score</div>
					<div class="text-xl font-bold text-white">
						<span class="text-orange-400">84</span>/100
					</div>
				</div>
			</div>
			
			<div class="flex items-center gap-2">
				<div class="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-900/30">
					<iconify-icon icon="lucide:alert-octagon" class="text-orange-400" width="24" height="24"></iconify-icon>
				</div>
				<div>
					<div class="text-sm text-zinc-400">Threat Level</div>
					<div class="text-xl font-bold text-white">
						<span class="text-orange-400">Severe</span>
					</div>
				</div>
			</div>
			
			<div class="flex items-center gap-2">
				<div class="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-900/30">
					<iconify-icon icon="lucide:clock" class="text-orange-400" width="24" height="24"></iconify-icon>
				</div>
				<div>
					<div class="text-sm text-zinc-400">Timeline</div>
					<div class="text-xl font-bold text-white">
						<span class="text-orange-400">Ongoing</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	.animate-fadeIn {
		animation: fadeIn 0.5s ease-out forwards;
	}
</style>
