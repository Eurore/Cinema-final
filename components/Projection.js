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
        <div class='projection' data-aos="fade">
			<div class="container">
				<div class="iframe-wrapper">
					<iframe
						v-if="movie.movie_trailer"
						width="100%"
						height="100%"
						:src="youtubeEmbed(movie.movie_trailer)"
						:title="movie.movie_name"
						frameborder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
						allowfullscreen
					>
					</iframe>
					<div class="missing-trailer" v-else>
						<h2>Трейлърът още не е добавен</h2>
					</div>
				</div>
				<div class="projection-info">
				<div class="image-wrapper movie">
					<div class='badge'>{{ movie.is_3d ? "3D" : "2D" }}</div>
					<img
						:src="movie.cover"
						:alt="movie.movie_name"
						width="500"
						height="500"
					/>
				</div>
				<div class="info">
					<h1>{{movie.movie_name}}</h1>
					<p>
						<svg width="15" height="12" viewBox="0 0 576 512" xmlns="http://www.w3.org/2000/svg" fill="orange">
							<path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"/>
						</svg>
						{{ movie.movie_rating }} | {{ transformDuration(movie.duration) }} • {{ movie.parent_control_code }}
					</p>
					<p class="movie-description">{{ movie.movie_description }}</p>
					<router-link
						to="/"
						v-slot="{href, route, navigate}"
					>
						<button :href="href" @click="navigate" class='reserve-button'>
						Резервация
						</button>
					</router-link>
				</div>
 				</div>
			</div>

		</div>
		<div class="actors" v-if="movie?.actors?.length > 0" data-aos="fade">
			<h2>Actors</h2>
			<Actor :key="actor.actor_id" v-for="actor in movie.actors" :actor="actor"/>
		</div>
	`,
	setup() {
		const route = VueRouter.useRoute();
		const movie = Vue.ref({})

		/**
		 * Convert the youtube video url to embed.
		 *
		 * @param   {string}  trailer
		 * @return  {string}
		 */
		const youtubeEmbed = (trailer) => {
			const url = new URL(trailer);
			const searchParams = new URLSearchParams(url.search);
			if (searchParams) {
				return `https://www.youtube.com/embed/${searchParams.get('v')}?autoplay=1&mute=1`
			}
			return "https://www.youtube.com/embed/"
		}

		/**
		 * Format the movie duration.
		 *
		 * @param   {string}  duration
		 * @return  {string}
		 */
		const transformDuration = (duration) => {
			const num = duration;
			const hours = (num / 60);
			const rhours = Math.floor(hours);
			const minutes = (hours - rhours) * 60;
			const rminutes = Math.round(minutes);
			return `${rhours}h ${rminutes}m`;
		};

		// Fetch movie by ID. The Id is coming from the url path.
		Vue.onBeforeMount(async () => {
			const res = await fetch(`${apiBaseUrl}/movie/view/?id=${route.params.id}`)
			const data = await res.json();
			movie.value = data;
			AOS.init({
				once: true,
				offset: 0,
			})
		});

		return {
			movie,
			transformDuration,
			youtubeEmbed,
		}
	},
};
