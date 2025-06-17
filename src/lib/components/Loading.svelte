<script lang="ts">
	export let size: 'sm' | 'md' | 'lg' = 'md';
	export let text = 'Loading...';
</script>

<div class="flex flex-col items-center justify-center p-8">
	<span class="loading loading-spinner loading-{size} mb-4"></span>
	<p class="text-base-content/70">{text}</p>
</div>
