<script lang="ts">
	import Main from '@/components/custom/layout/main.svelte';
	import '../app.css';
	import { Toaster } from '@/components/ui/sonner';
	import { ModeWatcher } from 'mode-watcher';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<ModeWatcher />
<Toaster position="top-center" richColors />
<Main {...data}>
	<slot></slot>
</Main>
