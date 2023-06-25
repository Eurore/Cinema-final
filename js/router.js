// 1. Define some routes
// Each route should map to a component.
const routes = [
	{ path: "/", component: Movies },
	{ path: "/login", component: Login },
	{ path: "/account", component: Account },
	{ path: "/ticket-type", component: Tickets },
	{ path: "/seats", component: Seats },
	{ path: "/complete", component: Complete },
	{ path: "/about", component: About },
	{ path: '/movies/:id', component: Projection },

];

// 2. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = VueRouter.createRouter({
	// 3. Provide the history implementation to use. We are using the hash history for simplicity here.
	history: VueRouter.createWebHashHistory(),
	routes, // short for `routes: routes`
});

//4. Add some validations before render specific route.
router.beforeEach(async (to, from) => {
	if(!cinema?.auth?.email?.length) await isUserLoggedIn();

	if (!cinema?.auth?.email?.length) {
		if (to.fullPath === "/account") return "/login";
	}
	if (!cinema?.movie?.id) {
		if (to.fullPath === "/seats" || to.fullPath === "ticket-type") return "/";
	}

	if (!cinema.movie?.tickets?.totalNumber) {
		if (to.fullPath === "/seats") return "/ticket-type";
	}

	if (to.fullPath === "/login") {
		if (cinema?.auth?.email?.length) return "/account";
	}
});
