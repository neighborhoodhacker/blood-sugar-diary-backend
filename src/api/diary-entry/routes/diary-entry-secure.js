module.exports = {
	routes: [
		{
			method: 'GET',
			path: '/diary-entries/for-current-user/:start/:limit',
			handler: 'diary-entry-secure.forCurrentUser',
			config: {
				policies: [],
			},
		},
		{
			method: 'GET',
			path: '/diary-entries/for-current-user-count',
			handler: 'diary-entry-secure.forCurrentUserCount',
			config: {
				policies: [],
			},
		},
		{
			method: 'GET',
			path: '/diary-entries/get-chart-data',
			handler: 'diary-entry-secure.getChartData',
			config: {
				policies: [],
			},
		},
		{
			method: 'POST',
			path: '/diary-entries/create-for-user',
			handler: 'diary-entry-secure.createForUser',
			config: {
				policies: [],
			},
		},
		{
			method: 'DELETE',
			path: '/diary-entries/delete-for-user/:id',
			handler: 'diary-entry-secure.deleteForUser',
			config: {
				policies: [],
			},
		},
	],
};