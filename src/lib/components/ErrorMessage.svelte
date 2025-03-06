<!-- ErrorMessage.svelte -->
<script lang="ts">
    export let message: string;
    export let type: 'error' | 'warning' = 'error';
    export let onRetry: (() => void) | null = null;
</script>

<div class="fixed top-4 right-4 z-50 animate-slide-in">
    <div class="card glass shadow-xl border-2 {type === 'error' ? 'border-red-500' : 'border-yellow-500'} p-4 min-w-[300px]">
        <div class="flex items-start gap-3">
            <div class="flex-shrink-0">
                {#if type === 'error'}
                    <iconify-icon icon="ph:x-circle" class="text-red-500" width="24" height="24" />
                {:else}
                    <iconify-icon icon="ph:warning" class="text-yellow-500" width="24" height="24" />
                {/if}
            </div>
            <div class="flex-1">
                <p class="text-sm text-text">{message}</p>
                {#if onRetry}
                    <button 
                        class="mt-2 text-sm text-accent hover:text-accent/80 transition-colors"
                        onclick={onRetry}
                    >
                        Try Again
                    </button>
                {/if}
            </div>
        </div>
    </div>
</div>

<style>
    .animate-slide-in {
        animation: slideIn 0.3s ease-out;
    }

    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
</style>
