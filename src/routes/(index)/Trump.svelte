<script>
	import { fade, fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	// Data
	let showMore = $state(false);
	let selectedRisk = $state(null);

	const threats = $state([
		{
			id: 1,
			title: 'Election Lies',
			description:
				'Trump spread false claims that the 2020 election was stolen, directly leading to the January 6th Capitol attack and undermining faith in our democratic process.',
			riskScore: 95,
			citations: ['Congressional Records (2022)', 'Court Filings (2021)', 'DOJ Reports (2022)']
		},
		{
			id: 2,
			title: 'Violence Incitement',
			description:
				'Repeatedly encouraged supporters to use violence against political opponents, journalists, and protesters at his rallies with phrases like "knock the crap out of them" and "I\'ll pay your legal fees."',
			riskScore: 91,
			citations: ['Rally Transcripts (2016-2021)', 'Criminal Charges (2023)', 'Media Documentation']
		},
		{
			id: 3,
			title: 'Judicial Interference',
			description:
				'Attacked judges who ruled against him, pressured DOJ officials to interfere in investigations, and pardoned allies who committed crimes to protect him.',
			riskScore: 88,
			citations: ['DOJ Inspector General Report', 'Witness Testimony', 'Court Records']
		},
		{
			id: 4,
			title: 'Free Press Attacks',
			description:
				'Labeled journalists as "enemies of the people," attempted to revoke press credentials of critical reporters, and threatened media companies with legal action.',
			riskScore: 82,
			citations: ['Press Freedom Index', 'White House Briefing Records', 'Lawsuit Documents']
		},
		{
			id: 5,
			title: 'Constitutional Violations',
			description:
				'Ignored separation of powers, claimed "absolute immunity" from prosecution, and openly stated he would use military against domestic opponents.',
			riskScore: 87,
			citations: ['Supreme Court Rulings', 'Legal Scholars Analysis', 'Public Statements']
		}
	]);

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
			<span class="bg-gradient-to-r from-red-500 to-red-400 bg-clip-text text-transparent">
				Donald Trump
			</span>
		</h1>
		<p class="mx-auto max-w-3xl text-lg text-zinc-300/90">
			Trump wants to destroy democracy and become America's dictator. He has already tried to
			overturn an election and incited violence against the government.
		</p>
	</div>

	<div class="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
		{#each threats.slice(0, showMore ? threats.length : 3) as risk, i (risk.id)}
			<div
				class={`group relative overflow-hidden rounded-xl border backdrop-blur-sm transition-all duration-300 ${getRiskBgColor(risk.riskScore)} ${selectedRisk && selectedRisk.id === risk.id ? 'ring-2 ring-red-500/50 ring-offset-4 ring-offset-zinc-950' : 'hover:border-red-500/30'}`}
				in:fly={{
					y: 20,
					duration: 400,
					delay: i * 100,
					easing: quintOut
				}}>
				<div class="relative z-10 p-5">
					<div class="mb-4 flex items-center justify-between">
						<div class="flex items-center gap-2">
							<iconify-icon
								icon="lucide:alert-triangle"
								class={getIconColor(risk.riskScore)}
								width="20"
								height="20">
							</iconify-icon>
							<span
								class={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium ${getRiskColor(risk.riskScore)}`}>
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
						<div class="animate-fadeIn mt-4">
							<div class="mb-2 text-sm font-medium text-zinc-400">Sources:</div>
							<ul class="space-y-1 text-sm text-zinc-400">
								{#each risk.citations as citation}
									<li class="flex items-start gap-2">
										<iconify-icon
											icon="lucide:link"
											class="mt-0.5 text-red-400"
											width="14"
											height="14">
										</iconify-icon>
										<span>{citation}</span>
									</li>
								{/each}
							</ul>
						</div>
					{/if}

					<button
						class="mt-3 flex items-center gap-1.5 text-sm font-medium text-red-400 transition-colors hover:text-red-300"
						onclick={() => toggleRisk(risk)}
						aria-expanded={selectedRisk && selectedRisk.id === risk.id}>
						<iconify-icon
							icon={selectedRisk && selectedRisk.id === risk.id
								? 'lucide:minus-circle'
								: 'lucide:plus-circle'}
							width="16"
							height="16">
						</iconify-icon>
						<span>{selectedRisk && selectedRisk.id === risk.id ? 'Show Less' : 'See More'}</span>
					</button>
				</div>
			</div>
		{/each}
	</div>

	{#if threats.length > 3}
		<div class="mb-8 flex justify-center">
			<button
				class="group flex items-center gap-2 rounded-xl border border-zinc-700/50 bg-zinc-800/50 px-6 py-3 text-lg font-medium text-white shadow-sm transition-all hover:border-red-500/30 hover:bg-red-900/20 hover:shadow-md hover:shadow-red-900/10"
				onclick={() => (showMore = !showMore)}
				aria-expanded={showMore}>
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
			He has already tried to overturn one election. If he loses in 2024, he will likely refuse to
			accept the results again and encourage his supporters to use violence.
		</p>

		<div class="mt-8 flex flex-wrap gap-4">
			<div class="flex items-center gap-2">
				<div class="flex h-12 w-12 items-center justify-center rounded-lg bg-red-900/30">
					<iconify-icon icon="lucide:trending-up" class="text-red-400" width="24" height="24">
					</iconify-icon>
				</div>
				<div>
					<div class="text-sm text-zinc-400">Overall Risk Score</div>
					<div class="text-xl font-bold text-white">
						<span class="text-red-400">92</span>
						/100
					</div>
				</div>
			</div>

			<div class="flex items-center gap-2">
				<div class="flex h-12 w-12 items-center justify-center rounded-lg bg-red-900/30">
					<iconify-icon icon="lucide:alert-octagon" class="text-red-400" width="24" height="24">
					</iconify-icon>
				</div>
				<div>
					<div class="text-sm text-zinc-400">Threat Level</div>
					<div class="text-xl font-bold text-white">
						<span class="text-red-400">Extreme</span>
					</div>
				</div>
			</div>

			<div class="flex items-center gap-2">
				<div class="flex h-12 w-12 items-center justify-center rounded-lg bg-red-900/30">
					<iconify-icon icon="lucide:clock" class="text-red-400" width="24" height="24">
					</iconify-icon>
				</div>
				<div>
					<div class="text-sm text-zinc-400">Timeline</div>
					<div class="text-xl font-bold text-white">
						<span class="text-red-400">Immediate</span>
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
