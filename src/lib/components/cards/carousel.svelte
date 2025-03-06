<script>
	export let images;
	export let id;
	export let name;
</script>

<div class="card max-h-[500px] overflow-clip border-[1px] border-accent bg-secondary shadow-xl">
	<div class="carousel relative w-full">
		{#each images as img, i}
			<div id="{id}{i}" class="carousel-item relative w-full">
				<img src={img} class="w-full" alt="" />
				<div
					class="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
					<a href="#{id}{i - 1}" class="btn btn-circle {i === 0 ? 'invisible' : ''}">❮</a>
					<a href="#{id}{i === images.length - 1 ? 0 : i + 1}" class="btn btn-circle">❯</a>
				</div>
			</div>
			<!-- Carousel Dots -->
			<!-- <div class="translate-[-50%, -50%] absolute bottom-0 flex w-[100%] justify-center">
				<div>
					{#each images as _, i}
						<button
							class="max-w-3 mr-1 h-3 max-h-3 w-3 rounded-full bg-base-300"
							style="background-color: @apply bg-accent;" />
					{/each}
				</div>
			</div> -->
		{/each}
	</div>
	<!--  -->
	<div class="card-body text-primary-content">
		<h1 class="text-center text-xl">{name}</h1>
		<p>If a dog chews shoes whose shoes does he choose?</p>
	</div>
</div>

<style>
	/*  */
</style>
