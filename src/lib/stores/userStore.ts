import { writable } from 'svelte/store';

export type User = {
	name?: string;
	isAuthenticated: boolean;
};

export type Notification = {
	id: string;
	title: string;
	message: string;
	timestamp: string;
};

export const user = writable<User | null>();
export const notifications = writable<Notification[]>([]);
