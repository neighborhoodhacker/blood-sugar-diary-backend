module.exports = {
	routes: [
		{
			method: 'GET',
			path: '/user-preferences/for-current-user',
			handler: 'user-preference-secure.forCurrentUser',
			config: {
				policies: [],
			},
		},
		{
			method: 'POST',
			path: '/user-preferences/create-for-user',
			handler: 'user-preference-secure.createForUser',
			config: {
				policies: [],
			},
		},
		{
			method: 'POST',
			path: '/user-preferences/update-for-user',
			handler: 'user-preference-secure.updateForUser',
			config: {
				policies: [],
			},
		},
	]
}