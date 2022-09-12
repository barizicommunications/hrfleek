import Vue from 'vue'
import VueRouter from 'vue-router'
import { auth } from "../firebase";

Vue.use(VueRouter)

let routes = [
	{
		// will match everything
		path: '*',
		component: () => import('../views/404.vue'),
	},
	{
		path: '/',
		name: 'Home',
		redirect: '/dashboard',
		meta: {
			requiresAuth: true,
		  },
	},
	{
		path: '/dashboard',
		name: 'Dashboard',
		layout: "dashboard",
		component: () => import(/* webpackChunkName: "dashboard" */ '../views/Dashboard.vue'),
		meta: {
			requiresAuth: true,
		  },
	},
	{
		path: '/layout',
		name: 'Layout',
		layout: "dashboard",
		component: () => import('../views/Layout.vue'),
		meta: {
			requiresAuth: true,
		  },
	},
	{
		path: '/editemployee',
		name: 'Editemployee',
		layout: "dashboard",
		component: () => import('../views/EditEmployee.vue'),
		meta: {
			requiresAuth: true,
		  },
	},
	{
		path: '/addnewemployee',
		name: 'AddNewemployee',
		layout: "dashboard",
		component: () => import('../views/NewEmployee.vue'),
		meta: {
			requiresAuth: true,
		  },
	},
	{
		path: '/employees',
		name: 'employees',
		layout: "dashboard",
		component: () => import('../views/Employees.vue'),
		meta: {
			requiresAuth: true,
		  },
	},
	{
		path: '/clients',
		name: 'Clients',
		layout: "dashboard",
		component: () => import('../views/Clients.vue'),
		meta: {
			requiresAuth: true,
		  },
	},
	{
		path: '/calendar',
		name: 'Calendar',
		layout: "dashboard",
		component: () => import('../views/Calendar.vue'),
	},
	{
		path: '/bulk-edits',
		name: 'Bulk-Edits',
		layout: "dashboard",
		component: () => import('../views/BulkEdits.vue'),
	},
	{
		path: '/payrun/:id',
		name: 'Payrun',
		layout: "dashboard",
		component: () => import('../views/Payrun.vue'),
	},
	{
		path: '/reports',
		name: 'Reports',
		layout: "dashboard",
		component: () => import('../views/Reports.vue'),
	},
	{
		path: '/client-details',
		name: 'Client-Details',
		layout: "dashboard",
		component: () => import('../views/SingleClient.vue'),
	},
	{
		path: '/Profile',
		name: 'Profile',
		layout: "dashboard",
		meta: {
			layoutClass: 'layout-profile',
		},
		component: () => import('../views/Profile.vue'),
	},
	{
		path: '/sign-in',
		name: 'Sign-In',
		component: () => import('../views/Sign-In.vue'),
	},
	{
		path: '/otp-screen',
		name: 'Otp-Screen',
		component: () => import('../views/Otp-screen.vue'),
	},

]

// Adding layout property from each route to the meta
// object so it can be accessed later.
function addLayoutToRoute( route, parentLayout = "default" )
{
	route.meta = route.meta || {} ;
	route.meta.layout = route.layout || parentLayout ;
	
	if( route.children )
	{
		route.children = route.children.map( ( childRoute ) => addLayoutToRoute( childRoute, route.meta.layout ) ) ;
	}
	return route ;
}

routes = routes.map( ( route ) => addLayoutToRoute( route ) ) ;

const router = new VueRouter({
	mode: 'history',
	routes,
})
router.beforeEach((to, from, next) => {
	const requiresAuth = to.matched.some((route) => route.meta.requiresAuth);
  
	if (requiresAuth && !auth.currentUser) {
	  next("/Sign-In");
	} else {
	  next();
	}
  });
export default router
