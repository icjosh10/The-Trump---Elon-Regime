<script lang="ts">
	import { dev } from '$app/environment';
	import { fade } from 'svelte/transition';
	import Header_Right_Messages from '$components/header/Header_Right_Messages.svelte';
	import Header_Right_Notifications from '$components/header/Header_Right_Notifications.svelte';
	import Header_Right_Avatar_Dropdown from '$components/header/Header_Right_Avatar_Dropdown.svelte';
	import Footer from '../footer/Footer.svelte';
	import OptimizedImage from '../OptimizedImage.svelte';
	import Header from '$components/header/Header.svelte';
	import styles from './Nav.module.css';
	import { LinkItems as Links } from './Links';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	//
	let { data, children, showHeader = true, footer = false } = $props();
	let showSidebar = $state(false);
	let showRightSidebar = $state(false);
	let rightSidebarContent = $state('');
	let LinkItems = $state(Links);


	$effect(() => {
		if (!showHeader) {
			showSidebar = false;
			showRightSidebar = false;
			return;
		}

		if (browser) {
			const savedState = document.cookie.split('; ').find((row) => row.startsWith('sidebarOpen='));

			if (savedState) {
				showSidebar = savedState.split('=')[1] === 'true';
			} else {
				// Set default to true if no cookie exists
				document.cookie = 'sidebarOpen=true; path=/; max-age=31536000'; // 1 year expiry
				showSidebar = true;
			}
		}

		// Open sidebar by default on homepage
		if ($page.url.pathname === '/') {
			showSidebar = true;
		}
	});


	onMount(() => {
		if (dev) {
			LinkItems.push(
				{},
				{ name: 'Gr33n', icon: 'ph:tree-evergreen', link: '/gr33n' },
				{ name: 'World	', icon: 'ph:globe', link: '/world' },
				{ name: 'Duel', icon: 'material-symbols:swords-outline', link: '/duel' },
				{ name: 'Dev', icon: 'ph:dev-to-logo-thin', link: '/dev' }
			);
		}

		if (browser) {
			const savedState = document.cookie.split('; ').find((row) => row.startsWith('sidebarOpen='));

			if (savedState) {
				showSidebar = savedState.split('=')[1] === 'true';
			} else {
				// Set default to true if no cookie exists
				document.cookie = 'sidebarOpen=true; path=/; max-age=31536000'; // 1 year expiry
			}
		}

		// Add global click listener to close sidebars when clicking outside
		const handleOutsideClick = (event: MouseEvent) => {
			// Wait a bit to ensure DOM is updated
			setTimeout(() => {
				const target = event.target as HTMLElement;
				const leftSidebarElement = document.getElementById('left-sidebar');
				const rightSidebarElement = document.getElementById('right-sidebar');
				const headerButtonsContainer = document.querySelector('.header-buttons-container');
				const hamburgerButton = document.querySelector('[aria-label="Toggle Sidebar"]');


				if (
					showSidebar &&
					leftSidebarElement &&
					!leftSidebarElement.contains(target) &&
					hamburgerButton &&
					!hamburgerButton.contains(target)
				) {
					showSidebar = false;
					if (browser) {
						document.cookie = `sidebarOpen=false; path=/; max-age=31536000`;
					}
				}

				if (
					showRightSidebar &&
					rightSidebarElement &&
					headerButtonsContainer &&
					!rightSidebarElement.contains(target) &&
					!headerButtonsContainer.contains(target)
				) {
					showRightSidebar = false;
				}
			}, 0);
		};


		// Use capture phase to ensure this runs before other click handlers
		document.addEventListener('click', handleOutsideClick, { capture: true });


		return () => {
			document.removeEventListener('click', handleOutsideClick, { capture: true });
		};
	});


	function toggleSidebar() {
		showSidebar = !showSidebar;
		if (browser) {
			document.cookie = `sidebarOpen=${showSidebar}; path=/; max-age=31536000`;
		}
	}


	function toggleRightSidebar(content?: 'messages' | 'notifications' | 'profile') {
		if (content) {
			// If clicking the same content that's already open, close the sidebar
			if (content === rightSidebarContent && showRightSidebar) {
				showRightSidebar = false;
				return;
			}

			// Otherwise, change content and ensure sidebar is open
			rightSidebarContent = content;
			showRightSidebar = true;
		} else {
			// If no content specified, toggle sidebar
			showRightSidebar = !showRightSidebar;
		}
	}


	let screenWidth = $state(0);
	let screenType = $derived.by(() => {
		if (screenWidth < 700) return 'mobile';
		else if (screenWidth < 1000) return 'tablet';
		else return 'desktop';
	});
