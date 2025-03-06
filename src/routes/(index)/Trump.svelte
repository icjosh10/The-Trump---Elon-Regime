<script>
  import { fade, fly } from 'svelte/transition';
  
  // Risk levels with numerical scores (0-10)
  const trumpFacts = [
    { text: "Attempted to overturn legitimate 2020 election results, undermining democracy itself", risk: "Extreme Risk", riskScore: 9.8 },
    { text: "Incited the January 6th Capitol insurrection, leading to deaths and threatening peaceful transfer of power", risk: "Extreme Risk", riskScore: 9.7 },
    { text: "Spread dangerous election lies that continue to erode public trust in democratic institutions", risk: "Extreme Risk", riskScore: 9.5 },
    { text: "Appointed Supreme Court justices who overturned Roe v. Wade, removing reproductive rights", risk: "Critical Risk", riskScore: 8.9 },
    { text: "Implemented family separation policy at the border, causing irreparable psychological harm to children", risk: "Critical Risk", riskScore: 8.7 },
    { text: "Emboldened white nationalist groups through rhetoric and policies", risk: "Critical Risk", riskScore: 8.5 },
    { text: "Repeatedly attacked the free press, calling journalists 'enemies of the people'", risk: "Severe Risk", riskScore: 7.8 },
    { text: "Dismantled critical environmental protections, accelerating climate change", risk: "Severe Risk", riskScore: 7.6 },
    { text: "Mishandled the COVID-19 pandemic, contributing to preventable deaths", risk: "Severe Risk", riskScore: 7.4 },
    { text: "Proposed injecting disinfectant during COVID pandemic, spreading dangerous medical misinformation", risk: "Severe Risk", riskScore: 7.2 },
    { text: "Faced multiple impeachments during presidency for abuse of power", risk: "High Risk", riskScore: 6.8 },
    { text: "Maintained close associations with convicted sex traffickers including Jeffrey Epstein and Ghislaine Maxwell", risk: "High Risk", riskScore: 6.6 },
    { text: "Used presidency to enrich personal businesses, violating emoluments clause", risk: "High Risk", riskScore: 6.4 },
    { text: "Implemented tax cuts primarily benefiting the wealthy while expanding inequality", risk: "High Risk", riskScore: 6.2 }
  ];
  
  // Sort facts by risk score (highest to lowest)
  $: sortedTrumpFacts = [...trumpFacts].sort((a, b) => b.riskScore - a.riskScore);
  
  // Function to get color based on risk level
  const getRiskColor = (risk) => {
    switch(risk) {
      case 'Extreme Risk': return 'bg-red-600';
      case 'Critical Risk': return 'bg-red-500';
      case 'Severe Risk': return 'bg-orange-500';
      case 'High Risk': return 'bg-yellow-500';
      default: return 'bg-yellow-500';
    }
  };
  
  // Function to get glow color based on risk level (for hover effects)
  const getRiskGlowColor = (risk) => {
    switch(risk) {
      case 'Extreme Risk': return 'group-hover:shadow-red-600/40';
      case 'Critical Risk': return 'group-hover:shadow-red-500/40';
      case 'Severe Risk': return 'group-hover:shadow-orange-500/40';
      case 'High Risk': return 'group-hover:shadow-yellow-500/40';
      default: return 'group-hover:shadow-yellow-500/40';
    }
  };
</script>

<div in:fade={{ duration: 300 }}>
  <div class="flex flex-col md:flex-row gap-10 items-center mb-12">
    <div class="md:w-1/2 relative">
      <div class="aspect-video rounded-xl overflow-hidden relative group">
        <img 
          src="/images/trump_epstein_1.webp" 
          alt="Donald Trump with Jeffrey Epstein" 
          class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 to-transparent"></div>
        <div class="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-l from-red-600 to-transparent"></div>
        <div class="absolute inset-0 flex items-end">
          <div class="p-6">
            <span class="text-sm text-zinc-400 font-medium">Trump with convicted sex trafficker Jeffrey Epstein</span>
          </div>
        </div>
        
        <!-- Glowing effect on hover -->
        <div class="absolute -inset-0.5 bg-red-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
      </div>
    </div>
    
    <div class="md:w-1/2">
      <div class="relative">
        <h3 class="text-3xl font-bold mb-6 inline-block relative">
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700">The Trump Regime</span>
          <div class="absolute -bottom-2 left-0 w-1/3 h-0.5 bg-gradient-to-r from-red-600 to-transparent"></div>
        </h3>
        <p class="text-zinc-300 mb-4 leading-relaxed">
          Donald Trump's sustained assault on democratic institutions, civil rights, and factual information 
          represents an existential threat to American democracy and global stability.
        </p>
        <div class="flex gap-2 mb-6">
          <div class="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-sm flex items-center gap-1">
            <iconify-icon icon="lucide:alert-triangle" width="14" height="14"></iconify-icon>
            <span>Extreme Threat Level</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="mb-10">
    <h4 class="text-2xl font-bold mb-4 inline-block relative">
      Documented Threats
      <div class="absolute -bottom-1 left-0 w-1/6 h-0.5 bg-red-600"></div>
    </h4>
    <p class="text-zinc-300 mb-6">
      These documented actions demonstrate a clear pattern of authoritarian behavior
      and disregard for democratic norms and institutions.
    </p>
  </div>

  <div class="grid md:grid-cols-2 gap-5">
    {#each sortedTrumpFacts as fact, i}
      <div 
        class="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl overflow-hidden relative group transition-all duration-300 hover:border-red-500/30 hover:shadow-lg hover:shadow-red-500/5"
        in:fly={{ y: 20, delay: i * 50, duration: 400 }}
      >
        <!-- Risk indicator dot - more subtle and integrated -->
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