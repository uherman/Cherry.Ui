import { House, Info, CircleDollarSign } from 'lucide-svelte';
import type { ComponentType } from 'svelte';

export type Page = {
	href: string;
	title: string;
	icon: ComponentType;
};

export const pages: Page[] = [
	{
		href: '/',
		title: 'Home',
		icon: House
	},
	{
		href: '/about',
		title: 'About',
		icon: Info
	},
	{
		href: '/pricing',
		title: 'Pricing',
		icon: CircleDollarSign
	}
];