</script>

<svelte:window bind:innerWidth={screenWidth} />

<div class="flex min-h-screen flex-col">
	{#if showHeader}
		<Header {data} {toggleSidebar} {toggleRightSidebar} />
	{/if}

	<main class="flex-1">
		{#if showHeader}
			{#if showSidebar}
				<div
					id="left-sidebar"
					class="fixed top-[56px] z-20 h-[calc(100vh-56px)] overflow-hidden"
					style="width: {screenType === 'desktop' ? '250px' : '100%'}; left: 0;">
					<div class="relative h-full overflow-y-auto {styles.nav_sidebar}">
						<button
							type="button"
							class="absolute {screenType === 'desktop'
								? 'top-3'
								: 'top-2'} right-3 z-50 flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white shadow-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
							onclick={() => toggleSidebar()}>
							<iconify-icon icon="material-symbols:close" width="20" height="20" />
						</button>
						<div class="mb-4 w-full">
							<a href="/user" class={styles.nav_profile}>
								<OptimizedImage
									src={data.user.social.img || '/images/logo.webp'}
									class={styles.nav_profile_img}
									style="width: 40px; height: 40px; display: block; border-radius: 0.75rem;"
									width="40"
									height="40"
									alt="Profile" />
								<span class="ml-4 text-base font-medium uppercase tracking-wider text-cyan-100">
									{data.user.social.name}
								</span>
							</a>
						</div>
						<nav class="flex flex-col">
							{#each LinkItems as { name, link, icon }}
								{#if !name}
									<div class="my-2 border-b-2 border-gray-700" />
								{:else}
									<a href={link || `/${name.toLowerCase()}`}>
										<div
											class="group flex w-full items-center p-2 pl-4 {styles.nav_link} {link ===
											$page.url.pathname
												? styles.active
												: ''}">
											<iconify-icon {icon} class="text-base" width="2em" height="2em" />
											<span class="ml-6 text-lg font-medium text-text">{name}</span>
										</div>
									</a>
								{/if}
							{/each}
						</nav>
					</div>
				</div>
			{/if}

			{#if showRightSidebar}
				<div
					id="right-sidebar"
					class="fixed top-[56px] z-20 h-[calc(100vh-56px)] overflow-hidden"
					style="width: {screenType === 'desktop' ? '400px' : '100%'}; right: 0;">
					<div
						class="relative h-full overflow-y-auto {styles.nav_sidebar} {screenType !== 'desktop'
							? 'bg-[#0c0c0c] dark:bg-[#0c0c0c]'
							: ''}">
						<button
							type="button"
							class="absolute {screenType === 'desktop'
								? 'top-3'
								: 'top-2'} right-3 z-50 flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white shadow-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
							onclick={() => toggleRightSidebar()}>
							<iconify-icon icon="material-symbols:close" width="20" height="20" />
						</button>
						<nav class="flex flex-col">
							{#if rightSidebarContent === 'messages'}
								<div class="p-2 pb-0 text-lg font-semibold uppercase tracking-wider text-cyan-300">
									Messages
								</div>
								<Header_Right_Messages {data} />
							{:else if rightSidebarContent === 'notifications'}
								<div class="p-2 pb-0 text-lg font-semibold uppercase tracking-wider text-cyan-300">
									Notifications
								</div>
								<Header_Right_Notifications {data} />
							{:else if rightSidebarContent === 'profile'}
								<div class="p-2 pb-0 text-lg font-semibold uppercase tracking-wider text-cyan-300">
									Profile
								</div>
								<Header_Right_Avatar_Dropdown {data} />
							{/if}
						</nav>
					</div>
				</div>
			{/if}
		{/if}

		<div
			class="min-h-[calc(100vh-56px)] {showHeader ? 'mt-[56px]' : ''}"
			style="margin-left: {showHeader && showSidebar && screenType === 'desktop'
				? '250px'
				: '0'}; margin-right: {showHeader && showRightSidebar && screenType === 'desktop'
				? '400px'
				: '0'};">
			<div class="max-w-content z-10 mx-auto min-h-full w-full items-center {styles.nav_container}">
				{@render children?.()}
				{#if footer}
					<Footer />
				{/if}
			</div>
		</div>
	</main>
</div>
