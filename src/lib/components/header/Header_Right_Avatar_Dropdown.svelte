<script lang="ts">
	import { goto } from '$app/navigation';
	import OptimizedImage from '../OptimizedImage.svelte';
	import { getLevelAndXpNeeded } from '$lib/functions/calculateLevel';
	const { data } = $props();
	let isLoading = $state(false);

	// Create reactive state for user stats
	let level = $state(1);
	let levelProgress = $state(0);
	let currentLevelXp = $state('0/20');

	// Calculate level and progress based on XP
	$effect(() => {
		if (data.user?.stats?.xp !== undefined) {
			const levelInfo = getLevelAndXpNeeded(data.user.stats.xp);
			level = levelInfo.level;
			levelProgress = Math.floor((levelInfo.xpInCurrentLevel / levelInfo.xpNeeded) * 100);
			currentLevelXp = `${levelInfo.xpInCurrentLevel}/${levelInfo.xpNeeded}`;
		}
	});

	async function handleSignOut() {
		isLoading = true;
		try {
			await goto('/signout');
		} catch (error) {
			console.error('Sign out failed:', error);
		} finally {
			isLoading = false;
		}
	}
</script>

<div class="flex h-full w-full flex-col p-4">
	{#if data?.user?.guest}
		<!-- Guest View -->
		<div class="flex flex-col items-center gap-4 text-center">
			<div class="text-[#e0e7ec]">
				<h2 class="text-lg font-bold">Sign in to track your progress</h2>
				<p class="mt-2 text-sm text-[#e0e7ec80]">
					Create an account to save your achievements and compete on the leaderboard
				</p>
			</div>
			<a
				href="/signin"
				class="group flex w-full items-center justify-center gap-3 rounded-lg border border-[#4a9eff33] bg-[#4a9eff] p-3 font-medium text-white shadow-[0_0_10px_rgba(74,158,255,0.1)] backdrop-blur-[5px] transition-all hover:bg-[#4a9eff]/90 hover:shadow-[0_0_15px_rgba(74,158,255,0.2)]">
				<iconify-icon icon="material-symbols:login" height={24} width={24} />
				<span>Sign In</span>
			</a>
		</div>
	{:else}
		<!-- Profile Header -->
		<div
			class="group relative mb-4 overflow-hidden rounded-lg border border-[#4a9eff33] bg-[#0c253799] p-4 shadow-[0_0_10px_rgba(74,158,255,0.1)] backdrop-blur-[5px] transition-all hover:border-[#4a9eff80] hover:shadow-[0_0_15px_rgba(74,158,255,0.2)]">
			<a href="/user/{data.user._id}">
				<div class="flex items-center gap-4">
					<div class="relative">
						<OptimizedImage
							src={data.user.social?.img || '/images/logo.webp'}
							alt={data.user.username}
							class="h-16 w-16 rounded-lg border-2 border-[#4a9eff33] object-cover shadow-lg transition-all group-hover:border-[#4a9eff80] group-hover:shadow-[0_0_10px_rgba(74,158,255,0.3)]" />
						{#if data.user.online}
							<span
								class="absolute bottom-0 right-0 block h-4 w-4 rounded-full border-2 border-[#0c2537] bg-green-500">
								<span class="absolute inset-0 animate-ping rounded-full bg-green-500 opacity-75" />
							</span>
						{/if}
					</div>
					<div class="min-w-0 flex-1">
						<h2 class="truncate text-lg font-bold text-[#e0e7ec]">
							{data.user.username}
						</h2>
						<p class="truncate text-sm text-[#e0e7ec80]">{data.user.email}</p>
					</div>
				</div>
			</a>
			<!-- Level Progress -->
			<div class="mt-4">
				<div class="mb-2 flex justify-between text-sm">
					<span class="text-[#e0e7ec]">Level {level}</span>
					<span class="text-[#4a9eff]">{currentLevelXp} XP</span>
				</div>
				<div class="h-2 overflow-hidden rounded-full bg-[#4a9eff33]">
					<div
						class="h-full rounded-full bg-[#4a9eff] transition-all duration-300 ease-out"
						style="width: {levelProgress}%" />
				</div>
			</div>
		</div>

		<!-- Quick Stats Grid -->
		<div
			class="group mb-4 grid grid-rows-3 gap-2 rounded-lg border border-[#4a9eff33] bg-[#0c253799] p-2 shadow-[0_0_10px_rgba(74,158,255,0.1)] backdrop-blur-[5px] transition-all hover:border-[#4a9eff80] hover:shadow-[0_0_15px_rgba(74,158,255,0.2)]">
			<div
				class="flex items-center gap-3 rounded-lg border border-[#4a9eff33] bg-[#0c253799] p-2 transition-all hover:border-[#4a9eff80] hover:shadow-[0_0_10px_rgba(74,158,255,0.2)]">
				<iconify-icon
					icon="game-icons:trophy"
					class="text-yellow-500 transition-transform duration-200 hover:scale-110"
					height={24} />
				<div class="flex flex-col">
					<span class="text-sm font-medium text-[#e0e7ec]">
						{data.user.stats?.achievements || 0}
					</span>
					<span class="text-xs text-[#e0e7ec80]">Achievements</span>
				</div>
			</div>
			<div
				class="flex items-center gap-3 rounded-lg border border-[#4a9eff33] bg-[#0c253799] p-2 transition-all hover:border-[#4a9eff80] hover:shadow-[0_0_10px_rgba(74,158,255,0.2)]">
				<iconify-icon
					icon="fxemoji:gem"
					class="text-[#4a9eff] transition-transform duration-200 hover:scale-110"
					height={24} />
				<div class="flex flex-col">
					<span class="text-sm font-medium text-[#e0e7ec]">{data.user.stats?.coins || 0}</span>
					<span class="text-xs text-[#e0e7ec80]">Coins</span>
				</div>
			</div>
			<div
				class="flex items-center gap-3 rounded-lg border border-[#4a9eff33] bg-[#0c253799] p-2 transition-all hover:border-[#4a9eff80] hover:shadow-[0_0_10px_rgba(74,158,255,0.2)]">
				<iconify-icon
					icon="game-icons:podium"
					class="text-green-500 transition-transform duration-200 hover:scale-110"
					height={24} />
				<div class="flex flex-col">
					<span class="text-sm font-medium text-[#e0e7ec]">{data.user.stats?.rank || 'N/A'}</span>
					<span class="text-xs text-[#e0e7ec80]">Rank</span>
				</div>
			</div>
		</div>

		<!-- Action Buttons -->
		<div class="flex flex-col gap-2">
			<a
				href="/profile"
				class="group flex items-center gap-3 rounded-lg border border-[#4a9eff33] bg-[#0c253799] p-3 shadow-[0_0_10px_rgba(74,158,255,0.1)] backdrop-blur-[5px] transition-all hover:border-[#4a9eff80] hover:shadow-[0_0_15px_rgba(74,158,255,0.2)]">
				<div
					class="flex h-10 w-10 items-center justify-center rounded-lg border border-[#4a9eff33] bg-[#0c253799] transition-all group-hover:border-[#4a9eff80] group-hover:shadow-[0_0_10px_rgba(74,158,255,0.2)]">
					<iconify-icon icon="material-symbols:person" height={24} width={24} />
				</div>
				<span>Profile</span>
			</a>

			<!-- Privacy and Terms Links -->
			<div class="flex gap-2">
				<a
					href="/privacy"
					class="group flex flex-1 items-center gap-3 rounded-lg border border-[#4a9eff33] bg-[#0c253799] p-3 shadow-[0_0_10px_rgba(74,158,255,0.1)] backdrop-blur-[5px] transition-all hover:border-[#4a9eff80] hover:shadow-[0_0_15px_rgba(74,158,255,0.2)]">
					<div
						class="flex h-10 w-10 items-center justify-center rounded-lg border border-[#4a9eff33] bg-[#0c253799] shadow-[0_0_10px_rgba(74,158,255,0.1)] transition-all group-hover:border-[#4a9eff80] group-hover:shadow-[0_0_15px_rgba(74,158,255,0.2)]">
						<iconify-icon icon="material-symbols:privacy-tip" height={24} width={24} />
					</div>
					<span>Privacy</span>
				</a>
				<a
					href="/terms"
					class="group flex flex-1 items-center gap-3 rounded-lg border border-[#4a9eff33] bg-[#0c253799] p-3 shadow-[0_0_10px_rgba(74,158,255,0.1)] backdrop-blur-[5px] transition-all hover:border-[#4a9eff80] hover:shadow-[0_0_15px_rgba(74,158,255,0.2)]">
					<div
						class="flex h-10 w-10 items-center justify-center rounded-lg border border-[#4a9eff33] bg-[#0c253799] shadow-[0_0_10px_rgba(74,158,255,0.1)] transition-all group-hover:border-[#4a9eff80] group-hover:shadow-[0_0_15px_rgba(74,158,255,0.2)]">
						<iconify-icon icon="material-symbols:description" height={24} width={24} />
					</div>
					<span>Terms</span>
				</a>
			</div>

			<button
				onclick={handleSignOut}
				disabled={isLoading}
				class="group flex items-center gap-3 rounded-lg border border-red-400/30 bg-red-950/20 p-3 shadow-[0_0_10px_rgba(239,68,68,0.1)] backdrop-blur-[5px] transition-all hover:border-red-400/50 hover:shadow-[0_0_15px_rgba(239,68,68,0.2)]">
				<div
					class="flex h-10 w-10 items-center justify-center rounded-lg border border-red-400/30 bg-red-950/20 text-red-400 shadow-[0_0_10px_rgba(239,68,68,0.1)] backdrop-blur-[5px] transition-all group-hover:border-red-400/50 group-hover:shadow-[0_0_15px_rgba(239,68,68,0.2)]">
					<iconify-icon icon="material-symbols:logout" height={24} width={24} />
				</div>
				<span class="text-red-400">{isLoading ? 'Signing out...' : 'Sign Out'}</span>
			</button>
		</div>
	{/if}
</div>

<style>
	:global(.dark) input {
		color-scheme: dark;
	}

	/* Add the scanning animation from nav_sidebar */
	div :global(.group)::before {
		content: '';
		position: absolute;
		top: 0;
		left: -150%;
		width: 100%;
		height: 100%;
		background: linear-gradient(90deg, transparent, rgba(74, 158, 255, 0.1), transparent);
		transform: skewX(-25deg);
		transition: 0.5s;
	}

	div :global(.group:hover)::before {
		left: 150%;
	}
</style>
