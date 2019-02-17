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
				import( './views/Inbox.vue' ),
			meta: {
				requiresAuth: true
			}
		},
		{
			path: '/locations',
			name: 'locations',
			component: () =>
				import( './views/Locations.vue' ),
			meta: {
				requiresAuth: true
			}
		},
		{
			path: '/tags/:id',
			name: 'tags',
			component: () =>
				import( './views/Tags.vue' ),
			meta: {
				requiresAuth: true
			}

		},
		{
			path: '/today',
			name: 'today',
			component: () =>
				import( './views/Today.vue' ),
			meta: {
				requiresAuth: true
			}
		},
		{
			path: '/tomorrow',
			name: 'tomorrow',
			component: () =>
				import( './views/Tomorrow.vue' ),
			meta: {
				requiresAuth: true
			}
		},
		{
			path: '/someday',
			name: 'someday',
			component: () =>
				import( './views/Someday.vue' ),
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
	console.log( 'beforeeach?', store.state.user )
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
