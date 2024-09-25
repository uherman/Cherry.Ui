import { type User, user } from '@/stores/userStore';

export const ssr = false;
export const prerender = false;

export const load = async () => {
	const response = await fetch('Account/Profile');
	if (!response.ok) {
		return {
			user: {
				isAuthenticated: false
			}
		};
	}

	const authenticatedUser: User = await response.json();
	user.set(authenticatedUser);
	return {
		user: authenticatedUser
	};
};
