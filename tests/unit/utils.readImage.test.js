const expect = require('expect.js');
const fs = require('fs');
const readImage = require('../../src/utils/readImage');
const duplicateIt = require('./utils/duplicateIt');
const testocr = require('./assets/data/testocr.json');

process.setMaxListeners(Infinity);

const formats = ['jpg', 'pbm', 'png'];

const loadImageCases = {};

formats.forEach((format) => {
  loadImageCases[`read ${format} format`] = TesseractCore => (done) => {
    TesseractCore().then((TessModule) => {
      const buf = fs.readFileSync(`./tests/unit/assets/images/testocr.${format}`);
      const { w, h, data } = readImage(TessModule, buf);
      expect(w).to.be(testocr.width);
      expect(h).to.be(testocr.height);
      TessModule._free(data);
      done();
    });
  };
});

describe('utils.loadImage', () => {
  Object.keys(loadImageCases).forEach((key) => {
    duplicateIt(key, loadImageCases[key], { timeout: 3000 });
  });
});
