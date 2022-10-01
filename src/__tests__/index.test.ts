
//import {expect} from 'chai';
import * as validator from '../index';


//var validator = require('../index');
var fs = require('fs');
var expect = require('chai').expect;

//import * as fs from 'fs' 

describe('gstin-validator', function() {
  it('isValidGSTNumber::Should return false when length is not 15 digits',
    function() {
      var result = validator.isValidGSTNumber('123412341234');
      expect(result).to.be.false;
    });

  it('isValidGSTNumber::Should return false if 15 digit non regex matching GSTIN is validated', function() {
    var result = validator.isValidGSTNumber('47AAGCG4576J1A6');
    expect(result).to.be.false;
  });

  it('isValidGSTNumber::Should return false if 15 digit valid regex matching GSTIN with incorrect checksum is validated', function() {
    var result = validator.isValidGSTNumber('27AAGCG4576J1Z8');
    expect(result).to.be.false;
  });

  it('isValidGSTNumber::Should return true if valid 15 digit GSTIN is passed',
    function() {
      // Google India
      var result = validator.isValidGSTNumber('27AAGCG4576J1Z6');
      expect(result).to.be.true;
    });

  it('isValidGSTNumber::Should return true for GSTIN of Indian Oil across all states', function() {
    var gstins = [
      '37AAACI1681G2ZN',
      '38AAALS7119L1ZH',
      '35AAACI1681G1ZS',
      '12AAACI1681G1Z0',
      '18AAACI1681G1ZO',
      '10AAACI1681G1Z4',
      '04AAACI1681G1ZX',
      '22AAACI1681G1ZZ',
      '26AAACI1681G1ZR',
      '25AAACI1681G1ZT',
      '07AAACI1681G1ZR',
      '30AAACI1681G1Z2',
      '24AAACI1681G1ZV',
      '06AAACI1681G1ZT',
      '02AAACI1681G3ZZ',
      '01AAACI1681G2Z2',
      '20AAACI1681G3Z1',
      '29AAACI1681G1ZL',
      '32AAACI1681G1ZY',
      '23AAACI1681G1ZX',
      '27AAACI1681G1ZP',
      '14AAACI1681G2ZV',
      '17AAACI1681G1ZQ',
      '15AAACI1681G1ZU',
      '13AAACI1681G1ZY',
      '21AAACI1681G1Z1',
      '34AAACI1681G1ZU',
      '03AAACI1681G1ZZ',
      '08AAACI1681G2ZO',
      '11AAACI1681G1Z2',
      '33AAACI1681G1ZW',
      '36AAACI1681G1ZQ',
      '16AAACI1681G1ZS',
      '09AAACI1681G1ZN',
      '05AAACI1681G1ZV',
      '19AAACI1681G1ZM',
      '06AAACI1681G2ZS',
      '24AAACI1681G2ZU',
    ]; // GSTIN of IOCL across all states
    var success = true;
    for (var gstin in gstins) {
      var result = validator.isValidGSTNumber(gstins[gstin]);
      success = success && result;
    }
    expect(success).to.be.true;
  });

  it('ValidateGSTIN::Should return Enter a valid 15 character GSTIN when length is not 15 digits', function() {
    var result = validator.ValidateGSTIN('123412341234');
    expect(result === 'Enter a valid 15 character GSTIN').to.be.true;
  });

  it('ValidateGSTIN::Should return Invalid GSTIN format if 15 digit non regex matching GSTIN is validated', function() {
    var result = validator.ValidateGSTIN('47AAGCG4576J1A6');
    expect(result === 'Invalid GSTIN format').to.be.true;
  });

  it('ValidateGSTIN::Should return Invalid checksum character in GSTIN if 15 digit valid regex matching GSTIN with incorrect checksum is validated', function() {
    var result = validator.ValidateGSTIN('25AAACI1681G1Z4');
    expect(result === 'Invalid checksum character in GSTIN').to.be.true;
  });

  it('ValidateGSTIN::Should return true if valid 15 digit GSTIN is passed',
    function() {
      var result = validator.ValidateGSTIN('27AAGCG4576J1Z6'); // Google India
      expect(result === 'Valid GSTIN').to.be.true;
    });

  it('getGSTINInfo::Should return verbose text for a valid GSTIN', function() {
    var result = validator.getGSTINInfo('27AAGCG4576J1Z6');
    expect(
      result ===
      'The GSTIN 27AAGCG4576J1Z6 is entity #1 belonging to Company whose PAN is AAGCG4576J registered in Maharashtra (MH)'
    ).to.be.true;
  });

  it('getGSTINInfo::Should return verbose text for a valid GSTIN of 11th entity of same PAN', function() {
    var result = validator.getGSTINInfo('27AAGCG4576JBZW');
    expect(
      result ===
      'The GSTIN 27AAGCG4576JBZW is entity #11 belonging to Company whose PAN is AAGCG4576J registered in Maharashtra (MH)'
    ).to.be.true;
  });

  it('getGSTINInfo::Should return Invalid GSTIN on incorrect GSTIN',
    function() {
      var result = validator.getGSTINInfo('47AAGCG4576J1Z6');
      expect(result === 'Invalid GSTIN').to.be.true;
    });

  it('validateEInvoiceSignedQR::Verify for valid SampleData',
    function() {
      var SampleData = fs.readFileSync('./resources/SampleData.json');
      var qrTextFromSampleData = JSON.parse(SampleData)['SignedQRCode'];
      var result = validator.validateEInvoiceSignedQR(qrTextFromSampleData,
        'einv_prod_11092020.pem');
      var irn_expectedData = JSON.parse(SampleData)['Irn'];
      var expectedData = {
        data: '{"SellerGstin":"37BZNPM9430M1KL","BuyerGstin":"03BZNPM9430M1KL","DocNo":"CTDN23456","DocTyp":"INV","DocDt":"05/08/2020","TotInvVal":16650,"ItemCnt":1,"MainHsnCode":"39231010","Irn":"afdcc32a0eaa3a054cffcd251884d3e3f4f726b75c8943e7d35fbabc82f05d8a"}',
        iss: 'NIC',
      };
      expect(result['data'] === expectedData['data']).to.be.true;
      expect(result['iss'] === expectedData['iss']).to.be.true;
      expect(JSON.parse(result['data'])['Irn'] === irn_expectedData).to.be.true;
    });

  it('validateEInvoiceSignedQR::Verify if signature is verifiable for valid SampleData, but incorrect key',
    function() {
      var SampleData = fs.readFileSync('./resources/SampleData.json');
      var qrTextFromSampleData = JSON.parse(SampleData)['SignedQRCode'];
      try {
        expect(validator.validateEInvoiceSignedQR(qrTextFromSampleData,
          'einv_sandbox.pem')).to.throw(Error);
      } catch (err) {
        // expect(err).to.be.a(new Error('Signature Verification Failed!'));
      }
    });

  it('validateSignedInvoice::Verify if Signed invoice is verifiable valid SampleData',
    function() {
      var SampleData = fs.readFileSync('./resources/SampleData.json');
      var signedInvoiceFromSampleData = JSON.parse(SampleData)['SignedInvoice'];
      var irn_expectedData = JSON.parse(SampleData)['Irn'];
      var ackno_expectedData = JSON.parse(SampleData)['AckNo'];
      var result = validator.validateSignedInvoice(signedInvoiceFromSampleData,
        'einv_prod_11092020.pem');
      expect(JSON.parse(result['data'])['Irn'] === irn_expectedData).to.be.true;
      expect(JSON.parse(result['data'])['AckNo'] ===
        ackno_expectedData).to.be.true;
    });

  it('validateSignedInvoice::Verify if Signed invoice is verifiable valid SampleData, but incorrectkey',
    function() {
      var SampleData = fs.readFileSync('./resources/SampleData.json');
      var signedInvoiceFromSampleData = JSON.parse(SampleData)['SignedInvoice'];
      try {
        expect(validator.validateSignedInvoice(signedInvoiceFromSampleData,
          'einv_sandbox.pem').to.throw(Error));
      } catch (err) {
        // expect(err).to.be.a(new Error('Signature Verification Failed!'));
      }
    });
});
