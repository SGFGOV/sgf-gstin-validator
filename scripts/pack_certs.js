'use strict';

var fs = require('fs');
var path = require('path');

var resourcesDir = './resources';
var certs = {};

var files = fs.readdirSync(resourcesDir);
files.forEach(function(f) {
  if (!f.endsWith('.pem')) return;
  var cert = fs.readFileSync(path.join(resourcesDir, f));
  certs[f.replace('.pem', '')] = cert.toString('base64');
});

fs.writeFileSync(
  './src/certs.js',
  '\'use strict\';\nmodule.exports = ' + JSON.stringify(certs, null, 2) + ';'
);
