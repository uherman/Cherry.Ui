<script lang="ts">
	import Main from '@/components/custom/layout/main.svelte';
	import '../app.css';
	import { Toaster } from '@/components/ui/sonner';
	import { ModeWatcher } from 'mode-watcher';
</script>

<ModeWatcher />
<Toaster position="top-center" richColors />
<Main>
	<slot></slot>
</Main>
