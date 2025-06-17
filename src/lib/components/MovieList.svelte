<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';

	export let movies: any[] = [];
	export let loading = false;
	export let loadingMore = false;
	export let hasMorePages = true;
	export let filters: any;

	const dispatch = createEventDispatcher();
	let scrollContainer: HTMLElement;
	let isScrollEventListenerAttached = false;

	const genres = [
		'', 'Action', 'Adventure', 'Animation', 'Biography', 'Comedy', 'Crime',
		'Documentary', 'Drama', 'Family', 'Fantasy', 'History', 'Horror',
		'Music', 'Musical', 'Mystery', 'Romance', 'Sci-Fi', 'Sport',
		'Thriller', 'War', 'Western'
	];

	const sortOptions = [
		{ value: 'date_added', label: 'Date Added' },
		{ value: 'title', label: 'Title' },
		{ value: 'year', label: 'Year' },
		{ value: 'rating', label: 'Rating' },
		{ value: 'download_count', label: 'Downloads' }
	];

	const qualityOptions = [
		'', '480p', '720p', '1080p', '1080p.x265', '2160p', '3D'
	];

	function handleMovieClick(movie: any) {
		dispatch('movieSelect', movie);
	}

	function updateFilters() {
		// Reset scroll position when filters change
		if (scrollContainer) {
			scrollContainer.scrollTop = 0;
		}
		dispatch('filtersChange', filters);
	}

	function handleSearch() {
		updateFilters();
	}

	function handleKeyPress(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			handleSearch();
		}
	}

	function openMagnetLink(hash: string, title: string, event: Event) {
		event.stopPropagation();
		const magnetLink = `magnet:?xt=urn:btih:${hash}&dn=${encodeURIComponent(title)}`;
		window.open(magnetLink, '_blank');
	}

	function openTorrentLink(url: string, event: Event) {
		event.stopPropagation();
		window.open(url, '_blank');
	}

	function formatFileSize(bytes: string | number): string {
		// If it's already a formatted string (like "1.34 GB"), return it as is
		if (typeof bytes === 'string' && (bytes.includes('GB') || bytes.includes('MB'))) {
			return bytes;
		}

		// If it's a number or numeric string, convert from bytes
		const numBytes = typeof bytes === 'string' ? parseFloat(bytes) : bytes;
		if (!numBytes || numBytes === 0) return '';

		const gb = numBytes / (1024 * 1024 * 1024);
		return gb >= 1 ? `${gb.toFixed(1)} GB` : `${(numBytes / (1024 * 1024)).toFixed(0)} MB`;
	}

	function handleScroll() {
		if (!scrollContainer || loadingMore || !hasMorePages) return;

		const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
		const threshold = 200; // Load more when 200px from bottom

		if (scrollHeight - (scrollTop + clientHeight) <= threshold) {
			dispatch('loadMore');
		}
	}

	// Throttle scroll handler to improve performance
	let throttleTimeout: number | undefined;
	function throttledHandleScroll() {
		if (throttleTimeout) return;

		throttleTimeout = setTimeout(() => {
			handleScroll();
			throttleTimeout = undefined;
		}, 100); // 100ms throttle
	}

	function attachScrollListener() {
		if (scrollContainer && !isScrollEventListenerAttached) {
			scrollContainer.addEventListener('scroll', throttledHandleScroll, { passive: true });
			isScrollEventListenerAttached = true;
		}
	}

	function detachScrollListener() {
		if (scrollContainer && isScrollEventListenerAttached) {
			scrollContainer.removeEventListener('scroll', throttledHandleScroll);
			isScrollEventListenerAttached = false;
		}
		if (throttleTimeout) {
			clearTimeout(throttleTimeout);
			throttleTimeout = undefined;
		}
	}

	onMount(() => {
		return () => {
			detachScrollListener();
		};
	});

	// Attach scroll listener when scrollContainer is available
	$: if (scrollContainer) {
		attachScrollListener();
	}
</script>

