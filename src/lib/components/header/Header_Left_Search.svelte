<script lang="ts">
	let searchOpen = $state(false);
	let query = $state('');
	import { fade, fly } from 'svelte/transition';
	import styles from './Header.module.css';
</script>

<div class={styles.search_container}>
	{#if !searchOpen}
		<button
			class={styles.search_button}
			onclick={() => (searchOpen = !searchOpen)}
			transition:fade={{ duration: 200 }}>
			<iconify-icon icon="material-symbols:search-rounded" class={styles.header_icon}></iconify-icon>
		</button>
	{/if}

	{#if searchOpen}
		<form
			class={styles.search_form}
			transition:fly={{ x: -20, duration: 300, opacity: 1 }}
			onsubmit={(e) => {
				e.preventDefault();
				window.location.href = `/search/${query ? query : '$'}`;
			}}>
			<button
				type="button"
				aria-label="Back"
				class={styles.search_back}
				onclick={() => (searchOpen = !searchOpen)}>
				<iconify-icon icon="material-symbols:arrow-back-rounded" class={styles.header_icon}></iconify-icon>
			</button>

			<input
				type="text"
				bind:value={query}
				placeholder="Search..."
				class={styles.search_input} />

			<button type="submit" class={styles.search_submit}>
				<iconify-icon icon="material-symbols:search-rounded" class={styles.header_icon}></iconify-icon>
			</button>
		</form>
	{/if}
</div>
