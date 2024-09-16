export const ssr = false;
export const prerender = false;

export type User = {
	name: string;
	authenticationType: string;
	isAuthenticated: boolean;
	claims: {
		type: string;
		value: string;
	}[];
};

export const load = async () => {
	const response = await fetch('Account/Profile');
	if (!response.ok) {
		return {
			user: {
				isAuthenticated: false
			}
		};
	}

	const user: User = await response.json();
	return {
		user
	};
};
