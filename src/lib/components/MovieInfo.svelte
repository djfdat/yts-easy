<script lang="ts">
	export let movie: any = null;

	function formatRuntime(minutes: number): string {
		if (!minutes) return 'Unknown';
		const hours = Math.floor(minutes / 60);
		const mins = minutes % 60;
		return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
	}

	function formatFileSize(bytes: string | number): string {
		// If it's already a formatted string (like "1.34 GB"), return it as is
		if (typeof bytes === 'string' && (bytes.includes('GB') || bytes.includes('MB'))) {
			return bytes;
		}

		// If it's a number or numeric string, convert from bytes
		const numBytes = typeof bytes === 'string' ? parseFloat(bytes) : bytes;
		if (!numBytes || numBytes === 0) return 'Unknown';

		const gb = numBytes / (1024 * 1024 * 1024);
		return gb >= 1 ? `${gb.toFixed(2)} GB` : `${(numBytes / (1024 * 1024)).toFixed(0)} MB`;
	}

	function openMagnetLink(hash: string) {
		const magnetLink = `magnet:?xt=urn:btih:${hash}&dn=${encodeURIComponent(movie.title)}`;
		window.open(magnetLink, '_blank');
	}

	function openTorrentLink(url: string) {
		window.open(url, '_blank');
	}
</script>

