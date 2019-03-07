import Vue from 'vue'
import Router from 'vue-router'
import store from './store/index'
import dateFilters from '@/dateFilters';
import OverviewView from '@/views/Overview'

Vue.use( Router )

const router = new Router( {
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [ {
			path: '/',
			name: 'home',
			component: OverviewView,
			meta: {
				requiresAuth: true,
				title: '📥 Log',
				grouped: false,
				baseFilters: dateFilters('Log')

			}
		},
		{
			path: '/inbox',
			name: 'inbox',
			component: OverviewView,
			meta: {
				requiresAuth: true,
				title: '📥 Inbox',
				grouped: false,
				baseFilters: dateFilters('Inbox')
			}
		},
		{
			path: '/today',
			name: 'today',
			component: OverviewView,
			meta: {
					requiresAuth: true,
					title: '⭐️ Today',
					grouped: true,
					baseFilters: dateFilters('Today')
				}
		},
		{
			path: '/tomorrow',
			name: 'tomorrow',
			component: OverviewView,
			meta: {
				requiresAuth: true,
				title: '⭐️ Today',
				grouped: true,
				baseFilters: dateFilters('Tomorrow')
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
			component: OverviewView,
			meta: {
				requiresAuth: true,
				title: '⭐️ Someday',
				grouped: true,
				baseFilters: dateFilters('Someday')
			}
		},
		{
			path: '/projects/:projectId',
			name: 'project',
			component: OverviewView,
			meta: {
				requiresAuth: true,
				title: false,
				grouped: false,
				baseFilters: dateFilters('Project')
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

router.beforeEach( ( to, from, next ) => {
	store.dispatch( 'updateMenuOpen', false );
	if( to.matched.some( record => record.meta.requiresAuth ) ) {
		if( !store.state.user ) {
			next( {
				path: '/login'
			} )
		} else {
			next()
		}
	} else {
		next()
	}
} )

export default router
