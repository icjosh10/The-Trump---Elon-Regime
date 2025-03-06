<script>
  import { page } from '$app/stores';
  import { fade, fly } from 'svelte/transition';
  
  const links = $state([
    { href: '/', label: 'Home', icon: 'home' },
    { href: '/trump', label: 'Trump Timeline', icon: 'flag' },
    { href: '/elon', label: 'Elon Timeline', icon: 'rocket' }
  ]);
  
  // Determine if a link is active based on the current path
  function isActive(href) {
    if (href === '/') {
      return $page.url.pathname === '/';
    }
    return $page.url.pathname.startsWith(href);
  }
  
  // Toggle mobile menu
  let mobileMenuOpen = $state(false);
  function toggleMobileMenu() {
    mobileMenuOpen = !mobileMenuOpen;
  }
</script>

<nav class="fixed left-0 right-0 top-0 z-50 border-b border-zinc-800/50 backdrop-blur-xl">
  <!-- Glow effect for the active navigation item -->
  <div class="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-30"></div>
  
  <div class="mx-auto max-w-7xl px-4">
    <div class="flex h-16 items-center justify-between">
      <!-- Logo -->
      <div class="flex-shrink-0">
        <a href="/" class="group flex items-center gap-2">
          <div class="relative flex h-8 w-8 items-center justify-center">
            <div class="absolute inset-0 rotate-45 rounded bg-gradient-to-br from-red-500 to-blue-500 opacity-80 blur-[1px] transition-all duration-300 group-hover:rotate-90 group-hover:opacity-100"></div>
            <div class="absolute inset-0 rotate-45 rounded bg-gradient-to-br from-red-500 to-blue-500"></div>
            <iconify-icon icon="lucide:shield-alert" width="16" height="16" class="relative z-10 text-white"></iconify-icon>
          </div>
          <span class="bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 bg-clip-text text-xl font-bold text-transparent">
            Threat Monitor
          </span>
        </a>
      </div>
      
      <!-- Navigation Links - Desktop -->
      <div class="hidden md:block">
        <div class="flex items-center space-x-1">
          {#each links as link}
            <a
              href={link.href}
              class={`group relative px-4 py-2 transition-all duration-300 ${
                isActive(link.href)
                  ? 'text-white'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <!-- Background and effects for active/hover states -->
              {#if isActive(link.href)}
                <div class="absolute inset-0 -z-10 rounded-lg bg-zinc-800/80"></div>
                <div class="absolute inset-0 -z-10 rounded-lg bg-gradient-to-r from-red-600/20 to-blue-600/20 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100"></div>
                <div class="absolute bottom-0 left-1/2 h-0.5 w-1/2 -translate-x-1/2 bg-gradient-to-r from-red-500 to-blue-500 opacity-70"></div>
              {/if}
              
              <div class="flex items-center space-x-2">
                <iconify-icon icon={`lucide:${link.icon}`} width="16" height="16" class={isActive(link.href) ? 'text-red-400' : ''}></iconify-icon>
                <span>{link.label}</span>
              </div>
            </a>
          {/each}
        </div>
      </div>
      
      <!-- Mobile Navigation Toggle -->
      <div class="md:hidden">
        <button
          type="button"
          onclick={toggleMobileMenu}
          class="flex items-center justify-center rounded-lg p-2 text-zinc-400 transition-colors hover:bg-zinc-800/50 hover:text-white focus:outline-none"
          aria-controls="mobile-menu"
          aria-expanded={mobileMenuOpen}
        >
          <span class="sr-only">Toggle menu</span>
          {#if !mobileMenuOpen}
            <iconify-icon icon="lucide:menu" width="24" height="24"></iconify-icon>
          {:else}
            <iconify-icon icon="lucide:x" width="24" height="24"></iconify-icon>
          {/if}
        </button>
      </div>
    </div>
  </div>
  
  <!-- Mobile menu -->
  {#if mobileMenuOpen}
    <div 
      class="md:hidden"
      id="mobile-menu"
      in:fly={{ y: -20, duration: 200 }}
      out:fade={{ duration: 150 }}
    >
      <div class="border-t border-zinc-800/50 px-2 pb-3 pt-2">
        {#each links as link}
          <a
            href={link.href}
            class={`my-1 flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${
              isActive(link.href)
                ? 'bg-gradient-to-r from-zinc-800 to-zinc-800/80 text-white'
                : 'text-zinc-400 hover:bg-zinc-800/40 hover:text-white'
            }`}
            onclick={toggleMobileMenu}
          >
            <iconify-icon 
              icon={`lucide:${link.icon}`} 
              width="18" 
              height="18" 
              class={isActive(link.href) ? 'text-red-400' : ''}
            ></iconify-icon>
            <span>{link.label}</span>
            
            {#if isActive(link.href)}
              <div class="ml-auto">
                <iconify-icon icon="lucide:chevron-right" width="16" height="16" class="text-zinc-500"></iconify-icon>
              </div>
            {/if}
          </a>
        {/each}
      </div>
    </div>
  {/if}
</nav>

<!-- Spacer to prevent content from being hidden behind the fixed navbar -->
<div class="h-16"></div>
