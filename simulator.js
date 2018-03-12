const fs = require('fs');
const data = JSON.parse(
  fs.readFileSync('./settings.json', { encoding: 'utf-8' })
);

class Simulator {
  constructor() {
    (this.epcs = {}), (this.zones = {});
  }

  start() {
    (this.epcs = data.epcs || {}), (this.zones = data.zones || {});
  }

  getRandomZone() {
    const index = Math.floor(Math.random() * this.zones.length);
    return this.zones[index] || 'ABSENT';
  }

  showItems(query) {
    let epcs = this.epcs.slice();
    if (query.epcPrefix) {
      epcs = epcs.filter(epc => {
        return epc.startsWith(query.epcPrefix);
      });
    }

    const data = {};
    data.nextPageMarker = null;
    data.items = epcs.map(epc => {
      return {
        jobId: 'xxxxxxx-xxx-xxx-xxx-xxxxxxxxxxxx',
        lastModifiedTime: new Date().toISOString(),
        tagId: '',
        zone: this.getRandomZone(),
        epc: epc,
        presenceConfidence: 'HIGH'
      };
    });

    return data;
  }
}

var simulator = new Simulator();

simulator.start();

exports.simulator = simulator;
