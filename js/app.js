const apiBaseUrl = "https://cinema.smart-bot.shop";

const cinema = Vue.reactive({
	movies: [],
	movie: {
		id: null,
		date: null,
		tickets: null,
		seats: null,
		total: null,
		reservationNumber: null,
	},
	activeDate: 0,
	selectedEventUnavailableSeats: [],
	paypalLink: null,
	auth: false,

	/**
	 *  Get from API all movie events for specific date
	 *	date - string format yyyy-mm-dd
	 *	if no date is provided, the API endpoint will return the movies for today
	*/
	getMoviesByDate(date) {
		if (typeof date == "undefined") date = "";

		fetch(`${apiBaseUrl}/event/list/?date=${date}`)
			.then(response => response.json())
			.then(function (data) {
				cinema.movies = data;
			}.bind(cinema));
	},

	/**
	 * Returns an array of the already reserved seats of a movie event in format: [36, 34, 35, 23]
	 */
	getUnavailableSeats() {
		var postDatetime = cinema.movie.date.replaceAll(",", "");
		fetch(`${apiBaseUrl}/event/reserved-seats/?movie_id=${cinema.movie.id}&datetime=${postDatetime}`)
			.then(response => response.json())
			.then(function (data) {
				cinema.selectedEventUnavailableSeats = data.reserved_seats;
			}.bind(cinema));
	},

	saveReservationDB(reservationNumber, movieData) {
		var postDatetime = movieData.datetimeFull.replaceAll(",", "");
		var postTickets = JSON.stringify(movieData.tickets);
		fetch(`${apiBaseUrl}/reservation/create/?email=${cinema.auth.email}&movie_id=${movieData.id}&datetime=${postDatetime}&reservation_number=${reservationNumber}&seats=${movieData.seats}&price=${movieData.total}&tickets=${postTickets}`)
			.then(response => response.json())
			.then(function (data) {
 				cinema.paypalLink = data.payment_link;
			}.bind(cinema));
	},

	/**
	 * Generate a week starting from the current date.
	 *
	 * @return  {array}
	 */
	getWeek() {
		const now = {
			day: new Date().getDate(),
			month: new Date().getMonth() + 1,
			year: new Date().getFullYear(),
		};

		const generateWeek = [...Array(7)].map((_, idx) => {
			let date = new Date(`${now.year},${now.month},${now.day + idx}`);
			if (isNaN(date)) {
				date = new Date(`${now.year},${now.month + 1}, ${idx}`);
			}
			return date;
		});

		return generateWeek.map((item) => {
			return {
				dayName: new Date(item).toLocaleDateString("BG", { weekday: "long" }),
				dayMonth: `${new Date(item).getDate()}${new Date(item).getMonth() + 1 < 10
					? `.0${new Date(item).getMonth() + 1}`
					: new Date(item).getMonth() + 1
					}`,
				fullDate: `${new Date(item).getFullYear()}-${new Date(item).getMonth() + 1}-${new Date(
					item
				).getDate()}`,
			};
		});
	}
});

const app = Vue.createApp({
	components: {
		Navigation,
		Movies,
		Login,
		Account,
		Tickets,
		Seats,
	},
	setup() {
		cinema.getMoviesByDate();
		getMovieFromStorage();

		return {
			cinema,
		};
	},
});
app.use(router);
app.mount("#app");
