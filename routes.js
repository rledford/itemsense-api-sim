var sim = require('./simulator').simulator;

module.exports = app => {
  app.get('/', (req, res) => {
    res.send('<h1>ItemSense API Simulator</h1>');
  });
  app.get('/itemsense/data/v1/items/show', (req, res) => {
    res.json(sim.showItems(req.query || {}));
  });

  app.get('/itemsense/authentication/v1/token', (req, res) => {
    res.json({ token: '123456-123456-123456-123456' });
  });

  app.get('/itemsense/configuration/v1/users/authenticate', (req, res) => {
    res.json({
      name: 'Admin',
      roles: ['Admin']
    })
  });

  app.put('/itemsense/data/v1/items/queues', (req, res) => {
    res.json({
      serverUrl: 'amqp://localhost:5672/%2F',
      queue: '1127b6d0c96f6c55d42e54b390f9a6c50fc4911b956c1a3128a2e26c3f6481cd-' + Date.now()
    });
  });

  app.get('/itemsense/configuration/v1/readerDefinitions/show', (req, res) => {
    const now = new Date().toISOString();
    res.json([
      {
        "name": "SpeedwayR-00-00-01",
        "agentIdentifier": "SpeedwayR-00-00-01",
        "serialNumber": "370-17-01-1068",
        "address": "192.168.1.168",
        "groups": null,
        "type": "SPEEDWAY",
        "placement": null,
        "facility": "Lake Charles",
        "features": {
          "ANTENNA_HUB": {
            "status": "DISABLED",
            "statusLastUpdated": "2018-03-20T12:55:00.206Z",
            "requestStatus": "IDLE",
            "requestStatusLastUpdated": null,
            "requestTargetStatus": null
          }
        },
        "readerZone": "TestStoreZone",
        "antennaZones": {}
      },
      {
        "name": "SpeedwayR-00-00-02",
        "agentIdentifier": "SpeedwayR-00-00-02",
        "serialNumber": "370-17-01-1069",
        "address": "192.168.1.169",
        "groups": null,
        "type": "SPEEDWAY",
        "placement": null,
        "facility": "Lake Charles",
        "features": {
          "ANTENNA_HUB": {
            "status": "DISABLED",
            "statusLastUpdated": "2018-03-20T12:55:00.206Z",
            "requestStatus": "IDLE",
            "requestStatusLastUpdated": null,
            "requestTargetStatus": null
          }
        },
        "readerZone": "TestStoreZone2",
        "antennaZones": {}
      }
    ])
  })

  app.get('/itemsense/health/v1/readers', (req, res) => {
    const now = new Date().toISOString();
    res.json([
      {
        "lastTaskRequest": now,
        "clockSyncStatus": {
          "code": null,
          "status": "HEALTHY"
        },
        "softwareStatus": {
          "code": null,
          "status": "HEALTHY"
        },
        "readerName": "SpeedwayR-00-00-01",
        "lastReboot": now,
        "throughputStatus": {
          "code": null,
          "status": "HEALTHY"
        },
        "connectionStatus": {
          "code": "NETWORK",
          "status": "HEALTHY"
        },
        "hardwareStatus": {
          "code": null,
          "devices": null,
          "status": "HEALTHY"
        },
        "state": "RUNNING_JOB",
        "lastCheckin": now,
        "version": {
          "App": "0.0.3.240",
          "Firmware": "5.12.2.240"
        }
      },
      {
        "lastTaskRequest": now,
        "clockSyncStatus": {
          "code": null,
          "status": "HEALTHY"
        },
        "softwareStatus": {
          "code": null,
          "status": "HEALTHY"
        },
        "readerName": "SpeedwayR-00-00-02",
        "lastReboot": now,
        "throughputStatus": {
          "code": null,
          "status": "HEALTHY"
        },
        "connectionStatus": {
          "code": "NETWORK",
          "status": "HEALTHY"
        },
        "hardwareStatus": {
          "code": null,
          "devices": null,
          "status": "HEALTHY"
        },
        "state": "RUNNING_JOB",
        "lastCheckin": now,
        "version": {
          "App": "0.0.3.240",
          "Firmware": "5.12.2.240"
        }
      }
    ]);
  });

  app.get('/itemsense/control/v1/jobs/show', (req, res) => {
    const now = new Date().toISOString();
    res.json({
      array:
        [{
          id: '12e1kj12e',
          status: 'RUNNING',
          readerName: ['SpeedwayR-00-00-01', 'SpeedwayR-00-00-02'],
          failedReaderName: [],
          creationTime: now,
          lastActivity: now,
          activityDuration: Math.floor(Math.random() * 1000),
          errorOccured: false,
          errors: [],
          maxErrors: 5,
          stopReason: '',
          facilities: ['Lake Charles'],
          job: {},
          instanceMetadata: {},
          lastHeartbeatTime: now,
          startAttempts: 1
        }]
    });
  });
};
