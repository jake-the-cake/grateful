export const appSettings = {
	pages: {
		defaults: {
			postAuthUrl: '/gratitude',
			page: {
				theme: 'red'
			}
		},
		home: {
			url: '/',
			theme: 'purple',
			title: 'today',
			screens: []
		},
		gratitude: {
			url: '/gratitude',
			theme: 'green',
			title: 'gratitude',
			screens: []
		},
		inspiration: {
			url: '/inspiration',
			theme: 'blue',
			title: 'inspiration',
			screens: []
		},
		achievement: {
			url: '/achievement',
			theme: 'red',
			title: 'achievement',
			screens: []
		}
	},
	routes: {
		main: [ '/', '/gratitude', '/inspiration', '/achievement'	]
	},
	api: {
		baseUrl: 'http://localhost:4200'
	}
}