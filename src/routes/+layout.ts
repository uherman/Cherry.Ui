import { type Notification, notifications, user } from '@/stores/userStore';

type Fetch = (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;

export const ssr = false;
export const prerender = false;

export const load = async ({ fetch }) => {
	const userResponse = await fetch('Account/Profile');
	if (!userResponse.ok) {
		return;
	}

	user.set(await userResponse.json());
	notifications.set(await getUserNotifications(fetch));
};

const getUserNotifications = async (fetch: Fetch): Promise<Notification[]> => {
	const response = await fetch('api/UserNotification');
	if (!response.ok) {
		return [];
	}

	return response.json();
};
