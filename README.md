# GSTIN Validator

* Validates GSTIN number for length (15 digits), format (State code, PAN, Entity Number, Z, Checksum) and checksum as per the algorithm published at [GSTN portal](http://developer.gstsystem.co.in/pages/apiportal/data/gsp/download/GSTIN_Validation_SampleCode.zip)

![build](https://gitlab.com/srikanthlogic/gstin-validator/badges/master/pipeline.svg)
![coverage](https://gitlab.com/srikanthlogic/gstin-validator/badges/master/coverage.svg)
![npm](https://img.shields.io/npm/dw/gstin-validator.svg)
![Codacy Badge](https://app.codacy.com/project/badge/Grade/c79bc07895854d29ba0b42262ffd0e10)(https://www.codacy.com/manual/srikanthlogic/gstin-validator)

## Installation 

    npm install gstin-validator

## Use

    var validator = require('gstin-validator');
    validator.isValidGSTNumber('12AAACI1681G1Z0');
	validator.ValidateGSTIN('47AAACI1681G1Z0');
	validator.getGSTINInfo('12AAACI1681G1Z0');

## Test

    npm test
	npm run test-coverage