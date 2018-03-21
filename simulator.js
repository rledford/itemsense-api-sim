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

    if (!query.pageSize) {
      query.pageSize = 100;
    } else {
      query.pageSize = Number.parseInt(query.pageSize);
    }

    if (query.pageMarker) {
      query.pageMarker = Number.parseInt(query.pageMarker);
    }

    if (query.pageSize < data.items.length) {
      let index = 0;
      if (query.pageMarker) {
        index = query.pageSize * query.pageMarker
      }

      if (index + query.pageSize - 1 < data.items.length) {
        data.nextPageMarker = query.pageMarker ? query.pageMarker++ : 1;
      }

      data.items = data.items.slice(index, index + query.pageSize);
    }

    return data;
  }
}

var simulator = new Simulator();

simulator.start();

exports.simulator = simulator;
