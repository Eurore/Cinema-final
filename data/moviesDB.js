/**
 * 'info': An optional property.
 * 'id': ALWAYS provide unique id.
 *
 * @var {array}
 */
const moviesDB = [
	{
		id: 1,
		type: "2D",
		title: "Batman",
		image: "https://static.posters.cz/image/1300/posters/the-batman-2022-i122127.jpg",
		timeStamps: ["11:30", "15:00", "18:30", "21:00"],
		occupiedSeats: [36, 34, 35, 23],
		tickets: [
			{
				id: 100,
				type: "Стандартен",
				price: 17.0,
			},
			{
				id: 101,
				type: "Студентски",
				price: 13.0,
			},
			{
				id: 102,
				type: "Детски",
				price: 13.0,
			},
			{
				id: 103,
				type: "Пенсионер",
				price: 13.0,
			},
			{
				id: 104,
				type: "Инвалиден",
				price: 13.0,
			},
		],
		popular: true,
	},
	{
		id: 2,
		type: "3D",
		title: "Death on the Nile",
		image: "https://m.media-amazon.com/images/M/MV5BMjc4MTgyZjktM2EzZS00MmNmLWEzYWMtMDBlMDU1MDQyY2Q3XkEyXkFqcGdeQXVyMTQyMTMwOTk0._V1_.jpg",
		info: "* За филми в 3D формат са ви необходими 3D очила, които се купуват отделно от билета в кината на цена 2 лв./бр",
		timeStamps: ["12:00", "14:00", "16:30", "20:00"],
		tickets: [
			{
				id: 105,
				type: "Стандартен",
				price: 15.0,
			},
			{
				id: 106,
				type: "Студентски",
				price: 12.0,
			},
			{
				id: 107,
				type: "Детски",
				price: 12.0,
			},
			{
				id: 108,
				type: "Пенсионер",
				price: 12.0,
			},
			{
				id: 109,
				type: "Инвалиден",
				price: 12.0,
			},
		],
	},
	{
		id: 3,
		type: "3D",
		title: "Fantastic Beasts: The Secrets of Dumbledore",
		image: "https://m.media-amazon.com/images/M/MV5BZGQ1NjQyNDMtNzFlZS00ZGIzLTliMWUtNGJkMGMzNTBjNDg0XkEyXkFqcGdeQXVyMTE1NDI5MDQx._V1_.jpg		",
		info: "* За филми в 3D формат са ви необходими 3D очила, които се купуват отделно от билета в кината на цена 2 лв./бр",
		timeStamps: ["12:30", "14:40", "16:30", "18:00"],
		occupiedSeats: [31, 30, 25, 20],
		tickets: [
			{
				id: 110,
				type: "Стандартен",
				price: 18.0,
			},
			{
				id: 111,
				type: "Студентски",
				price: 16.0,
			},
			{
				id: 112,
				type: "Детски",
				price: 16.0,
			},
			{
				id: 113,
				type: "Пенсионер",
				price: 16.0,
			},
			{
				id: 114,
				type: "Инвалиден",
				price: 16.0,
			},
		],
		popular: true,
	},
	{
		id: 4,
		type: "2D",
		title: "Morbius",
		image: "https://m.media-amazon.com/images/M/MV5BYjlhNTA3Y2ItYjhiYi00NTBiLTg5MDMtZDJjMDZjNzVjNjJmXkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_.jpg",
		timeStamps: ["15:30", "18:30", "21:30", "22:00"],
		occupiedSeats: [21, 22, 23, 24],
		tickets: [
			{
				id: 115,
				type: "Стандартен",
				price: 18.0,
			},
			{
				id: 116,
				type: "Студентски",
				price: 16.0,
			},
			{
				id: 117,
				type: "Детски",
				price: 16.0,
			},
			{
				id: 118,
				type: "Пенсионер",
				price: 16.0,
			},
			{
				id: 119,
				type: "Инвалиден",
				price: 16.0,
			},
		],
	},
].reverse();
