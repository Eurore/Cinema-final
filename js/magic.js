const magic = new Magic("pk_live_68C5E719ADC0192C"); // ✨

/**
 * User login with link from the Magic.
 *
 * @param   {string}  email
 *
 * @return  {void}
 */
const authUser = async ({ email }) => {
	try {
		const authToken = await magic.auth.loginWithMagicLink({ email: email });
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
 * User log out and localStorage flush.
 *
 * @return  {void}
 */
const logOut = async () => {
	await magic.user.logout();
	cinema.auth = false;
	localStorage.clear();
	router.replace("/");
};
