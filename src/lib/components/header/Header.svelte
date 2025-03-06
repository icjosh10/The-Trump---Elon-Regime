<script>
	let { data, toggleSidebar, toggleRightSidebar } = $props();
	import { fade } from 'svelte/transition';
	import Header_Left_Search from './Header_Left_Search.svelte';
	import styles from './Header.module.css';
	import OptimizedImage from '../OptimizedImage.svelte';

	let hoverButtons = $state([
		{
			name: 'Messaging',
			icon: 'material-symbols:chat',
			showTooltip: false,
			timer: null,
			isOpen: false,
			onClick: () => toggleRightSidebar('messages')
		},
		{
			name: 'Notifications',
			icon: 'material-symbols:notifications',
			showTooltip: false,
			timer: null,
			isOpen: false,
			onClick: () => toggleRightSidebar('notifications')
		},
		{
			name: 'Profile',
			get img() {
				const img = data?.user?.social?.img;
				return img?.startsWith('http') ? img : img || '/images/logo.webp';
			},
			showTooltip: false,
			timer: null,
			isOpen: false,
			onClick: () => toggleRightSidebar('profile')
		}
	]);

	function handleHoverButtonClick(i) {
		// If the button has an onClick method, call it
		if (hoverButtons[i].onClick) {
			hoverButtons[i].onClick();
		}

		// Close all buttons
		hoverButtons.forEach((button) => {
			button.isOpen = false;
		});
	}

	function handleMouseEnter(i) {
		hoverButtons[i].showTooltip = true;
	}

	function handleMouseLeave(i) {
		hoverButtons[i].showTooltip = false;
	}

	$effect(() => {
		document.addEventListener(
			'click',
			() => {
				hoverButtons.forEach((b) => (b.isOpen = false));
			},
			{ capture: true }
		);
	});
</script>

<div class={styles.header}>
	{@render Left()}

	<div class="flex flex-grow"></div>
	{@render Right()}
</div>

{#snippet Left()}
	<div class="flex items-center gap-4 pl-4">
		<!-- Hamburger -->
		<button class={styles.header_button} onclick={toggleSidebar} aria-label="Toggle Sidebar">
			<iconify-icon icon="material-symbols:menu" class={styles.header_icon}></iconify-icon>
		</button>

		<!-- Logo Link -->
		<a href="/" class={styles.header_logo}>
			<img src="/images/logo.webp" alt="Logo" class="h-full w-full rounded-full object-cover" />
		</a>

		<!-- 🔍 Search 🔎 -->
		<Header_Left_Search />
	</div>
{/snippet}

{#snippet Right()}
	<div class="header-buttons-container flex items-center justify-end gap-2 pr-4">
		{#each hoverButtons as { name, icon, img, showTooltip }, i (name)}
			<div class="relative z-50">
				<button
					class={styles.header_button}
					onclick={(e) => {
						e.stopPropagation();
						handleHoverButtonClick(i);
					}}
					onmouseenter={() => handleMouseEnter(i)}
					onmouseleave={() => handleMouseLeave(i)}
					aria-label={name}>
					{#if icon}
						<iconify-icon {icon} class={styles.header_icon}></iconify-icon>
					{:else if img}
						<OptimizedImage src={img} alt={name} class={styles.header_avatar} />
					{/if}
				</button>

				{#if showTooltip}
					<div transition:fade={{ duration: 150 }} class={styles.header_tooltip}>
						{name}
					</div>
				{/if}
			</div>
		{/each}
	</div>
{/snippet}
