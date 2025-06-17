<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<title>YTS Easy - Movie Search & Download</title>
	<meta name="description" content="Search and download movies from YTS" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
</svelte:head>

{@render children()}
