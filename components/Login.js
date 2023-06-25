const Login = {
	name: "login",
	template: `
        <div class='login' data-aos="fade">
			<h1>Вход</h1>
			<form @submit='handleSubmit'>
				<div class="name-container">
					<input type='text' name='firstname' placeholder='Име' required />
					<input type='text' name='lastname' placeholder='Фамилия' required />
				</div>
				<input type='email' name='email' placeholder='Имейл' required />
				<button type='submit'> Log in</button>
			</form>
        </div>
		 `,
	setup() {
		/**
		 * Login user with email.
		 *
		 * @param   {object}  event
		 * @return  {mixed}
		 */
		const handleSubmit = (event) => {
			event.preventDefault();
			const formData = new FormData(event.target);
			const userData = {
				email: formData.get("email"),
			};

			if (!userData.email.includes("@")) return;
			authUser(userData);
		};

		return {
			handleSubmit,
			cinema,
		};
	},
};
