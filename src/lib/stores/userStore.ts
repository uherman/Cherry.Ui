import { writable } from 'svelte/store';

export type User = {
	name?: string;
	isAuthenticated: boolean;
};

export const user = writable<User | null>();
