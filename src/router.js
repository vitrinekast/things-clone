import Vue from 'vue'
import Router from 'vue-router'
import store from './store/index'


Vue.use( Router )

const router = new Router( {
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [ {
			path: '/',
			name: 'home',
			component: () =>
				import( './views/Home.vue' ),
			meta: {
				requiresAuth: true
			}
		},
		{
			path: '/inbox',
			name: 'inbox',
			component: () =>
				import( './views/Overview.vue' ),
			meta: {
				requiresAuth: true
			}
		},
		{
			path: '/today',
			name: 'today',
			component: () =>
				import( './views/Overview.vue' ),
			meta: {
				requiresAuth: true
			}
		},
		{
			path: '/tomorrow',
			name: 'tomorrow',
			component: () =>
				import( './views/Overview.vue' ),
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
			component: () =>
				import( './views/Overview.vue' ),
			meta: {
				requiresAuth: true
			}
		},
		{
			path: '/projects/:projectId',
			name: 'project',
			component: () =>
				import( './views/Project.vue' ),
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

router.beforeEach( ( to, from, next ) => {
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
