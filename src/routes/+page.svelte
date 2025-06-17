<script lang="ts">
	import MovieList from '$lib/components/MovieList.svelte';
	import MovieInfo from '$lib/components/MovieInfo.svelte';
	import { onMount } from 'svelte';

	let selectedMovie: any = null;
	let movies: any[] = [];
	let loading = false;
	let loadingMore = false;
	let hasMorePages = true;
	let showMobileInfo = false;
	let filters = {
		query: '',
		genre: '',
		rating: '',
		quality: '',
		sortBy: 'date_added',
		orderBy: 'desc',
		page: 1
	};

	async function fetchMovies(resetList = true) {
		if (resetList) {
			loading = true;
			movies = [];
			filters.page = 1;
			hasMorePages = true;
		} else {
			loadingMore = true;
		}

		try {
			const params = new URLSearchParams();
			if (filters.query) params.append('query_term', filters.query);
			if (filters.genre) params.append('genre', filters.genre);
			if (filters.rating) params.append('minimum_rating', filters.rating);
			if (filters.quality) params.append('quality', filters.quality);
			params.append('sort_by', filters.sortBy);
			params.append('order_by', filters.orderBy);
			params.append('page', filters.page.toString());
			params.append('limit', '20');

			const response = await fetch(`https://yts.mx/api/v2/list_movies.json?${params}`);
			const data = await response.json();

			if (data.status === 'ok' && data.data.movies) {
				const newMovies = data.data.movies;
				if (resetList) {
					movies = newMovies;
				} else {
					movies = [...movies, ...newMovies];
				}

				// Check if there are more pages
				hasMorePages = newMovies.length === 20;
			} else {
				if (resetList) {
					movies = [];
				}
				hasMorePages = false;
			}
		} catch (error) {
			console.error('Error fetching movies:', error);
			if (resetList) {
				movies = [];
			}
			hasMorePages = false;
		} finally {
			loading = false;
			loadingMore = false;
		}
	}

	async function loadMoreMovies() {
		if (!loadingMore && hasMorePages) {
			filters.page += 1;
			await fetchMovies(false);
		}
	}

	function handleMovieSelect(event: CustomEvent) {
		selectedMovie = event.detail;
		showMobileInfo = true;
	}

	function handleFiltersChange(event: CustomEvent) {
		filters = { ...filters, ...event.detail };
		fetchMovies(true);
	}

	function handleBackToList() {
		showMobileInfo = false;
	}

	onMount(() => {
		fetchMovies(true);
	});
</script>

<div class="flex flex-col lg:flex-row h-screen bg-base-100">
	<!-- Mobile Navigation Bar -->
	<div class="lg:hidden navbar bg-base-200 border-b border-base-300">
		<div class="navbar-start">
			{#if showMobileInfo}
				<button class="btn btn-ghost btn-circle" on:click={handleBackToList} aria-label="Back to movie list">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
					</svg>
				</button>
			{/if}
		</div>
		<div class="navbar-center">
			<span class="text-xl font-bold">
				{showMobileInfo ? selectedMovie?.title || 'Movie Info' : 'YTS Easy'}
			</span>
		</div>
	</div>

	<!-- Desktop Layout -->
	<div class="hidden lg:flex flex-1">
		<!-- Left Pane - Movie List -->
		<div class="w-1/2 border-r border-base-300">
			<MovieList
				{movies}
				{loading}
				{loadingMore}
				{hasMorePages}
				{filters}
				on:movieSelect={handleMovieSelect}
				on:filtersChange={handleFiltersChange}
				on:loadMore={loadMoreMovies}
			/>
		</div>

		<!-- Right Pane - Movie Info -->
		<div class="w-1/2">
			<MovieInfo movie={selectedMovie} />
		</div>
	</div>

	<!-- Mobile Layout -->
	<div class="lg:hidden flex-1">
		{#if !showMobileInfo}
			<MovieList
				{movies}
				{loading}
				{loadingMore}
				{hasMorePages}
				{filters}
				on:movieSelect={handleMovieSelect}
				on:filtersChange={handleFiltersChange}
				on:loadMore={loadMoreMovies}
			/>
		{:else}
			<MovieInfo movie={selectedMovie} />
		{/if}
	</div>
</div>
