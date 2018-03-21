var sim = require('./simulator').simulator;

module.exports = app => {
  app.get('/', (req, res) => {
    res.send('<h1>ItemSense API Simulator</h1>');
  });
  app.get('/itemsense/data/v1/items/show', (req, res) => {
    res.json(sim.showItems(req.query || {}));
  });

  app.get('/itemsense/authentication/v1/token', (req, res) => {
    res.json({token: '123456-123456-123456-123456'});
  });
  
  app.put('/itemsense/data/v1/items/queues', (req, res) => {
    res.json({
      serverUrl: 'amqp://localhost:5672/%2F',
      queue: '1127b6d0c96f6c55d42e54b390f9a6c50fc4911b956c1a3128a2e26c3f6481cd-' + Date.now()
    });
  });

  app.get('/itemsense/control/v1/jobs/show', (req, res) => {
    const now = new Date().toISOString();
    res.json({ array:
        [{
            id: '12e1kj12e',
            status: 'RUNNING',
            readerName: ['Zone1', 'Zone2'],
            failedReaderName: [],
            creationTime:  now,
            lastActivity: now,
            activityDuration: Math.floor(Math.random() * 1000),
            errorOccured: false,
            errors: [{time: now, message: 'Some error message'}],
            maxErrors: 10,
            stopReason: 'USER_REQUESTED_GRACEFUL',
            facilities: ['Lake Charles'],
            job: {},
            instanceMetadata: {},
            lastHeartbeatTime: now,
            startAttempts: 1
        }]
    });
  });
};
