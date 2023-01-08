export const appSettings = {
	pages: {
		home: {
			url: '/',
			theme: 'blue',
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
			theme: 'purple',
			title: 'inspiration',
			screens: []
		},
		achievement: {
			url: '/achievement',
			theme: 'purple',
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