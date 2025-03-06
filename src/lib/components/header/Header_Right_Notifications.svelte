<!-- Example Notifications Component - For Demo Purposes Only -->
<script lang="ts">
	// Dummy data for demonstration
	const notifications = [
		{
			id: 1,
			type: 'achievement',
			title: 'New Achievement Unlocked!',
			message: 'Completed your first coding challenge',
			time: '2 minutes ago',
			read: false,
			icon: '🏆'
		},
		{
			id: 2,
			type: 'course',
			title: 'New Course Available',
			message: 'Introduction to Game Development with Unity',
			time: '1 hour ago',
			read: false,
			icon: '📚'
		},
		{
			id: 3,
			type: 'social',
			title: 'New Follower',
			message: 'Alex Chen started following your progress',
			time: '3 hours ago',
			read: true,
			icon: '👥'
		},
		{
			id: 4,
			type: 'reminder',
			title: 'Course Deadline Approaching',
			message: 'Complete Python Basics by tomorrow',
			time: '5 hours ago',
			read: true,
			icon: '⏰'
		}
	];
</script>

<div class="flex h-full w-full flex-col p-4">
	<div class="mb-4 flex items-center justify-between">
		<button
			class="rounded-lg border border-[#4a9eff33] bg-[#0c253799] px-3 py-1 text-sm text-[#4a9eff] shadow-[0_0_10px_rgba(74,158,255,0.1)] backdrop-blur-[5px] transition-all hover:border-[#4a9eff80] hover:shadow-[0_0_15px_rgba(74,158,255,0.2)]">
			Mark all as read
		</button>
	</div>

	<!-- Search -->
	<div class="flex items-center gap-2 px-0">
		<input
			type="text"
			placeholder="Search notifications..."
			class="flex-1 rounded-lg border border-[#4a9eff33] bg-[#0c253799] px-4 py-2 text-sm text-[#e0e7ec] placeholder-[#e0e7ec80] shadow-[0_0_10px_rgba(74,158,255,0.1)] backdrop-blur-[5px] transition-all focus:border-[#4a9eff80] focus:outline-none focus:ring-0" />
		<button
			class="flex h-9 w-9 items-center justify-center rounded-lg border border-[#4a9eff33] bg-[#0c253799] text-[#4a9eff] shadow-[0_0_10px_rgba(74,158,255,0.1)] backdrop-blur-[5px] transition-all hover:border-[#4a9eff80] hover:shadow-[0_0_15px_rgba(74,158,255,0.2)]"
			aria-label="Filter">
			<iconify-icon icon="material-symbols:filter-list" height={24} width={24} />
		</button>
	</div>

	<!-- Notifications List -->
	<div class="mt-4 flex flex-col gap-3">
		{#each notifications as notification}
			<div
				class="group relative flex items-start gap-3 rounded-lg border border-[#4a9eff33] bg-[#0c253799] p-3 shadow-[0_0_10px_rgba(74,158,255,0.1)] backdrop-blur-[5px] transition-all hover:border-[#4a9eff80] hover:shadow-[0_0_15px_rgba(74,158,255,0.2)]"
				class:!border-l-[3px]={!notification.read}
				class:!border-l-[#4a9eff]={!notification.read}>
				<div
					class="flex h-10 w-10 items-center justify-center rounded-lg border border-[#4a9eff33] bg-[#0c253799] text-[#4a9eff] shadow-[0_0_10px_rgba(74,158,255,0.1)] backdrop-blur-[5px] transition-all group-hover:border-[#4a9eff80] group-hover:shadow-[0_0_15px_rgba(74,158,255,0.2)]">
					<iconify-icon icon={notification.icon} height={24} width={24} />
				</div>
				<div class="flex flex-1 flex-col">
					<div class="flex items-center justify-between">
						<span class="font-medium text-[#e0e7ec]">{notification.title}</span>
						<span class="text-xs text-[#e0e7ec80]">{notification.time}</span>
					</div>
					<p class="mt-1 text-sm text-[#e0e7ec99]">{notification.message}</p>
				</div>
			</div>
		{/each}
	</div>
</div>

<!-- Work on Later -->
<h1 class="pt-4 text-xl font-bold">Under Construction. Dummy Data</h1>

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
