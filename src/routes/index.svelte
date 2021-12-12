<script>
	import '@mszu/pixi-ssr-shim';

	import { onMount } from 'svelte';
	import { run } from './seating-chart';
	import App from './App';

	let el;

	onMount(async () => {
		run(el);

		window.addEventListener('resize', () => {
			App.app.destroy(true);
			App.app = null;
			App.viewport = null;

			run(el);
		});
	});
</script>

<div class="flex items-center justify-around">
	S
	<div bind:this={el} />
</div>
