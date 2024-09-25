import { writable } from 'svelte/store';

export type User = {
	name: string;
	authenticationType: string;
	isAuthenticated: boolean;
	claims: {
		type: string;
		value: string;
	}[];
};

export const user = writable<User | null>();
