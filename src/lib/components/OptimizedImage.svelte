<!-- 
  OptimizedImage.svelte
  A component that optimizes image loading and rendering by:
  1. Implementing lazy loading with IntersectionObserver
  2. Generating responsive srcset for different viewport sizes
  3. Adding loading animations and placeholders
  4. Handling image optimization parameters for external URLs
-->
<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	const {
		src = '',
		alt = '',
		className = '',
		loading = 'lazy',
		sizes = '100vw',
		quality = 80,
		...rest
	} = $props();

	// Internal state
	let imageRef = $state<HTMLImageElement | null>(null);
	let isLoaded = $state(false);
	let hasError = $state(false);
	let observer: IntersectionObserver | null = null;

	/**
	 * Checks if the URL should be optimized
	 * @param src - The source URL to check
	 * @returns boolean indicating if the URL should be optimized
	 */
	const shouldOptimize = (src: string) => {
		return src.startsWith('http') && !src.startsWith('data:');
	};

	/**
	 * Generates a responsive srcset for different viewport widths
	 * This allows browsers to choose the most appropriate image size
	 * @param src - The original image URL
	 * @returns A srcset string or undefined for non-HTTP URLs
	 */
	const generateSrcSet = (src: string) => {
		if (!shouldOptimize(src)) return undefined;

		// Common viewport widths for responsive images
		const widths = [320, 640, 768, 1024, 1280, 1536];
		return widths.map((w) => `${addImageOptimization(src, w)} ${w}w`).join(', ');
	};

	/**
	 * Adds optimization parameters to image URLs
	 * Only applies to HTTP/HTTPS URLs, passes through other URLs unchanged
	 * @param src - The original image URL
	 * @param width - Target width for the image
	 * @returns URL with optimization parameters or original URL
	 */
	const addImageOptimization = (src: string, width: number) => {
		if (!shouldOptimize(src)) return src;

		const url = new URL(src);
		// Add standard image optimization parameters
		url.searchParams.set('w', width.toString()); // Width
		url.searchParams.set('q', quality.toString()); // Quality
		url.searchParams.set('auto', 'format'); // Auto format selection (WebP if supported)
		return url.toString(); // Return the full URL including hostname
	};

	/**
	 * Handles successful image load
	 * Removes the loading placeholder and shows the image
	 */
	const handleLoad = () => {
		isLoaded = true;
		hasError = false;
		if (imageRef) {
			imageRef.classList.remove('opacity-0');
		}
	};

	/**
	 * Handles image load error
	 * Shows alt text in a styled container
	 */
	const handleError = () => {
		hasError = true;
		isLoaded = true;
	};

	// Setup intersection observer for lazy loading
	onMount(() => {
		if (!browser) return; // Skip on server-side

		// Create IntersectionObserver to detect when image enters viewport
		observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting && imageRef) {
						// Load image when it enters viewport
						imageRef.src = src;
						observer?.unobserve(imageRef);
					}
				});
			},
			{
				rootMargin: '50px' // Start loading 50px before image enters viewport
			}
		);

		// Start observing the image element
		if (imageRef) {
			observer.observe(imageRef);
		}

		// Cleanup on component destruction
		return () => {
			if (observer && imageRef) {
				observer.unobserve(imageRef);
			}
		};
	});

	const GoogleStuff = {
		loading: 'lazy',
		decoding: 'async',
		referrerPolicy: 'no-referrer'
	};
</script>

<!-- Container with relative positioning for placeholder -->
<div class="relative overflow-hidden {className}">
	<!-- Loading placeholder - shows until image is loaded -->
	{#if !isLoaded}
		<div class="absolute inset-0 animate-pulse bg-gray-200" />
	{/if}

	<!-- Error state with alt text -->
	{#if hasError}
		<div
			class="flex h-full w-full items-center justify-center bg-gray-100 p-4 text-center text-sm text-gray-600">
			<span class="break-words">{alt}</span>
		</div>
	{:else}
		<!-- Main image element -->
		<img
			bind:this={imageRef}
			{alt}
			class:opacity-0={!isLoaded}
			class="transition-opacity duration-300 {className}"
			{loading}
			{sizes}
			{src}
			srcset={generateSrcSet(src)}
			onload={handleLoad}
			onerror={handleError}
			{...GoogleStuff}
			{...rest} />
	{/if}
</div>
