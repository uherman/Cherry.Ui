<script lang="ts">
	import { page } from '$app/stores';

	const classes = {
		default: {
			default:
				'text-muted-foreground hover:text-primary flex items-center gap-3 rounded-lg px-3 py-2 transition-all',
			active:
				'bg-muted text-primary hover:text-primary flex items-center gap-3 rounded-lg px-3 py-2 transition-all'
		},
		sheet: {
			default:
				'text-muted-foreground hover:text-foreground mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2',
			active:
				'bg-muted text-foreground hover:text-foreground mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2'
		}
	};

	export let variant: 'default' | 'sheet' = 'default';
	export let href = '';

	const isActive = (pathname: string) =>
		href === '/' ? pathname === '/' : pathname.startsWith(href);

	$: className = isActive($page.url.pathname) ? classes[variant].active : classes[variant].default;
</script>

<a {href} class={className} on:click>
	<slot />
</a>
