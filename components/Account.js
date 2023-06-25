const Account = {
	name: "account",
	components: {
		Movie,
	},
	template: `
        <div class='account'>
            <div class='user-info'>
                {{ cinema.auth.email }}
                <button @click="logOut" class="logout">Изход</button>
		    </div>
			<div v-if='allReservedMovies.length' class='reservations'>
			<h2>История</h2>
				<div :key="movie.id" class='movie' v-for='movie in allReservedMovies'>
					<movie :movie="movie" />
				</div>
			</div>
        </div>
	`,
	setup() {
		let allReservedMovies = getReservedMovies() || [];
		if (allReservedMovies.length) {
			allReservedMovies = allReservedMovies.map((movie) => {
				const foundMovieInDB = cinema.movies.find((m) => m.id === movie.id);
				return {
					id: foundMovieInDB.id,
					image: foundMovieInDB?.image,
					type: foundMovieInDB?.type,
					title: foundMovieInDB?.title,
					date: movie?.date,
					total: movie?.total,
					reservationNumber: movie?.reservationNumber,
					seats: movie?.seats
				};
			});
		}

		return {
			logOut,
			allReservedMovies,
			cinema,
		};
	},
};
