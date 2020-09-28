"use strict";

const fs = require("fs");
const path = require("path");

const resourcesDir = "./resources";
const certs = {};

const files = fs.readdirSync(resourcesDir);
files.forEach((f) => {
  if (!f.endsWith(".pem")) return;
  const cert = fs.readFileSync(path.join(resourcesDir, f));
  certs[f] = cert.toString("base64");
});

fs.writeFileSync(
  "./src/certs.js",
  `'use strict';\nexports.certs = ${JSON.stringify(certs, null, 2)};`
);
