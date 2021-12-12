<slot />

<style global lang="postcss">
	@import url('https://fonts.googleapis.com/css2?family=Comic+Neue:wght@700&display=swap');
	* {
		@apply text-prussian;
		padding: 0;
		margin: 0;
	}
	
	@tailwind base;
	@tailwind components;
	@tailwind utilities;


	:global(html) {
		background-color: #E5E5E5;
	}
</style>
