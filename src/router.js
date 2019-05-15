import Vue from 'vue'
import Router from 'vue-router'
// import store from './store/index'
import dateFilters from '@/dateFilters';
import OverviewView from '@/views/Overview'
import ViewHome from '@/views/ViewHome'
import ViewToday from '@/views/ViewToday'
import ViewTomorrow from '@/views/ViewTomorrow'
import ViewProject from '@/views/ViewProject'
import ViewInbox from '@/views/ViewInbox'
import ViewSomeday from '@/views/ViewSomeday'

Vue.use( Router )

const router = new Router( {
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [ {
			path: '/',
			name: 'home',
			component: ViewHome,
			meta: {
				requiresAuth: true
			}
		},
		{
			path: '/inbox',
			name: 'inbox',
			component: ViewInbox,
			meta: {
				requiresAuth: true
			}
		},
		{
			path: '/today',
			name: 'today',
			component: ViewToday,
			meta: {
					requiresAuth: true,
				}
		},
		{
			path: '/tomorrow',
			name: 'tomorrow',
			component: ViewTomorrow,
			meta: {
				requiresAuth: true
			}
		},
		{
			path: '/menu',
			name: 'menu',
			component: () =>
				import( './views/Menu.vue' ),
			meta: {
				requiresAuth: false
			}
		},
		{
			path: '/someday',
			name: 'someday',
			component: ViewSomeday,
			meta: {
				requiresAuth: true,
			}
		},
		{
			path: '/projects/:projectId',
			name: 'project',
			component: ViewProject,
			props: true,
			meta: {
				requiresAuth: true
			}
		},
		{
			path: '/login',
			name: 'login',
			component: () =>
				import( './views/Login.vue' ),
			meta: {
				requiresAuth: false
			}
		}
	]
} )

// router.beforeEach( ( to, from, next ) => {
	// store.dispatch( 'updateMenuOpen', false );
	// if( to.matched.some( record => record.meta.requiresAuth ) ) {
	// 	if( !store.state.user ) {
	// 		next( {
	// 			path: '/login'
	// 		} )
	// 	} else {
	// 		next()
	// 	}
	// } else {
	// 	next()
	// }
// } )

export default router
