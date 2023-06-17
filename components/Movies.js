const Timespan = {
	name: "timespan",
	props: ["id", "timeStamps"],
	template: `
		<div class='reserve-time'>
		 <button @click="selectTime(time)" :key='idx' v-for='(time, idx) in timeStamps' :disabled='validateDate(time)' >
			{{ time }}
		 </button>
	 </div>`,
	setup(props) {
		/**
		 * Validate day, time
		 *
		 * @param   {string}  date
		 * @return  {boolean}
		 */
		const validateDate = (date) => {
			let selectedDay = cinema.getWeek();
			selectedDay = selectedDay?.length && selectedDay[cinema.activeDate].fullDate;
			const currentTime = new Date().getTime();
			const compareTime = new Date(`${selectedDay}, ${date}`).getTime();
			return currentTime >= compareTime;
		};

		/**
		 * Select time for reservation.
		 *
		 * @param   {string}  time
		 * @return  {void}
		 */
		const selectTime = (time) => {
			saveMovieToLocalStorage(time, props);

			if (!cinema.auth?.email?.includes("@")) {
				router.push("/login");
			} else {
				router.push("/ticket-type");
			}
		};
		return {
			validateDate,
			selectTime,
			cinema,
		};
	},
};

const Day = {
	name: "day",
	template: `
		<div class='reserve-day'>
		 <button  @click='selectDate(idx, date)' :class='{active: cinema.activeDate === idx}' :key='idx' v-for='(date, idx) in dates'>
			<p>	{{ date.dayMonth }}</p>
			<p>	{{ date.dayName }}</p>
		 </button>
	 </div>`,
	setup() {
		const selectDate = (idx, date) => {
			cinema.activeDate = idx;
			cinema.getMoviesByDate(date.fullDate);
			console.log(59, cinema.activeDate, idx, date.fullDate)
		};
		return {
			selectDate,
			dates: cinema.getWeek(),
			cinema,
		};
	},
};

const Movie = {
	name: "movie",
	props: ["movie"],
	components: {
		Timespan,
	},
	template: `
            <img
                loading='lazy'
                class='movie-image'
                :src='props.movie.image'
                :alt='props.movie.title'
                width="150"
                height="200"
                v-if='props.movie.image.length'
            />
            <div class='badge' v-if="props.movie.type">{{ props.movie.type }}</div>
            <div class='movie-content'>
                <h2>{{ props.movie.title }}</h2>
                <p v-if="props.movie.timeStamps">Купи билет</p>
                <timespan :id='props.movie.id' :timeStamps="props.movie.timeStamps" v-if="props.movie.timeStamps"/>
                <em v-if="props.movie.info">{{ props.movie?.info }}</em>
				<div class='account-page-data' v-if="props.movie.date">
					<p v-if="props.movie.reservationNumber">Номер: {{ props.movie.reservationNumber }}</p>
					<p v-if="props.movie.seats">Места: {{ props.movie.seats.join(', ') }}</p>
					<p v-if="props.movie.date">Дата: {{ props.movie.date }}ч</p>
					<p v-if="props.movie.total">Тотал: {{ parseFloat(props.movie.total).toFixed(2) }} лв.</p>
				</div>
            </div>
    `,
	setup(props) {
		return {
			props,
			cinema,
		};
	},
};

const Movies = {
	name: "movies",
	components: {
		Day,
		Movie,
	},
	template: `
		<div class='container'>
			<h1>Cinema Land Varna</h1>
			<day/>
			<div class='popular-movies'>
				<label for="top_movies">{{ !togglePopular ? 'Покажи' : 'Скрий'}} най-популярните филми
					<input v-model='togglePopular' type="checkbox" id="top_movies" name="top_movies"/>
					<span class="slider"></span>
				</label>
			</div>
			<div class='movies'>
				<div class='movie' :key='movie.id' v-for='movie in movies'>
					<movie :movie="movie"/>
				</div>
			</div>
		 </div>`,
	setup() {
		const togglePopular = Vue.ref(false);
		const movies = Vue.computed(() =>
			togglePopular.value ? cinema.movies.filter((movie) => movie.popular) : cinema.movies
		);
		return { cinema, togglePopular, movies };
	},
};
