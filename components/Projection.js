
const movieData = {
	"movie_id": 1,
	"movie_name": "The Witcher",
	"is_popular": 1,
	"cover": "https://www.pixelstalk.net/wp-content/uploads/images6/Witcher-HD-Wallpaper-Free-download.jpg",
	"is_3d": 1,
	"status_id": 2,
	"is_published": 1,
	"parent_control_id": 3,
	"duration": 183,
	"created_at": "2023-05-11 10:03:03",
	"updated_at": "2023-05-11 10:03:03",
	"status_name": "active",
	"parent_control_code": "PG-13",
	"trailer": "https://youtu.be/ndl1W4ltcmg",
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

const Actor = {
	name: "actor",
	props: ["actor"],
	template: `
		<div class="actor">
			<img
				class="actor-image"
				loading="lazy"
				:src="actor.actor_image"
				:alt="actor.actor_name"
				width="300"
				height="300"
			/>
			<div class="actor-info">
				<h3>{{ actor.actor_name }}</h3>
				<small>Role: {{ actor.in_the_role_of }}</small>
			</div>
		</div>
	`
}


const Projection = {
	name: "projection",
	props: ["actor"],
	components: {
		Actor,
	},
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
						<p>
							<svg width="15" height="12" viewBox="0 0 576 512" xmlns="http://www.w3.org/2000/svg" fill="orange">
								<path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"/>
							</svg>
							8.2 | {{ movie.duration }} • {{ movie.parent_control_code }}
						</p>
 						<button class="reserve-button" @click="clickHandler">Reserve</button>
						<button	v-if="movie.trailer" class="trailer-button" @click="playTrailer = !playTrailer">Trailer</button>
					</div>
 				</div>
				<div v-if="playTrailer" class="trailer-overlay" @click="playTrailer = false">
					<button @click="playTrailer = false">+</button>
				</div>
 				<div :class="['trailer', {active: playTrailer}]" ref="trailer">
					<iframe
						v-if="playTrailer && movie.trailer"
						width="300"
						height="300"
						:src="movie.trailer"
						:title="movie.movie_name"
						frameborder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
						allowfullscreen
					>
					</iframe>
				</div>
			</div>


		</div>
		<div class="actors">
			<h2>Actors</h2>
			<Actor :key="actor.actor_id" v-for="actor in movie.actors" :actor="actor"/>
		</div>
	`,
	setup() {
		const route = VueRouter.useRoute();
		const playTrailer = Vue.ref(false)
		const trailer = Vue.ref(null);

		const id = route.params.id
		const movie = movieData.movie_id === +id ? movieData : null

		const youtubeEmbed = movie?.trailer && `https://www.youtube.com/embed/${movie.trailer.split('/').pop()}`

		const clickHandler = () => {
			router.push('/')
		}

		const transformDuration = (duration) => {
			const num = duration;
			const hours = (num / 60);
			const rhours = Math.floor(hours);
			const minutes = (hours - rhours) * 60;
			const rminutes = Math.round(minutes);
			return `${rhours}h ${rminutes}m`;
		}


		movie.duration = transformDuration(movie.duration)
		movie.trailer = youtubeEmbed;


		Vue.watch(playTrailer, (flag, prevCount) => {
			if (flag) {
				setTimeout(() => {
					trailer.value?.scrollIntoView({ behavior: 'smooth', block: 'center' });
					document.body.style.overflow = 'hidden'
				}, 200);

			} else {
				document.body.style.overflow = ''
			}
		})


		return {
			movie,
			playTrailer,
			trailer,
			clickHandler
		}
	},
};
