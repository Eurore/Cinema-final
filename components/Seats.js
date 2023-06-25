/**
 * Render all seats with rows and columns
 */
const Seats = {
	name: "seats",
	template: `
        <div class='seats'>
        <div class='hall-info'>

                <div class="seat">
                    <p>Заето място</p>
                    <input type="radio" disabled />
                    <label>
                        <svg
                            style="width: 39.5238px; height: 39.5238px"
                            version="1.1"
                            id="Layer_1"
                            x="0px"
                            y="0px"
                            width="25px"
                            height="19px"
                            viewBox="0 0 25 19"
                            enable-background="new 0 0 25 19"
                            xml:space="preserve"
                        >
                            <path
                                d="M17.316 0H7.987C5.806 0 4 1.8 4 3.969v9.797c0 0.2 0 0.4 0 0.6 c0.28-1.914 1.935-2.697 3.923-2.697h9.329c1.989 0 3.6 0.8 3.9 2.697c0.027-0.188 0.047-0.377 0.047-0.57V3.969 C21.286 1.8 19.5 0 17.3 0z M1.658 6.668C0.747 6.7 0 7.4 0 8.327v9.076c0 0.9 0.7 1.7 1.7 1.7 c0.913 0 1.659-0.746 1.659-1.659V8.327C3.317 7.4 2.6 6.7 1.7 6.668z M17.316 13.054H8.034 c-2.184 0-3.97 1.334-3.97 2.964v0.432c0 1.6 1.8 3 4 2.963h9.282c2.183 0 3.97-1.333 3.97-2.963v-0.432 C21.286 14.4 19.5 13.1 17.3 13.054z M23.645 6.668c-0.913 0-1.659 0.747-1.659 1.659v9.076 c0 0.9 0.7 1.7 1.7 1.659s1.66-0.746 1.66-1.659V8.327C25 7.4 24.6 6.7 23.6 6.668z"
                            ></path>
                        </svg>
                    </label>
                </div>
                <div class="seat">
                    <p>Свободно място</p>
                    <input type="radio" />
                    <label>
                        <svg
                            style="width: 39.5238px; height: 39.5238px"
                            version="1.1"
                            id="Layer_1"
                            x="0px"
                            y="0px"
                            width="25px"
                            height="19px"
                            viewBox="0 0 25 19"
                            enable-background="new 0 0 25 19"
                            xml:space="preserve"
                        >
                            <path
                                d="M17.316 0H7.987C5.806 0 4 1.8 4 3.969v9.797c0 0.2 0 0.4 0 0.6 c0.28-1.914 1.935-2.697 3.923-2.697h9.329c1.989 0 3.6 0.8 3.9 2.697c0.027-0.188 0.047-0.377 0.047-0.57V3.969 C21.286 1.8 19.5 0 17.3 0z M1.658 6.668C0.747 6.7 0 7.4 0 8.327v9.076c0 0.9 0.7 1.7 1.7 1.7 c0.913 0 1.659-0.746 1.659-1.659V8.327C3.317 7.4 2.6 6.7 1.7 6.668z M17.316 13.054H8.034 c-2.184 0-3.97 1.334-3.97 2.964v0.432c0 1.6 1.8 3 4 2.963h9.282c2.183 0 3.97-1.333 3.97-2.963v-0.432 C21.286 14.4 19.5 13.1 17.3 13.054z M23.645 6.668c-0.913 0-1.659 0.747-1.659 1.659v9.076 c0 0.9 0.7 1.7 1.7 1.659s1.66-0.746 1.66-1.659V8.327C25 7.4 24.6 6.7 23.6 6.668z"
                            ></path>
                        </svg>
                    </label>
                </div>
        </div>
        <div class='hall'>
            <div class='screen'>
                <span>Екран</span>
            </div>
            <form id='seats' class='pick-a-seat' @submit="handleSubmit">
                    <div class='seat' v-for="seat in columns" >
                        <input @change='validateSeats' type="checkbox" :id="seat" :name="seat" :value="seat" :disabled="cinema.selectedEventUnavailableSeats?.includes(seat)">
                        <label :for="seat">
                            <span class="seat-number">
                            {{ seat }}
                            </span>
                            <svg style="width: 39.5238px; height: 39.5238px;"version="1.1" id="Layer_1" x="0px" y="0px" width="25px" height="19px" viewBox="0 0 25 19" enable-background="new 0 0 25 19" xml:space="preserve"><path d="M17.316 0H7.987C5.806 0 4 1.8 4 3.969v9.797c0 0.2 0 0.4 0 0.6 c0.28-1.914 1.935-2.697 3.923-2.697h9.329c1.989 0 3.6 0.8 3.9 2.697c0.027-0.188 0.047-0.377 0.047-0.57V3.969 C21.286 1.8 19.5 0 17.3 0z M1.658 6.668C0.747 6.7 0 7.4 0 8.327v9.076c0 0.9 0.7 1.7 1.7 1.7 c0.913 0 1.659-0.746 1.659-1.659V8.327C3.317 7.4 2.6 6.7 1.7 6.668z M17.316 13.054H8.034 c-2.184 0-3.97 1.334-3.97 2.964v0.432c0 1.6 1.8 3 4 2.963h9.282c2.183 0 3.97-1.333 3.97-2.963v-0.432 C21.286 14.4 19.5 13.1 17.3 13.054z M23.645 6.668c-0.913 0-1.659 0.747-1.659 1.659v9.076 c0 0.9 0.7 1.7 1.7 1.659s1.66-0.746 1.66-1.659V8.327C25 7.4 24.6 6.7 23.6 6.668z"></path></svg>
                        </label>
                    </div>
            </form>
            <button form='seats'>Продължи</button>
            </div>
        </div>
	`,
	setup() {
		const columns = 36;
		const rows = columns / 9;
		const maxTickets = cinema.movie?.tickets?.totalNumber;
		cinema.getUnavailableSeats();

		/**
		 * Select seats while the selected seats are less than the total number of tickets.
		 *
		 * @param   {object}  event Selected seat.
		 * @return  {mixed}
		 */
		const validateSeats = (event) => {
			const allInputs = document.querySelectorAll(".pick-a-seat input:checked");
			return allInputs.length > maxTickets && (event.target.checked = false);
		};

		/**
		 * Show alert when the selected seats are less than the total number of tickets.
		 * Otherwise save selected seats to the localStorage and continue...
		 *
		 * @param   {object}  event "Продължи" action.
		 * @return  {mixed}
		 */
		const handleSubmit = (event) => {
			event.preventDefault();
			const checkedInputs = document.querySelectorAll(".pick-a-seat input:checked");
			if (checkedInputs.length < maxTickets) {
				alert(`Моля изберете още ${maxTickets - checkedInputs.length}`);
				return false;
			}
			if (checkedInputs.length === maxTickets) {
				const seats = [...checkedInputs].map((input) => input.value);
				saveSeatsToStorage(seats);
				router.replace("/complete");
			}
		};

		return {
			validateSeats,
			handleSubmit,
			rows,
			columns,
			cinema,
		};
	},
};
