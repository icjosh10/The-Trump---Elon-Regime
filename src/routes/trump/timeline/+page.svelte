<script>
  import { fade, fly, slide } from 'svelte/transition';
  
  // Define timeline items with dates, titles, descriptions, and evidence
  const timelineItems = $state([
    {
      id: 1,
      date: '1973',
      title: 'Housing Discrimination',
      description: 'Trump Management Corporation charged with discriminating against Black rental applicants',
      evidence: {
        type: 'image',
        url: 'https://via.placeholder.com/640x480',
        caption: 'DOJ lawsuit documents against Trump Management',
        source: 'https://www.npr.org/2016/09/29/495955920/donald-trump-plagued-by-decades-old-housing-discrimination-case'
      }
    },
    {
      id: 2,
      date: '1989',
      title: 'Central Park Five',
      description: 'Trump paid for full-page ads calling for the death penalty for the Central Park Five, who were later exonerated by DNA evidence',
      evidence: {
        type: 'image',
        url: 'https://via.placeholder.com/640x480',
        caption: 'Trump\'s full-page advertisement calling for death penalty',
        source: 'https://www.nytimes.com/2019/06/18/nyregion/central-park-five-trump.html'
      }
    },
    {
      id: 3,
      date: '2011-2016',
      title: 'Birtherism Movement',
      description: 'Led the racist "birther" movement questioning President Obama\'s citizenship',
      evidence: {
        type: 'video',
        url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        caption: 'Trump promoting the birther conspiracy',
        source: 'https://www.cnn.com/2016/09/09/politics/donald-trump-birther/index.html'
      }
    },
    {
      id: 4,
      date: 'June 2015',
      title: 'Presidential Campaign Announcement',
      description: 'Called Mexican immigrants "rapists" and criminals during his campaign announcement',
      evidence: {
        type: 'video',
        url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        caption: 'Trump\'s campaign announcement speech',
        source: 'https://time.com/3923128/donald-trump-announcement-speech/'
      }
    },
    {
      id: 5,
      date: 'October 2016',
      title: 'Access Hollywood Tape',
      description: 'Recorded bragging about sexually assaulting women ("grab them by the p***y")',
      evidence: {
        type: 'video',
        url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        caption: 'Access Hollywood tape released by Washington Post',
        source: 'https://www.washingtonpost.com/politics/trump-recorded-having-extremely-lewd-conversation-about-women-in-2005/2016/10/07/3b9ce776-8cb4-11e6-bf8a-3d26847eeed4_story.html'
      }
    },
    {
      id: 6,
      date: '2017-2020',
      title: 'Muslim Travel Ban',
      description: 'Implemented discriminatory travel bans targeting Muslim-majority countries',
      evidence: {
        type: 'image',
        url: 'https://via.placeholder.com/640x480',
        caption: 'Nationwide protests against the travel ban',
        source: 'https://www.aclu.org/issues/immigrants-rights/trump-administration-muslim-ban'
      }
    },
    {
      id: 7,
      date: '2018',
      title: 'Family Separation Policy',
      description: 'Separated thousands of migrant children from their parents at the southern border',
      evidence: {
        type: 'image',
        url: 'https://via.placeholder.com/640x480',
        caption: 'Children in cages at border detention facilities',
        source: 'https://www.reuters.com/article/us-usa-immigration-children/u-s-government-says-it-has-reunited-522-children-removed-under-zero-tolerance-idUSKBN1JO2JB'
      }
    },
    {
      id: 8,
      date: 'July 2019',
      title: 'Racist Attacks on Congresswomen',
      description: 'Told four congresswomen of color to "go back" to where they came from',
      evidence: {
        type: 'image',
        url: 'https://via.placeholder.com/640x480',
        caption: 'Trump\'s racist tweets against "The Squad"',
        source: 'https://www.nytimes.com/2019/07/14/us/politics/trump-twitter-squad-congress.html'
      }
    },
    {
      id: 9,
      date: 'June 2020',
      title: 'Lafayette Square Photo Op',
      description: 'Tear-gassed peaceful protesters for a Bible photo op during George Floyd protests',
      evidence: {
        type: 'image',
        url: 'https://via.placeholder.com/640x480',
        caption: 'Trump holding Bible after clearing protesters with tear gas',
        source: 'https://www.nytimes.com/2020/06/01/us/politics/trump-st-johns-church-bible.html'
      }
    },
    {
      id: 10,
      date: 'November 2020',
      title: 'Election Lies',
      description: 'Began spreading false claims of election fraud after losing the 2020 election',
      evidence: {
        type: 'video',
        url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        caption: 'Trump\'s false claims of election fraud',
        source: 'https://apnews.com/article/ap-fact-check-donald-trump-a98d72c41c8a096e85b49c9dfece0134'
      }
    },
    {
      id: 11,
      date: 'January 6, 2021',
      title: 'Capitol Insurrection',
      description: 'Incited violent insurrection at the US Capitol to overturn the election results',
      evidence: {
        type: 'video',
        url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        caption: 'Trump\'s speech before the Capitol insurrection',
        source: 'https://www.justice.gov/opa/pr/leader-oath-keepers-and-10-other-individuals-indicted-federal-court-seditious-conspiracy-and'
      }
    },
    {
      id: 12,
      date: '2022-Present',
      title: 'Classified Documents Case',
      description: 'Illegally took and stored classified documents at Mar-a-Lago after leaving office',
      evidence: {
        type: 'image',
        url: 'https://via.placeholder.com/640x480',
        caption: 'FBI photo of classified documents found at Mar-a-Lago',
        source: 'https://www.justice.gov/storage/Report_of_the_Attorney_General_Pursuant_to_Section_28CFR_600.9c.pdf'
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
      <span class="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700">
        Trump's Timeline of Corruption
      </span>
    </h1>
    <p class="text-xl text-zinc-300/90 max-w-3xl mx-auto">
      A chronological record of Trump's most significant controversies, scandals, and criminal behavior with supporting evidence.
    </p>
    
    <!-- Search Bar -->
    <div class="mt-8 max-w-lg mx-auto">
      <div class="relative">
        <input 
          type="text" 
          bind:value={searchTerm}
          placeholder="Search timeline events..." 
          class="w-full py-3 px-4 pl-10 bg-zinc-800/50 border border-zinc-700/50 rounded-lg text-zinc-200 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50"
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
    <div class="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-red-600 via-red-500 to-red-700"></div>
    
    <!-- Timeline Items -->
    <div class="relative">
      {#each filteredItems as item, i}
        <div
          in:fly={{ y: 20, delay: i * 100, duration: 300 }}
          class="mb-12 md:mb-20 relative"
        >
          <!-- Date Marker -->
          <div class="absolute left-1/2 transform -translate-x-1/2 -mt-2 flex flex-col items-center">
            <div class="rounded-full h-8 w-8 bg-red-600 border-4 border-zinc-900 flex items-center justify-center z-10">
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
                <h3 class="text-xl font-bold text-red-500 mb-2">{item.title}</h3>
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
                      class="text-sm text-red-400 hover:text-red-300 flex items-center gap-1 transition-colors"
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