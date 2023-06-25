/**
 * Assign selected movie to object
 * Save this object to localStorage.
 *
 * @param   {string}  time   Selected time.
 * @param   {object}  props  Movie data
 *
 * @return  {void}
 */
const saveMovieToStorage = (time, props) => {
	cinema.movie = {
		id: +props.id || null,
		date: `${cinema.getWeek()[cinema.activeDate].fullDate}, ${time}` || null,
	};
	localStorage.setItem("last_movie", JSON.stringify(cinema.movie));
};

/**
 * Assign new properties to selected movie.
 * Save updated movie to localStorage
 *
 * @param   {number}  qty  //Bought ticket count.
 * @param   {object}  movie  //Selected movie
 *
 * @return  {void}
 */
const saveTicketTypeToStorage = (tickets, movie, total) => {
	cinema.movie = {
		...cinema.movie,
		tickets: tickets,
		//occupiedSeats: movie?.occupiedSeats, //now it is taken from the API
		total: total,
	};
	localStorage.setItem("last_movie", JSON.stringify(cinema.movie));
};

/**
 * Save reserved seats to localStorage.
 * Also assign them to an object.
 *
 * @param   {array}  seats  // Reserved seats
 *
 * @return  {void}
 */
const saveSeatsToStorage = (seats) => {
	cinema.movie = {
		...cinema.movie,
		seats: seats,
	};
	localStorage.setItem("last_movie", JSON.stringify(cinema.movie));
};
/**
 * Store last generated reservation number to localStorage
 * Assign it to selected movie
 * Create Array from reservations and store them to localStorage.
 *
 * @return  {number}
 */
const storeLastReservationNumberToStorage = (number) => {
	cinema.movie = {
		...cinema.movie,
		reservationNumber: number,
	};
	localStorage.setItem("last_movie", JSON.stringify(cinema.movie));
	const oldReservations = JSON.parse(localStorage.getItem("reserved_movies")) || [];
	localStorage.setItem("reserved_movies", JSON.stringify([...oldReservations, cinema.movie]));
};

/**
 * Get previously selected movie from localStorage.
 * Assign it to an object.
 *
 * @return  {void}
 */
const getMovieFromStorage = () => {
	const lastSelectedMovie = JSON.parse(localStorage.getItem("last_movie"));
	cinema.movie = lastSelectedMovie;
};

/**
 * Get all reserved movies.
 *
 * @return  {array}
 */
const getReservedMovies = () => {
	const allReservedMovies = JSON.parse(localStorage.getItem("reserved_movies"));
	return allReservedMovies;
};
