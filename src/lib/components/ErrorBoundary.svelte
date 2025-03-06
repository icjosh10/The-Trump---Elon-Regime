<!-- Error boundary component that catches and displays errors gracefully -->
<script lang="ts">
	import { dev } from '$app/environment';

	export let fallback: string | undefined = undefined;
	export let showError: boolean = dev;

	let err: Error | null = null;

	// Using Svelte's built-in error handler
	$: if ($$props.error) {
		err = $$props.error;
		console.error('Error caught by boundary:', err);
	}
</script>

{#if err}
	<div class="error-boundary" role="alert">
		<div class="error-content">
			<h2 class="error-title">Something went wrong</h2>
			{#if showError}
				<pre class="error-details">{err.message}</pre>
				{#if err.stack}
					<details>
						<summary>Stack trace</summary>
						<pre class="error-stack">{err.stack}</pre>
					</details>
				{/if}
			{:else}
				<p>{fallback || 'An unexpected error occurred. Please try again later.'}</p>
			{/if}
			<button
				onclick={() => {
					err = null;
					window.location.reload();
				}}
				class="retry-button">
				Try Again
			</button>
		</div>
	</div>
{:else}
	<slot />
{/if}

<style lang="postcss">
	.error-boundary {
		@apply my-4 rounded-lg border border-red-200 bg-red-50 p-4;
	}

	.error-content {
		@apply flex flex-col gap-4;
	}

	.error-title {
		@apply text-xl font-semibold text-red-700;
	}

	.error-details {
		@apply overflow-x-auto rounded bg-red-100 p-4 text-sm text-red-900;
	}

	.error-stack {
		@apply mt-2 overflow-x-auto rounded bg-red-100 p-4 text-xs text-red-900;
	}

	.retry-button {
		@apply w-fit rounded bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700;
	}
</style>
