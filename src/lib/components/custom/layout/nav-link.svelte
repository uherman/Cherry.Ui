<script lang="ts">
	import { page } from '$app/stores';

	const classes = {
		default:
			'text-muted-foreground hover:text-primary flex items-center gap-3 rounded-lg px-3 py-2 transition-all',
		active:
			'bg-muted text-primary hover:text-primary flex items-center gap-3 rounded-lg px-3 py-2 transition-all'
	};

	export let href = '';

	const isActive = (pathname: string) =>
		href === '/' ? pathname === '/' : pathname.startsWith(href);

	$: className = isActive($page.url.pathname) ? classes['active'] : classes['default'];
</script>

<a {href} class={className}>
	<slot />
</a>
