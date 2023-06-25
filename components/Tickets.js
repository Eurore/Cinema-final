const Tickets = {
	name: "tickets",
	template: `
	<div class='ticket-type' :style="{ backgroundImage: 'url(' + movieData.image + ')' }"  @submit="handleSubmit">
	<form class='container'>
		<div class='selected-movie'>
			<p>Прожекция: <strong>{{ movieData.name }}</strong></p>
			<p>Дата: <strong>{{ movieData.date }}</strong></p>
			<p>Час: <strong>{{ movieData.time }}</strong></p>
		</div>
		<div class='ticket-types'>
			<table class="bookingTable">
			<thead>
				<tr>
					<th class="type">Тип на билета</th>
					<th class="quantity">Брой</th>
					<th class="unitPrice">Ед. цена</th>
					<th class="totalPrice last">Сума</th>
				</tr>
			</thead>
			<tbody>
				<tr :key="ticket.id" v-for='ticket in movieData.tickets'>
					<td class="type">{{ ticket.type }}</td>
					<td class="quantity">
						<input v-model="qty[ticket.id]" type="number" :name="'tickets['+ticket.id+']'" min="0" max="6" />
					</td>
					<td class="unitPrice">
						<span class="price">{{ parseFloat(ticket.price).toFixed(2) }}</span> лв.
					</td>
					<td class="totalPrice">
						<span class="price">{{ isNaN(qty[ticket.id]) ? '0.00' : parseFloat(qty[ticket.id] * ticket.price).toFixed(2) }}</span> лв.
					</td>
				</tr>
			</tbody>
			</table>
		</div>
		<div class='totals'>
			<p v-if="movieData.info !== false">
				{{ movieData.info }}
			</p>
			<span>
			Общо: <h2>{{ parseFloat(price.total).toFixed(2) }}лв.</h2>
			</span>
		</div>
		<div class="actions">
			<button>Продължи</button>
		</div>
	</form>
	</div>
	`,
	setup() {
		const foundMovieInDB = cinema.movies.find((movie) => movie.id === cinema?.movie?.id);
		if (!foundMovieInDB?.id) {
			router.replace("/");
			return false;
		}
		const movieData = {
			name: foundMovieInDB.title,
			date: new Date(cinema.movie.date?.split(",")?.shift()).toLocaleDateString(),
			time: cinema.movie.date?.split(",")?.pop(),
			image: foundMovieInDB.image,
			tickets: (typeof foundMovieInDB.tickets != "undefined" ? foundMovieInDB.tickets : ticketsDB),
			info: foundMovieInDB.info || false,
		};

		let ticketObjects = {};
		movieData.tickets.forEach((ticket) => {
			ticketObjects = { ...ticketObjects, [ticket.id]: 0 };
		});

		const qty = Vue.reactive(ticketObjects);
		const price = Vue.reactive({ total: 0 });

		Vue.watch(
			qty,
			(newQty) => {
				price.total = 0;
				Object.keys(newQty).forEach((key) => {
					const selectedTicket = movieData.tickets.find((ticket) => ticket.id == +key);
					price.total += selectedTicket.price * newQty[key];
				});
			},
			{ deep: true }
		);

		const handleSubmit = (event) => {
			event.preventDefault();
			if (price.total === 0) {
				alert("Моля, изберете тип на билет!");
				return false;
			}
			const tickets = Object.keys(qty).reduce(
				({ totalNumber, typeOfTicket }, key) => {
					totalNumber += qty[key];
					qty[key] != 0 &&
						typeOfTicket.push({
							[movieData.tickets.find((t) => t.id === +key).type]: qty[key],
						});
					return { totalNumber, typeOfTicket };
				},
				{ totalNumber: 0, typeOfTicket: [] }
			);

			saveTicketTypeToStorage(tickets, foundMovieInDB, price.total);

			router.push("/seats");
		};

		return {
			qty,
			price,
			handleSubmit,
			movieData,
		};
	},
};
