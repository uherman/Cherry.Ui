<script lang="ts">
	import CircleUser from 'lucide-svelte/icons/circle-user';
	import Menu from 'lucide-svelte/icons/menu';
	import Search from 'lucide-svelte/icons/search';
	import Cherry from 'lucide-svelte/icons/cherry';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import * as Sheet from '$lib/components/ui/sheet';
	import { Input } from '$lib/components/ui/input';
	import DarkMode from '../dark-mode/dark-mode.svelte';
	import NavLink from './nav-link.svelte';
	import { LogIn } from 'lucide-svelte';
	import { pages } from '@/constants/pages';
	import { notifications, user } from '@/stores/userStore';
	import { Notifications } from '@/components/custom/notifications';

	let open = false;
</script>

<div class="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
	<div class="hidden border-r bg-muted/40 md:block">
		<div class="flex h-full max-h-screen flex-col gap-2">
			<div class="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
				<a href="/" class="flex items-center gap-2 font-semibold">
					<Cherry class="h-6 w-6 text-primary" />
					<span class="">Cherry</span>
				</a>
				<Notifications />
			</div>
			<div class="flex-1">
				<nav class="grid items-start px-2 text-sm font-medium lg:px-4">
					{#each pages as page}
						<NavLink href={page.href}>
							<svelte:component this={page.icon} class="h-4 w-4" />
							{page.title}
						</NavLink>
					{/each}
				</nav>
			</div>
			<div class="mt-auto p-4">
				<Card.Root
					data-x-chunk-name="dashboard-02-chunk-0"
					data-x-chunk-description="A card with a call to action"
				>
					<Card.Header class="p-2 pt-0 md:p-4">
						<Card.Title>Upgrade to Pro</Card.Title>
						<Card.Description>
							Unlock all features and get unlimited access to our support team.
						</Card.Description>
					</Card.Header>
					<Card.Content class="p-2 pt-0 md:p-4 md:pt-0">
						<Button size="sm" class="w-full">Upgrade</Button>
					</Card.Content>
				</Card.Root>
			</div>
		</div>
	</div>
	<div class="flex flex-col">
		<header class="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
			<Sheet.Root bind:open>
				<Sheet.Trigger asChild let:builder>
					<Button
						variant="outline"
						size="icon"
						class="relative shrink-0 md:hidden"
						builders={[builder]}
					>
						{#if $notifications.length > 0}
							<span
								class="absolute left-[-2.5px] top-[-2.5px] flex h-2 w-2 rounded-full bg-red-500"
							/>
						{/if}
						<Menu class="h-5 w-5" />
						<span class="sr-only">Toggle navigation menu</span>
					</Button>
				</Sheet.Trigger>
				<Sheet.Content side="left" class="flex flex-col">
					<nav class="grid gap-2 text-lg font-medium">
						<a href="##" class="flex items-center gap-2 text-lg font-semibold">
							<Cherry class="h-6 w-6 text-primary" />
							<span class="sr-only">Cherry</span>
						</a>
						<Notifications />
						{#each pages as page}
							<NavLink href={page.href} variant="sheet" on:click={() => (open = false)}>
								<svelte:component this={page.icon} class="h-5 w-5" />
								{page.title}
							</NavLink>
						{/each}
					</nav>
					<div class="mt-auto">
						<Card.Root>
							<Card.Header>
								<Card.Title>Upgrade to Pro</Card.Title>
								<Card.Description>
									Unlock all features and get unlimited access to our support team.
								</Card.Description>
							</Card.Header>
							<Card.Content>
								<Button size="sm" class="w-full">Upgrade</Button>
							</Card.Content>
						</Card.Root>
					</div>
				</Sheet.Content>
			</Sheet.Root>
			<div class="w-full flex-1">
				<form>
					<div class="relative">
						<Search class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
						<Input
							type="search"
							placeholder="Search documentation..."
							class="w-full appearance-none text-ellipsis bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
						/>
					</div>
				</form>
			</div>
			<DarkMode />
			{#if $user?.isAuthenticated}
				<DropdownMenu.Root>
					<DropdownMenu.Trigger asChild let:builder>
						<Button builders={[builder]} variant="secondary" size="icon" class="rounded-full">
							<CircleUser class="h-5 w-5" />
							<span class="sr-only">Toggle user menu</span>
						</Button>
					</DropdownMenu.Trigger>
					<DropdownMenu.Content align="end">
						<DropdownMenu.Label>{$user.name ?? 'My Account'}</DropdownMenu.Label>
						<DropdownMenu.Separator />
						<DropdownMenu.Item>Settings</DropdownMenu.Item>
						<DropdownMenu.Item>Support</DropdownMenu.Item>
						<DropdownMenu.Separator />
						<DropdownMenu.Item>
							<a href="/Account/Logout">Logout</a>
						</DropdownMenu.Item>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			{:else}
				<Button href="/Account/Login" variant="outline" size="icon" class="">
					<LogIn class="h-5 w-5" />
					<span class="sr-only">Sign in</span>
				</Button>
			{/if}
		</header>
		<slot />
	</div>
</div>
