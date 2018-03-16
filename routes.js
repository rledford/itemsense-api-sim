var sim = require('./simulator').simulator;

module.exports = app => {
  app.get('/', (req, res) => {
    res.send('<h1>ItemSense API Simulator</h1>');
  });
  app.get('/itemsense/data/v1/items/show', (req, res) => {
    res.json(sim.showItems(req.query || {}));
  });
  app.put('/itemsense/data/v1/queues', (req, res) => {
    res.json({
      serverUrl: 'amqp://localhost:5672/%2F',
      queue: '1127b6d0c96f6c55d42e54b390f9a6c50fc4911b956c1a3128a2e26c3f6481cd'
    });
  });
};
