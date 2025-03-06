<script lang="ts">
	const { data } = $props();
	import trimMessage from '$functions/string_utilities';

	// Dummy data for demonstration
	const messages = [
		{
			id: 1,
			sender: 'Sarah Johnson',
			avatar: '👩‍🦰',
			message: 'Hey! Need help with the Python assignment?',
			time: '5 min ago',
			unread: true
		},
		{
			id: 2,
			sender: 'David Kim',
			avatar: '👨‍💻',
			message: 'Thanks for the Unity tutorial recommendation!',
			time: '2 hours ago',
			unread: true
		},
		{
			id: 3,
			sender: 'Emma Wilson',
			avatar: '👩‍🎨',
			message: 'Check out my new game project!',
			time: 'Yesterday',
			unread: false
		},
		{
			id: 4,
			sender: 'Mike Chen',
			avatar: '👨‍🏫',
			message: 'Great progress on your last submission!',
			time: '2 days ago',
			unread: false
		}
	];
</script>

<!-- Messages Example -->
<div class="flex h-full w-full flex-col p-4">
	<div class="mb-4 flex items-center justify-between">
		<button
			class="rounded-lg border border-[#4a9eff33] bg-[#0c253799] px-3 py-1 text-sm text-[#4af9ff] shadow-[0_0_10px_rgba(74,158,255,0.1)] backdrop-blur-[5px] transition-all hover:border-[#4a9eff80] hover:shadow-[0_0_15px_rgba(74,158,255,0.2)]">
			View All
		</button>
	</div>

	<div class="flex w-full flex-col gap-2">
		<!-- Search and New Message -->
		<div class="flex items-center gap-2 px-0">
			<input
				type="text"
				placeholder="Search messages..."
				class="flex-1 rounded-lg border border-[#4a9eff33] bg-[#0c253799] px-4 py-2 text-sm text-[#e0e7ec] placeholder-[#e0e7ec80] shadow-[0_0_10px_rgba(74,158,255,0.1)] backdrop-blur-[5px] transition-all focus:border-[#4a9eff80] focus:outline-none focus:ring-0" />
			<button
				class="flex h-9 w-9 items-center justify-center rounded-lg border border-[#4a9eff33] bg-[#0c253799] text-[#55ebff] shadow-[0_0_10px_rgba(74,158,255,0.1)] backdrop-blur-[5px] transition-all hover:border-[#4a9eff80] hover:shadow-[0_0_15px_rgba(74,158,255,0.2)]"
				aria-label="New Message">
				<iconify-icon icon="material-symbols:chat" height={24} width={24} />
			</button>
		</div>

		<!-- Messages List -->
		<div class="mt-4 flex flex-col gap-3">
			{#each messages as message}
				<div
					class="group flex items-start gap-3 rounded-lg border border-[#4a9eff33] bg-[#0c253799] p-3 shadow-[0_0_10px_rgba(74,158,255,0.1)] backdrop-blur-[5px] transition-all hover:border-[#4a9eff80] hover:shadow-[0_0_15px_rgba(74,158,255,0.2)]"
					class:!border-l-[3px]={message.unread}
					class:!border-l-[#4a9eff]={message.unread}>
					<div
						class="flex h-10 w-10 items-center justify-center rounded-lg border border-[#4a9eff33] bg-[#0c253799] text-lg text-[#4af3ff] shadow-[0_0_10px_rgba(74,158,255,0.1)] backdrop-blur-[5px] transition-all group-hover:border-[#4a9eff80] group-hover:shadow-[0_0_15px_rgba(74,158,255,0.2)]">
						{message.avatar}
					</div>
					<div class="flex flex-1 flex-col">
						<div class="flex items-center justify-between">
							<span class="font-medium text-[#e0e7ec]">{message.sender}</span>
							<span class="text-xs text-[#e0e7ec80]">{message.time}</span>
						</div>
						<p class="mt-1 text-sm text-[#e0e7ec99]">{message.message}</p>
					</div>
				</div>
			{/each}
		</div>

		<!-- Recent Conversations -->
		{#if data.conversations?.length}
			<div class="mt-6">
				<h4 class="mb-3 text-sm font-medium text-[#4a9eff]">Recent Conversations</h4>
				<div class="flex flex-col gap-3">
					{#each data.conversations as { img, lastMessage, name, _id }, i (_id)}
						<a
							href={`/conversation/${_id}`}
							class="group flex items-center gap-3 rounded-lg border border-[#4a9eff33] bg-[#0c253799] p-3 shadow-[0_0_10px_rgba(74,158,255,0.1)] backdrop-blur-[5px] transition-all hover:border-[#4a9eff80] hover:shadow-[0_0_15px_rgba(74,158,255,0.2)]">
							<div
								class="relative h-10 w-10 overflow-hidden rounded-lg border-2 border-[#4a9eff33] transition-all group-hover:border-[#4a9eff80] group-hover:shadow-[0_0_10px_rgba(74,158,255,0.3)]">
								<img src={img} alt="" class="h-full w-full object-cover" loading="lazy" />
							</div>
							<div class="flex flex-1 flex-col">
								<span class="font-medium text-[#e0e7ec]">{name}</span>
								<p class="text-sm text-[#e0e7ec80]">{trimMessage(lastMessage, 6)}</p>
							</div>
						</a>
					{/each}
				</div>
			</div>
		{/if}
	</div>
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