<div class="h-full overflow-y-auto">
	{#if !movie}
		<div class="flex flex-col items-center justify-center h-full p-8 text-center">
			<div class="text-8xl mb-6">🎭</div>
			<h2 class="text-3xl font-bold mb-4">Select a Movie</h2>
			<p class="text-lg text-base-content/70 max-w-md">
				Choose a movie from the list on the left to see detailed information, ratings, and download options.
			</p>
		</div>
	{:else}
		<div class="p-6">
			<!-- Movie Header -->
			<div class="flex flex-col lg:flex-row gap-6 mb-6">
				<div class="flex-shrink-0">
					<img
						src={movie.large_cover_image || movie.medium_cover_image}
						alt={movie.title}
						class="w-full max-w-xs rounded-lg shadow-lg"
					/>
				</div>

				<div class="flex-1">
					<h1 class="text-3xl font-bold mb-2">{movie.title}</h1>
					<div class="flex flex-wrap items-center gap-4 mb-4">
						<span class="badge badge-primary badge-lg">{movie.year}</span>
						<div class="flex items-center gap-1">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-warning fill-current" viewBox="0 0 24 24">
								<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
							</svg>
							<span class="text-lg font-semibold">{movie.rating}/10</span>
						</div>
						<span class="text-base-content/70">{formatRuntime(movie.runtime)}</span>
						<span class="badge badge-outline">{movie.mpa_rating || 'Not Rated'}</span>
					</div>

					<!-- Genres -->
					<div class="flex flex-wrap gap-2 mb-4">
						{#each movie.genres || [] as genre}
							<span class="badge badge-lg bg-[#6AC045] text-white border-[#6AC045]">{genre}</span>
						{/each}
					</div>

					<!-- Trailer -->
					{#if movie.yt_trailer_code}
						<div class="mb-4">
							<a
								href="https://www.youtube.com/watch?v={movie.yt_trailer_code}"
								target="_blank"
								rel="noopener noreferrer"
								class="btn btn-accent btn-wide"
							>
								<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1m6-6V7a3 3 0 00-3-3H6a3 3 0 00-3 3v10a3 3 0 003 3h12a3 3 0 003-3v-3M9 21v-4a2 2 0 012-2h2a2 2 0 012 2v4" />
								</svg>
								Watch Trailer on YouTube
							</a>
						</div>
					{/if}

					<!-- Stats -->
					<div class="stats shadow mb-4 w-full">
						<div class="stat">
							<div class="stat-title">Downloads</div>
							<div class="stat-value text-primary text-lg">{movie.download_count?.toLocaleString() || 'N/A'}</div>
						</div>
						<div class="stat">
							<div class="stat-title">Likes</div>
							<div class="stat-value text-secondary text-lg">{movie.like_count?.toLocaleString() || 'N/A'}</div>
						</div>
						<div class="stat">
							<div class="stat-title">IMDB Rating</div>
							<div class="stat-value text-accent text-lg">{movie.rating}/10</div>
						</div>
						{#if movie.yt_trailer_code}
							<div class="stat">
								<div class="stat-title">Trailer</div>
								<div class="stat-actions">
									<a
										href="https://www.youtube.com/watch?v={movie.yt_trailer_code}"
										target="_blank"
										rel="noopener noreferrer"
										class="btn btn-sm btn-outline"
									>
										<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1m6-6V7a3 3 0 00-3-3H6a3 3 0 00-3 3v10a3 3 0 003 3h12a3 3 0 003-3v-3M9 21v-4a2 2 0 012-2h2a2 2 0 012 2v4" />
										</svg>
										YouTube
									</a>
								</div>
							</div>
						{/if}
					</div>
				</div>
			</div>

			<!-- Description -->
			{#if movie.description_full || movie.synopsis}
				<div class="mb-6">
					<h2 class="text-2xl font-bold mb-3">Plot Summary</h2>
					<div class="prose max-w-none">
						<p class="text-base-content/80 leading-relaxed">
							{movie.description_full || movie.synopsis || 'No description available.'}
						</p>
					</div>
				</div>
			{/if}

			<!-- Cast and Crew -->
			{#if movie.cast}
				<div class="mb-6">
					<h2 class="text-2xl font-bold mb-3">Cast</h2>
					<div class="flex flex-wrap gap-2">
						{#each movie.cast as actor}
							<span class="badge badge-ghost">{actor.name}</span>
						{/each}
					</div>
				</div>
			{/if}

			<!-- Download Links -->
			{#if movie.torrents && movie.torrents.length > 0}
				<div class="mb-6">
					<h2 class="text-2xl font-bold mb-3">Download Options</h2>
					<div class="flex flex-wrap gap-3">
						{#each movie.torrents as torrent}
							<div class="bg-base-200 rounded-lg p-3 border border-base-300 min-w-[200px]">
								<div class="flex justify-between items-center mb-2">
									<span class="font-bold text-primary">{torrent.quality}</span>
									<span class="badge badge-info badge-sm">{torrent.type}</span>
								</div>
								<div class="text-xs text-base-content/70 mb-2 space-y-1">
									<div>Size: {torrent.size || formatFileSize(torrent.size_bytes)}</div>
									<div>Seeds: {torrent.seeds} | Peers: {torrent.peers}</div>
									{#if torrent.video_codec}
										<div>Codec: {torrent.video_codec} | Audio: {torrent.audio_channels}</div>
									{/if}
								</div>
								<div class="flex gap-1">
									<button
										class="btn btn-primary btn-xs flex-1"
										on:click={() => openMagnetLink(torrent.hash)}
										title="Magnet Link"
										aria-label="Download magnet link for {torrent.quality}"
									>
										<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
										</svg>
									</button>
									<button
										class="btn btn-xs flex-1 bg-[#6AC045] text-white border-[#6AC045] hover:bg-[#5a9c3a] hover:border-[#5a9c3a]"
										on:click={() => openTorrentLink(torrent.url)}
										title="Download .torrent"
										aria-label="Download torrent file for {torrent.quality}"
									>
										<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
										</svg>
									</button>
								</div>
							</div>
						{/each}
					</div>
				</div>
			{/if}

			<!-- Movie Details -->
			<div class="mb-6">
				<h2 class="text-2xl font-bold mb-3">Movie Information</h2>
				<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
					<!-- Basic Info -->
					<div class="overflow-x-auto">
						<h3 class="text-lg font-semibold mb-2">Basic Information</h3>
						<table class="table table-zebra table-sm">
							<tbody>
								<tr>
									<td class="font-semibold">Title</td>
									<td>{movie.title}</td>
								</tr>
								{#if movie.title_english && movie.title_english !== movie.title}
									<tr>
										<td class="font-semibold">English Title</td>
										<td>{movie.title_english}</td>
									</tr>
								{/if}
								{#if movie.title_long && movie.title_long !== movie.title}
									<tr>
										<td class="font-semibold">Full Title</td>
										<td>{movie.title_long}</td>
									</tr>
								{/if}
								<tr>
									<td class="font-semibold">Year</td>
									<td>{movie.year}</td>
								</tr>
								<tr>
									<td class="font-semibold">Rating</td>
									<td>{movie.rating}/10</td>
								</tr>
								<tr>
									<td class="font-semibold">Runtime</td>
									<td>{formatRuntime(movie.runtime)}</td>
								</tr>
								<tr>
									<td class="font-semibold">Language</td>
									<td>{movie.language || 'English'}</td>
								</tr>
								<tr>
									<td class="font-semibold">MPA Rating</td>
									<td>{movie.mpa_rating || 'Not Rated'}</td>
								</tr>
								<tr>
									<td class="font-semibold">State</td>
									<td><span class="badge badge-success badge-sm">{movie.state || 'Unknown'}</span></td>
								</tr>
							</tbody>
						</table>
					</div>

					<!-- Technical & Database Info -->
					<div class="overflow-x-auto">
						<h3 class="text-lg font-semibold mb-2">Database & Links</h3>
						<table class="table table-zebra table-sm">
							<tbody>
								<tr>
									<td class="font-semibold">YTS ID</td>
									<td>{movie.id}</td>
								</tr>
								{#if movie.slug}
									<tr>
										<td class="font-semibold">Slug</td>
										<td class="text-xs break-all">{movie.slug}</td>
									</tr>
								{/if}
								{#if movie.imdb_code}
									<tr>
										<td class="font-semibold">IMDB</td>
										<td>
											<a
												href="https://www.imdb.com/title/{movie.imdb_code}"
												target="_blank"
												rel="noopener noreferrer"
												class="link link-primary"
											>
												{movie.imdb_code}
											</a>
										</td>
									</tr>
								{/if}
								{#if movie.url}
									<tr>
										<td class="font-semibold">YTS Page</td>
										<td>
											<a
												href={movie.url}
												target="_blank"
												rel="noopener noreferrer"
												class="link link-secondary"
											>
												View on YTS
											</a>
										</td>
									</tr>
								{/if}
								{#if movie.date_uploaded}
									<tr>
										<td class="font-semibold">Date Added</td>
										<td>{new Date(movie.date_uploaded).toLocaleDateString()}</td>
									</tr>
								{/if}
								{#if movie.date_uploaded_unix}
									<tr>
										<td class="font-semibold">Upload Time</td>
										<td>{new Date(movie.date_uploaded_unix * 1000).toLocaleString()}</td>
									</tr>
								{/if}
								<tr>
									<td class="font-semibold">Downloads</td>
									<td>{movie.download_count?.toLocaleString() || 'Unknown'}</td>
								</tr>
								<tr>
									<td class="font-semibold">Likes</td>
									<td>{movie.like_count?.toLocaleString() || 'Unknown'}</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>

				<!-- Torrent Details -->
				{#if movie.torrents && movie.torrents.length > 0}
					<div class="mt-6">
						<h3 class="text-lg font-semibold mb-3">Torrent Technical Details</h3>
						<div class="overflow-x-auto">
							<table class="table table-zebra table-sm">
								<thead>
									<tr>
										<th>Quality</th>
										<th>Type</th>
										<th>Size</th>
										<th>Video Codec</th>
										<th>Audio</th>
										<th>Bit Depth</th>
										<th>Seeds</th>
										<th>Peers</th>
										<th>Upload Date</th>
									</tr>
								</thead>
								<tbody>
									{#each movie.torrents as torrent}
										<tr>
											<td><span class="badge badge-primary badge-sm">{torrent.quality}</span></td>
											<td><span class="badge badge-info badge-sm">{torrent.type}</span></td>
											<td class="text-sm">{torrent.size || formatFileSize(torrent.size_bytes)}</td>
											<td class="text-sm">{torrent.video_codec || 'N/A'}</td>
											<td class="text-sm">{torrent.audio_channels || 'N/A'}</td>
											<td class="text-sm">{torrent.bit_depth ? `${torrent.bit_depth}-bit` : 'N/A'}</td>
											<td class="text-sm">{torrent.seeds}</td>
											<td class="text-sm">{torrent.peers}</td>
											<td class="text-sm">{torrent.date_uploaded ? new Date(torrent.date_uploaded).toLocaleDateString() : 'N/A'}</td>
										</tr>
									{/each}
								</tbody>
							</table>
						</div>
					</div>
				{/if}
			</div>

			<!-- Screenshots -->
			{#if movie.screenshots && movie.screenshots.length > 0}
				<div class="mb-6">
					<h2 class="text-2xl font-bold mb-3">Screenshots</h2>
					<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
						{#each movie.screenshots as screenshot}
							<img
								src={screenshot}
								alt="Movie screenshot"
								class="rounded-lg shadow-md w-full h-auto cursor-pointer hover:opacity-80 transition-opacity"
								loading="lazy"
							/>
						{/each}
					</div>
				</div>
			{/if}



		</div>
	{/if}
</div>
