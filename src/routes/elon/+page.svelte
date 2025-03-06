<script>
  import { fade, fly, slide } from 'svelte/transition';
  
  // Define timeline items with dates, titles, descriptions, and evidence
  const timelineItems = $state([
    {
      id: 1,
      date: '2018',
      title: 'SEC Fraud Settlement',
      description: 'Settled fraud charges with SEC for misleading tweets about taking Tesla private, paid $20 million fine and stepped down as chairman',
      evidence: {
        type: 'image',
        url: 'https://via.placeholder.com/640x480',
        caption: 'SEC complaint documents against Elon Musk',
        source: 'https://www.sec.gov/news/press-release/2018-226'
      }
    },
    {
      id: 2,
      date: '2018-2019',
      title: 'Thai Cave Rescue Controversy',
      description: 'Called British cave diver who helped rescue trapped Thai children a "pedo guy" after the rescuer criticized Musk\'s submarine',
      evidence: {
        type: 'image',
        url: 'https://via.placeholder.com/640x480',
        caption: 'Musk\'s defamatory tweets against Vernon Unsworth',
        source: 'https://www.theguardian.com/technology/2019/dec/03/elon-musk-defamation-trial-thai-cave-vernon-unsworth'
      }
    },
    {
      id: 3,
      date: '2020',
      title: 'COVID-19 Misinformation',
      description: 'Repeatedly downplayed COVID-19 dangers, wrongly predicted "zero new cases" by April 2020, and illegally reopened Tesla factory against health orders',
      evidence: {
        type: 'video',
        url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        caption: 'Musk\'s statements downplaying the COVID-19 pandemic',
        source: 'https://www.cnbc.com/2020/04/29/elon-musk-slams-coronavirus-shelter-in-place-orders-as-fascist.html'
      }
    },
    {
      id: 4,
      date: 'April 2022',
      title: 'Twitter Acquisition Announcement',
      description: 'Announced plan to acquire Twitter for $44 billion, causing market volatility and later attempted to back out of the deal',
      evidence: {
        type: 'image',
        url: 'https://via.placeholder.com/640x480',
        caption: 'Musk\'s announcement tweet and SEC filings for Twitter acquisition',
        source: 'https://www.sec.gov/Archives/edgar/data/1418091/000110465922048128/tm2213229d1_sc13ga.htm'
      }
    },
    {
      id: 5,
      date: 'October 2022',
      title: 'Twitter Acquisition and Mass Layoffs',
      description: 'Completed Twitter acquisition and immediately laid off approximately 50% of workforce without proper notice',
      evidence: {
        type: 'image',
        url: 'https://via.placeholder.com/640x480',
        caption: 'News coverage of Twitter mass layoffs',
        source: 'https://www.reuters.com/technology/musk-begins-his-twitter-ownership-with-firings-2022-10-28/'
      }
    },
    {
      id: 6,
      date: 'November 2022',
      title: 'Twitter Blue Verification Chaos',
      description: 'Implemented paid verification system that led to impersonation crisis and advertising exodus, costing millions in lost revenue',
      evidence: {
        type: 'image',
        url: 'https://via.placeholder.com/640x480',
        caption: 'Screenshots of fake verified accounts impersonating major brands',
        source: 'https://www.nytimes.com/2022/11/11/technology/twitter-verification-elon-musk.html'
      }
    },
    {
      id: 7,
      date: 'December 2022',
      title: 'Account Suspension of Journalists',
      description: 'Suspended accounts of multiple journalists who reported on ElonJet tracker, violating principles of press freedom',
      evidence: {
        type: 'image',
        url: 'https://via.placeholder.com/640x480',
        caption: 'List of suspended journalist accounts',
        source: 'https://www.cnn.com/2022/12/15/tech/twitter-suspends-journalists/index.html'
      }
    },
    {
      id: 8,
      date: '2022-2023',
      title: 'Twitter Algorithmic Amplification',
      description: 'Admitted to artificially boosting his own tweets after engagement dropped, manipulating the platform\'s algorithm',
      evidence: {
        type: 'video',
        url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        caption: 'Musk confirming algorithm manipulation to favor his content',
        source: 'https://www.theverge.com/2023/2/14/23599232/elon-musk-twitter-algorithm-tweets-views-engagement'
      }
    },
    {
      id: 9,
      date: 'July 2023',
      title: 'Twitter Rebranding to X',
      description: 'Abruptly rebranded Twitter to "X", erasing 17 years of brand value and cultural significance without strategic planning',
      evidence: {
        type: 'image',
        url: 'https://via.placeholder.com/640x480',
        caption: 'Twitter headquarters sign being removed',
        source: 'https://www.bbc.com/news/technology-66308456'
      }
    },
    {
      id: 10,
      date: '2022-Present',
      title: 'Rise in Hate Speech on Twitter/X',
      description: 'Platform saw dramatic increase in hate speech, antisemitism, and extremist content after policy and moderation changes',
      evidence: {
        type: 'image',
        url: 'https://via.placeholder.com/640x480',
        caption: 'Research data showing increase in hate speech metrics',
        source: 'https://www.adl.org/resources/report/toxic-twitter-elon-musks-platform'
      }
    },
    {
      id: 11,
      date: 'November 2023',
      title: 'Antisemitic Tweet Endorsement',
      description: 'Endorsed antisemitic conspiracy theory claiming Jewish communities promote "hatred against whites," leading to major advertiser exodus',
      evidence: {
        type: 'image',
        url: 'https://via.placeholder.com/640x480',
        caption: 'Screenshot of Musk\'s endorsement of antisemitic tweet',
        source: 'https://www.theguardian.com/technology/2023/nov/16/elon-musk-antisemitic-post-twitter-x-hate-speech'
      }
    },
    {
      id: 12,
      date: '2023-Present',
      title: 'Political Radicalization',
      description: 'Increasingly promoted far-right conspiracy theories and engaged with extremist accounts, using platform to amplify political division',
      evidence: {
        type: 'video',
        url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        caption: 'Analysis of Musk\'s increasing political extremism',
        source: 'https://time.com/6341309/elon-musk-right-wing-influencer/'
      }
    }
  ]);

  // State for active item and filter
  let selectedTimelineItem = $state(null);
  let searchTerm = $state('');

  // Filtered timeline items based on search term - using $derived.by for complex filtering
  const filteredItems = $derived.by(() => {
    return timelineItems.filter(item => 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.date.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Function to select an item
  function selectItem(item) {
    if (selectedTimelineItem && selectedTimelineItem.id === item.id) {
      selectedTimelineItem = null;
    } else {
      selectedTimelineItem = item;
    }
  }

  // Function to reset selection
  function resetSelection() {
    selectedTimelineItem = null;
  }

  // Function to get appropriate media component based on evidence type
  function renderEvidence(evidence) {
    if (!evidence) return null;
    
    switch (evidence.type) {
      case 'image':
        return `
          <div class="relative rounded-lg overflow-hidden">
            <img src="${evidence.url}" alt="${evidence.caption}" class="w-full object-cover" />
            <div class="absolute bottom-0 left-0 right-0 bg-black/70 p-3 text-xs text-zinc-300">
              ${evidence.caption}
            </div>
          </div>
        `;
      case 'video':
        return `
          <div class="aspect-video w-full rounded-lg overflow-hidden">
            <iframe 
              src="${evidence.url}" 
              title="${evidence.caption}"
              class="w-full h-full" 
              frameborder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowfullscreen
            ></iframe>
          </div>
        `;
      default:
        return null;
    }
  }
</script>

<div class="max-w-6xl mx-auto px-4 py-12">
  <!-- Page Header -->
  <div in:fade={{ duration: 500 }} class="mb-16 text-center">
    <h1 class="text-4xl md:text-5xl font-bold mb-4">
      <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
        Elon Musk's Timeline of Controversy
      </span>
    </h1>
    <p class="text-xl text-zinc-300/90 max-w-3xl mx-auto">
      A chronological record of Elon Musk's most significant controversies, platform manipulation, and harmful influence with supporting evidence.
    </p>
    
    <!-- Search Bar -->
    <div class="mt-8 max-w-lg mx-auto">
      <div class="relative">
        <input 
          type="text" 
          bind:value={searchTerm}
          placeholder="Search timeline events..." 
          class="w-full py-3 px-4 pl-10 bg-zinc-800/50 border border-zinc-700/50 rounded-lg text-zinc-200 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50"
        />
        <div class="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400">
          <iconify-icon icon="lucide:search" width="18" height="18"></iconify-icon>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Timeline Section -->
  <div class="relative">
    <!-- Timeline Line -->
    <div class="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-blue-500 via-indigo-500 to-purple-600"></div>
    
    <!-- Timeline Items -->
    <div class="relative">
      {#each filteredItems as item, i}
        <div
          in:fly={{ y: 20, delay: i * 100, duration: 300 }}
          class="mb-12 md:mb-20 relative"
        >
          <!-- Date Marker -->
          <div class="absolute left-1/2 transform -translate-x-1/2 -mt-2 flex flex-col items-center">
            <div class="rounded-full h-8 w-8 bg-indigo-500 border-4 border-zinc-900 flex items-center justify-center z-10">
              <div class="h-2 w-2 bg-white rounded-full"></div>
            </div>
            <div class="mt-2 py-1 px-3 bg-zinc-800 rounded-lg text-sm font-bold text-zinc-200">
              {item.date}
            </div>
          </div>
          
          <!-- Timeline Content -->
          <div class={`relative ${i % 2 === 0 ? 'ml-auto mr-12 md:mr-0 md:ml-[55%] text-left' : 'mr-auto ml-12 md:ml-0 md:mr-[55%] md:text-right'} w-[85%] md:w-[42%] mt-12`}>
            <!-- Timeline Card -->
            <div 
              class="bg-zinc-800/30 backdrop-blur-sm border border-zinc-700/30 rounded-xl overflow-hidden hover:border-zinc-600/40 transition-all"
              onclick={() => selectItem(item)}
            >
              <!-- Card Header -->
              <div class="p-5 cursor-pointer">
                <h3 class="text-xl font-bold text-indigo-400 mb-2">{item.title}</h3>
                <p class="text-zinc-300">{item.description}</p>
              </div>
              
              <!-- Evidence Section (Expandable) -->
              {#if selectedTimelineItem && selectedTimelineItem.id === item.id}
                <div 
                  class="border-t border-zinc-700/50 p-5"
                  transition:slide={{ duration: 300 }}
                >
                  <div class="mb-4">
                    {@html renderEvidence(item.evidence)}
                  </div>
                  
                  <div class="flex justify-between items-center mt-4">
                    <a 
                      href={item.evidence.source} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      class="text-sm text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors"
                    >
                      View Source
                      <iconify-icon icon="lucide:external-link" width="14" height="14"></iconify-icon>
                    </a>
                    
                    <button 
                      onclick={() => resetSelection()}
                      class="text-sm text-zinc-400 hover:text-zinc-300 transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              {/if}
            </div>
          </div>
        </div>
      {/each}
      
      {#if filteredItems.length === 0}
        <div class="text-center py-20 text-zinc-400">
          <iconify-icon icon="lucide:search-x" width="48" height="48"></iconify-icon>
          <p class="mt-4 text-xl">No timeline events match your search.</p>
        </div>
      {/if}
    </div>
  </div>
  
  <!-- Footer -->
  <div class="mt-20 text-center text-zinc-400 text-sm">
    <p>
      This timeline is based on verified public information and documentation. 
      All sources are linked for verification.
    </p>
  </div>
</div>
