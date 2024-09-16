export async function load({ cookies }) {
	const authCookie = cookies.get('.AspNetCore.Cookies');

	return {
		// TODO: Do something better than this, set up endpoint in YARP to get id_token?
		signedIn: !!authCookie
	};
}
