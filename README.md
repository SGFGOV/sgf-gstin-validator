# GSTIN Validator

* Validates GSTIN number for length (15 digits), format (State code, PAN, Entity Number, Z, Checksum) and checksum as per the algorithm published at [GSTN portal](http://developer.gstsystem.co.in/pages/apiportal/data/gsp/download/GSTIN_Validation_SampleCode.zip)
* Verifies [Signed QR of eInvoices](https://einvoice1.gst.gov.in/Documents/Qrcode_procedure.pdf) and returns invoice data of both signed QR of e-invoice as well as signed e-invoice data.

![build](https://gitlab.com/srikanthlogic/gstin-validator/badges/master/pipeline.svg)
![coverage](https://gitlab.com/srikanthlogic/gstin-validator/badges/master/coverage.svg)
![npm](https://img.shields.io/npm/dw/gstin-validator.svg)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/c79bc07895854d29ba0b42262ffd0e10)](https://www.codacy.com/manual/srikanthlogic/gstin-validator)
[![Gitpod ready-to-code](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/#https://gitlab.com/srikanthlogic/gstin-validator)

## Installation 

```sh
  npm install gstin-validator
```
## Use

```node
  var validator = require('gstin-validator');
  validator.isValidGSTNumber('12AAACI1681G1Z0');
  validator.ValidateGSTIN('47AAACI1681G1Z0');
  validator.getGSTINInfo('12AAACI1681G1Z0');
  validator.validateSignedInvoice('SignedInvoiceString');
  validator.validateEInvoiceSignedQR('SignedQROfEInvoice');
```

## Test

```sh
  npm test
  npm run test-coverage
```