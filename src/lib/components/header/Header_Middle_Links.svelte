<script lang="ts">
	let { data } = $props();
	import { page } from '$app/stores';
	let links = [
		{ name: 'Home', icon: 'tabler:home', link: '/' },
		{ name: 'Play', icon: 'ph:game-controller-fill', link: '/trivia/train' },
		{ name: 'Leaderboards', icon: 'iconoir:leaderboard-star', link: '/leaderboards' },
		{ name: 'Shop', icon: 'iconoir:shop', link: '/shop' }
	];
</script>

{#each links as link}
	<a
		href={link.link ?? `/${link.name.toLowerCase()}`}
		aria-label={link.name}
		class={link.link === $page.url.pathname ? 'border-b-2 border-b-cyan-contrast ' : ''}>
		<div class="group flex w-full items-center justify-between rounded-xl px-3 py-3 hover:bg-bg3">
			<iconify-icon icon={link.icon} class="text-base" width="2em" height="2em"></iconify-icon>
		</div>
	</a>
{/each}
