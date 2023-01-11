import { PAGE_TITLE_ARROWS } from "../components/PageTitle";

const tryAgainMessage = {
	gratitude: 'Are you sure that there isn\'t anything that you are grateful for right now?',
	inspiration: 'Are you sure that there isn\'t anything that can inspire people right now?',
	achievement: 'Are you sure that there isn\'t anything that you want to achieve today?'
}

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
			arrows: {
				left: PAGE_TITLE_ARROWS.ACHIEVEMENT,
				right: PAGE_TITLE_ARROWS.INSPIRATION
			},
			tryAgain: tryAgainMessage.gratitude,
			screens: []
		},
		inspiration: {
			url: '/inspiration',
			theme: 'blue',
			title: 'inspiration',
			arrows: {
				left: PAGE_TITLE_ARROWS.GRATITUDE,
				right: PAGE_TITLE_ARROWS.ACHIEVEMENT
			},
			tryAgain: tryAgainMessage.inspiration,
			screens: []
		},
		achievement: {
			url: '/achievement',
			theme: 'red',
			title: 'achievement',
			arrows: {
				left: PAGE_TITLE_ARROWS.INSPIRATION,
				right: PAGE_TITLE_ARROWS.GRATITUDE
			},
			tryAgain: tryAgainMessage.achievement,
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