<div class="flex flex-col h-full">
	<!-- Filters Section -->
	<div class="p-4 bg-base-200 border-b border-base-300">
		<h2 class="text-2xl font-bold mb-4">Movie Search</h2>

		<!-- Search Input -->
		<div class="form-control mb-3">
			<label class="label" for="search">
				<span class="label-text">Search Movies</span>
			</label>
			<div class="input-group">
				<input
					id="search"
					type="text"
					placeholder="Search for movies..."
					class="input input-bordered flex-1"
					bind:value={filters.query}
					on:keypress={handleKeyPress}
				/>
				<button class="btn btn-primary" on:click={handleSearch} aria-label="Search movies">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
					</svg>
				</button>
			</div>
		</div>

		<!-- Filter Controls -->
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
			<!-- Genre Filter -->
			<div class="form-control">
				<label class="label" for="genre">
					<span class="label-text">Genre</span>
				</label>
				<select
					id="genre"
					class="select select-bordered"
					bind:value={filters.genre}
					on:change={updateFilters}
				>
					{#each genres as genre}
						<option value={genre}>{genre || 'All Genres'}</option>
					{/each}
				</select>
			</div>

			<!-- Rating Filter -->
			<div class="form-control">
				<label class="label" for="rating">
					<span class="label-text">Minimum Rating</span>
				</label>
				<select
					id="rating"
					class="select select-bordered"
					bind:value={filters.rating}
					on:change={updateFilters}
				>
					<option value="">Any Rating</option>
					<option value="9">9+</option>
					<option value="8">8+</option>
					<option value="7">7+</option>
					<option value="6">6+</option>
					<option value="5">5+</option>
				</select>
			</div>

			<!-- Quality Filter -->
			<div class="form-control">
				<label class="label" for="quality">
					<span class="label-text">Quality</span>
				</label>
				<select
					id="quality"
					class="select select-bordered"
					bind:value={filters.quality}
					on:change={updateFilters}
				>
					{#each qualityOptions as quality}
						<option value={quality}>{quality || 'Any Quality'}</option>
					{/each}
				</select>
			</div>

			<!-- Sort By -->
			<div class="form-control">
				<label class="label" for="sortBy">
					<span class="label-text">Sort By</span>
				</label>
				<select
					id="sortBy"
					class="select select-bordered"
					bind:value={filters.sortBy}
					on:change={updateFilters}
				>
					{#each sortOptions as option}
						<option value={option.value}>{option.label}</option>
					{/each}
				</select>
			</div>
		</div>
	</div>

	<!-- Movies List -->
	<div class="flex-1 overflow-y-auto p-4" bind:this={scrollContainer}>
		{#if loading}
			<div class="flex justify-center items-center h-32">
				<span class="loading loading-spinner loading-lg"></span>
			</div>
		{:else if movies.length === 0}
			<div class="text-center py-8">
				<div class="text-6xl mb-4">🎬</div>
				<p class="text-lg text-base-content/70">No movies found</p>
				<p class="text-sm text-base-content/50">Try adjusting your search filters</p>
			</div>
		{:else}
			<div class="space-y-3">
				{#each movies as movie}
					<div
						class="card card-side bg-base-100 shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-base-300 hover:border-primary min-h-[160px]"
						on:click={() => handleMovieClick(movie)}
						on:keydown={(e) => e.key === 'Enter' && handleMovieClick(movie)}
						role="button"
						tabindex="0"
					>
						<figure class="w-24 flex-shrink-0">
							<img
								src={movie.medium_cover_image}
								alt={movie.title}
								class="w-full h-full object-cover"
								loading="lazy"
							/>
						</figure>
						<div class="card-body p-4 flex-1 min-w-0">
							<h3 class="card-title text-base line-clamp-1">{movie.title}</h3>
							<div class="flex items-center gap-2 text-sm text-base-content/70 mb-2">
								<span class="badge badge-outline">{movie.year}</span>
								<div class="flex items-center gap-1">
									<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-warning fill-current" viewBox="0 0 24 24">
										<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
									</svg>
									<span class="text-xs font-medium">{movie.rating}/10</span>
								</div>
							</div>

							<!-- Genres -->
							<div class="flex flex-wrap gap-1 mb-2">
								{#each movie.genres?.slice(0, 3) || [] as genre}
									<span class="badge badge-sm bg-[#6AC045] text-white border-[#6AC045]">{genre}</span>
								{/each}
							</div>

							<!-- Quality and Download Options -->
							{#if movie.torrents && movie.torrents.length > 0}
								<div class="flex flex-wrap gap-3 items-center">
									{#each movie.torrents as torrent}
										<div class="flex items-center gap-2 bg-base-200 rounded-lg px-2 py-1 border border-base-300 group">
											<div class="flex flex-col">
												<span class="text-xs font-semibold text-primary">{torrent.quality}</span>
												{#if torrent.size}
													<span class="text-[10px] text-base-content/60">{torrent.size}</span>
												{:else if torrent.size_bytes}
													<span class="text-[10px] text-base-content/60">{formatFileSize(torrent.size_bytes)}</span>
												{/if}
											</div>
											<button
												class="btn btn-xs p-1 h-7 w-7 min-h-0 transition-all duration-200 bg-white/10 text-white border-white/20 hover:bg-white/20 hover:border-white/30 hover:scale-105"
												title="Magnet Link - {torrent.quality} ({torrent.size || formatFileSize(torrent.size_bytes)})"
												on:click={(e) => openMagnetLink(torrent.hash, movie.title, e)}
												aria-label="Download magnet link for {torrent.quality}"
											>
												<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
													<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
												</svg>
											</button>
											<button
												class="btn btn-xs p-1 h-7 w-7 min-h-0 transition-all duration-200 bg-[#6AC045] text-white border-[#6AC045] hover:bg-[#5a9c3a] hover:border-[#5a9c3a] hover:scale-105"
												title="Download .torrent - {torrent.quality} ({torrent.size || formatFileSize(torrent.size_bytes)})"
												on:click={(e) => openTorrentLink(torrent.url, e)}
												aria-label="Download torrent file for {torrent.quality}"
											>
												<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
													<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
												</svg>
											</button>
										</div>
									{/each}
								</div>
							{/if}
						</div>
					</div>
				{/each}
			</div>

			<!-- Loading More Indicator -->
			{#if loadingMore}
				<div class="flex justify-center items-center py-6">
					<span class="loading loading-spinner loading-md"></span>
					<span class="ml-2 text-sm text-base-content/70">Loading more movies...</span>
				</div>
			{:else if !hasMorePages && movies.length > 0}
				<div class="text-center py-6">
					<p class="text-sm text-base-content/50">No more movies to load</p>
				</div>
			{/if}
		{/if}
	</div>
</div>

<style>
	.line-clamp-1 {
		overflow: hidden;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
	}
</style>
