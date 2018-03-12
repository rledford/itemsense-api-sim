const http = require('http');
const express = require('express');
const app = express();

const port = 3000;

require('./startup');
require('./routes')(app);

app.listen(port, () => console.log('listing on port', port));
/*
const server = http.createServer((req, res) => {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/plain');
	res.end('ItemSense Simulator');
});


server.listen({port}, () => {
	console.log('listening on port:', port);
});
*/
