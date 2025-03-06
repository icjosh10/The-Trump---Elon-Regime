<script>
  import { page } from '$app/stores';
  
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
  function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) {
      mobileMenu.classList.toggle('hidden');
    }
  }
</script>

<nav class="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-zinc-900/70 border-b border-zinc-800/50">
  <div class="max-w-6xl mx-auto px-4">
    <div class="flex items-center justify-between h-16">
      <!-- Logo -->
      <div class="flex-shrink-0">
        <a href="/" class="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-red-500">
          Threat Monitor
        </a>
      </div>
      
      <!-- Navigation Links -->
      <div class="hidden md:block">
        <div class="flex items-center space-x-4">
          {#each links as link}
            <a
              href={link.href}
              class={`px-4 py-2 rounded-lg transition-colors ${
                isActive(link.href)
                  ? 'bg-zinc-800 text-white'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
              }`}
            >
              <div class="flex items-center space-x-2">
                <iconify-icon icon={`lucide:${link.icon}`}></iconify-icon>
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
          class="inline-flex items-center justify-center p-2 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800 focus:outline-none"
          aria-controls="mobile-menu"
          aria-expanded="false"
        >
          <span class="sr-only">Open main menu</span>
          <iconify-icon icon="lucide:menu" width="24" height="24"></iconify-icon>
        </button>
      </div>
    </div>
  </div>
  
  <!-- Mobile menu, toggle classes based on menu state -->
  <div class="hidden md:hidden" id="mobile-menu">
    <div class="px-2 pt-2 pb-3 space-y-1 border-t border-zinc-800/50">
      {#each links as link}
        <a
          href={link.href}
          class={`block px-3 py-2 rounded-md ${
            isActive(link.href)
              ? 'bg-zinc-800 text-white'
              : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
          }`}
        >
          <div class="flex items-center space-x-2">
            <iconify-icon icon={`lucide:${link.icon}`}></iconify-icon>
            <span>{link.label}</span>
          </div>
        </a>
      {/each}
    </div>
  </div>
</nav>

<!-- Spacer to prevent content from being hidden behind the fixed navbar -->
<div class="h-16"></div>
