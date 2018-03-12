var sim = require('./simulator');

module.exports = (app) => {
	app.get('/', (req, res) => {
		res.send('<h1>ItemSense API Simulator</h1>');
	});
	app.get('/itemsense/data/v1/items/show', (req, res) => {
		res.json({
			nextPageMarker: null,
			items: [
				{
					jobId: 'xxxxxxx-xxx-xxx-xxx-xxxxxxxxxxxx',
					lastModifiedTime: (new Date()).toISOString(),
					tagId: '',
					zone: 'Some Zone',
					epc: '1234567',
					presenceConfidence: 'HIGH'
				}
			]
		});
	});
};
