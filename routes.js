var sim = require('./simulator').simulator;

module.exports = app => {
  app.get('/', (req, res) => {
    res.send('<h1>ItemSense API Simulator</h1>');
  });
  app.get('/itemsense/data/v1/items/show', (req, res) => {
    res.json(sim.showItems(req.query || {}));
  });
};
