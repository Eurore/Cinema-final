const magic = new Magic("pk_live_C5DFEF49BAF9CA7E");

/**
 * User login with link from the Magic.
 *
 * @param   {string}  email
 *
 * @return  {void}
 */
const authUser = async ({ email }) => {
	try {
		const authToken = await magic.auth.loginWithEmailOTP({ email: email });
		if (authToken) {
			cinema.auth = {
				email: email,
			};
			router.push("/ticket-type");
		} else {
			alert("Auth token is not found!");
		}
	} catch (errors) {
		console.log(errors);
	}
};

/**
 * Get and use already logged user.
 *
 * @return  {void}
 */
const isUserLoggedIn = async () => {
	try {
		const user = await magic.user.getInfo();
		if (user?.email) {
			cinema.auth = {
				...cinema.auth,
				email: user.email,
			};
		} else {
			cinema.auth = {};
		}
	} catch (error) {
		console.log(error)
		cinema.auth = {};
	}

};

/**
 * User log out and localStorage flush.
 *
 * @return  {void}
 */
const logOut = async () => {
	await magic.user.logout();
	cinema.auth = {};
	router.replace("/");
};
