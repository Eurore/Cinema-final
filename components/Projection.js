const movieData = {
	"movie_id": 1,
	"movie_name": "Dune",
	"is_popular": 1,
	"cover": "https://images6.alphacoders.com/116/1166940.jpg",
	"is_3d": 1,
	"status_id": 2,
	"is_published": 1,
	"parent_control_id": 3,
	"duration": 183,
	"created_at": "2023-05-11 10:03:03",
	"updated_at": "2023-05-11 10:03:03",
	"status_name": "active",
	"parent_control_code": "PG-13",
	"actors": [
		{
			"actor_id": 1,
			"actor_name": "Hayden Christensen",
			"actor_image": "https://m.media-amazon.com/images/M/MV5BY2Y2NTE4YzYtMTA4OS00NzNmLWIxNzctMDEyMjE2NWU3YWNmXkEyXkFqcGdeQXVyODMwMzI4MTg@._V1_QL75_UX280_CR0,0,280,280_.jpg",
			"in_the_role_of": "Anakin Skywalker"
		},
		{
			"actor_id": 2,
			"actor_name": "Natalie Portman",
			"actor_image": "https://m.media-amazon.com/images/M/MV5BYzU0ZGRhZWItMGJlNy00YzlkLWIzOWYtNDA2NzlhMDg3YjMwXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_QL75_UX280_CR0,24,280,280_.jpg",
			"in_the_role_of": "Padme"
		},
		{
			"actor_id": 3,
			"actor_name": "Ewan McGregor",
			"actor_image": "https://m.media-amazon.com/images/M/MV5BMTg1MjQ0MDg0Nl5BMl5BanBnXkFtZTcwNjYyNjI5Mg@@._V1_QL75_UX280_CR0,22,280,280_.jpg",
			"in_the_role_of": "Obi-Wan Kenobi"
		},
		{
			"actor_id": 4,
			"actor_name": "Samuel L. Jackson",
			"actor_image": "https://m.media-amazon.com/images/M/MV5BMTQ1NTQwMTYxNl5BMl5BanBnXkFtZTYwMjA1MzY1._V1_QL75_UX280_CR0,25,280,280_.jpg",
			"in_the_role_of": "Mace Windu"
		}
	]
}


const Projection = {
	name: "projection",
	template: `
        <div class='projection'>
			<div class="container">
				<img
					:src="movie.cover"
					:alt="movie.movie_name"
					width="1920"
					height="1080"
				/>
				<div class="projection-info">
					<div class="info">
						<h1>{{movie.movie_name}}</h1>
						<p>Duration: {{ movie.duration }} </p>

						<button class="reserve">Reserve</button>
						<button class="trailer">Trailer</button>
					</div>
					<div class="actors">
						<div class="actor" :key="actor.actor_id" v-for="actor in movie.actors">
						<img
							class="actor-image"
							loading="lazy"
							:src="actor.actor_image"
							:alt="actor.actor_name"
							width="40"
							height="40"
						/>
							<p>{{ actor.actor_name }}<p>
						</div>
					</div>
				</div>
			</div>
		</div>
	`,
	setup() {
		const route = VueRouter.useRoute();
		const id = route.params.id
		const movie = movieData.movie_id === +id
			? movieData : null

		const num = movie.duration;
		const hours = (num / 60);
		const rhours = Math.floor(hours);
		const minutes = (hours - rhours) * 60;
		const rminutes = Math.round(minutes);
		movie.duration = rhours + " hour(s) and " + rminutes + " minute(s).";

		return {
			movie
		}
	},
};
