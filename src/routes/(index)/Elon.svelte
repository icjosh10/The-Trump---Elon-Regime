<script>
	import { fade, fly } from 'svelte/transition';

	// Risk levels with numerical scores (0-10)
	const muskFacts = [
		{ text: 'Acquired Twitter/X to control global information flow and spread extremist views', risk: 'Extreme Risk', riskScore: 9.6 },
		{ text: 'Undermined democratic processes by using platform algorithms to favor specific political groups', risk: 'Extreme Risk', riskScore: 9.4 },
		{ text: 'Created unsafe working conditions at Tesla factories resulting in numerous injuries', risk: 'Critical Risk', riskScore: 8.8 },
		{ text: 'Spread dangerous COVID misinformation during the pandemic, leading to vaccine hesitancy', risk: 'Critical Risk', riskScore: 8.6 },
		{ text: 'Enabled and amplified hate speech and extremist content on Twitter/X after acquisition', risk: 'Critical Risk', riskScore: 8.4 },
		{ text: 'Used social media to manipulate stock prices and cryptocurrency markets for personal gain', risk: 'Severe Risk', riskScore: 7.9 },
		{ text: 'Violated labor laws by threatening and firing workers who attempt to unionize', risk: 'Severe Risk', riskScore: 7.7 },
		{ text: 'Made false promises about Tesla\'s self-driving capabilities, putting lives at risk', risk: 'Severe Risk', riskScore: 7.5 },
		{ text: 'Conducted mass layoffs without proper notice or compensation, destroying livelihoods', risk: 'Severe Risk', riskScore: 7.3 },
		{ text: 'Promoted surveillance capitalism through Neuralink and other privacy-invasive technologies', risk: 'High Risk', riskScore: 6.9 },
		{ text: 'Extracted billions in government subsidies while opposing social safety nets for others', risk: 'High Risk', riskScore: 6.7 },
		{ text: 'Evaded taxes while amassing unprecedented wealth inequality', risk: 'High Risk', riskScore: 6.5 }
	];

	// Sort facts by risk score (highest to lowest)
	$: sortedMuskFacts = [...muskFacts].sort((a, b) => b.riskScore - a.riskScore);

	// Function to get color based on risk level
	const getRiskColor = (risk) => {
		switch (risk) {
			case 'Extreme Risk': return 'bg-blue-600';
			case 'Critical Risk': return 'bg-blue-500';
			case 'Severe Risk': return 'bg-indigo-500';
			case 'High Risk': return 'bg-purple-500';
			default: return 'bg-purple-500';
		}
	};
	
	// Function to get glow color based on risk level (for hover effects)
	const getRiskGlowColor = (risk) => {
		switch (risk) {
			case 'Extreme Risk': return 'group-hover:shadow-blue-600/40';
			case 'Critical Risk': return 'group-hover:shadow-blue-500/40';
			case 'Severe Risk': return 'group-hover:shadow-indigo-500/40';
			case 'High Risk': return 'group-hover:shadow-purple-500/40';
			default: return 'group-hover:shadow-purple-500/40';
		}
	};
</script>

<div in:fade={{ duration: 300 }}>
	<div class="mb-12 flex flex-col items-center gap-10 md:flex-row">
		<div class="relative md:w-1/2">
			<div class="relative aspect-video overflow-hidden rounded-xl group">
				<img
					src="/images/elon_nohair.webp"
					alt="Elon Musk"
					class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
				<div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
				<div class="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-blue-600 to-transparent">
				</div>
				<div class="absolute bottom-0 right-0 h-1 w-full bg-gradient-to-l from-blue-600 to-transparent">
				</div>
				<div class="absolute inset-0 flex items-end">
					<div class="p-6">
						<span class="text-sm font-medium text-zinc-400">Musk amassed dangerous level of media control</span>
					</div>
				</div>
				
				<!-- Glowing effect on hover -->
				<div class="absolute -inset-0.5 blur bg-blue-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
			</div>
		</div>
		<div class="md:w-1/2">
			<div class="relative">
				<h3 class="mb-6 inline-block relative text-3xl font-bold">
					<span class="bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">Musk's Influence Empire</span>
					<div class="absolute -bottom-2 left-0 h-0.5 w-1/3 bg-gradient-to-r from-blue-600 to-transparent"></div>
				</h3>
                <p class="mb-4 leading-relaxed text-zinc-300">
                    Elon Musk has accumulated unprecedented power through his control of vital technology
                    platforms and infrastructure. His actions threaten free speech, workers' rights, and
                    responsible tech governance.
                </p>
                <div class="mb-6 flex gap-2">
                    <div class="flex items-center gap-1 rounded-full bg-blue-500/20 px-3 py-1 text-sm text-blue-400">
                        <iconify-icon icon="lucide:alert-triangle" width="14" height="14"></iconify-icon>
                        <span>Extreme Threat Level</span>
                    </div>
                </div>
			</div>
		</div>
	</div>

    <div class="mb-10">
        <h4 class="mb-4 inline-block relative text-2xl font-bold">
            Documented Threats
            <div class="absolute -bottom-1 left-0 h-0.5 w-1/6 bg-blue-600"></div>
        </h4>
        <p class="mb-6 text-zinc-300">
            These documented actions demonstrate a pattern of reckless behavior
            and disregard for public welfare, workers' rights, and democratic values.
        </p>
    </div>

    <div class="grid gap-5 md:grid-cols-2">
        {#each sortedMuskFacts as fact, i}
            <div 
                class="relative overflow-hidden rounded-xl border border-zinc-800/50 bg-zinc-900/50 backdrop-blur-sm transition-all duration-300 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/5 group"
                in:fly={{ y: 20, delay: i * 50, duration: 400 }}
            >
                <!-- Risk indicator bar - width based on risk score -->
                <div class="h-1 w-full absolute top-0 left-0 flex">
                    <div class={`h-full ${getRiskColor(fact.risk)}`} style="width: {fact.riskScore * 10}%" aria-label={fact.risk}></div>
                </div>
                
                <div class="p-5">
                    <p class="text-zinc-200">{fact.text}</p>
                </div>
            </div>
        {/each}
    </div>
</div>

<style>
/* Empty style block to prevent CSS processing error */
</style>
