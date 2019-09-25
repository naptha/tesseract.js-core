const expect = require('expect.js');
const fs = require('fs');
const { loadLang, readImage } = require('tesseract.js-utils');
const duplicateIt = require('./utils/duplicateIt');
const { LANG_URI } = require('../config.json');
const testocr = require('./assets/data/testocr.json');
const small = require('./assets/data/small.json');

const genGetTextCase = (path, expects) => TesseractCore => (done) => {
  TesseractCore().then((TessModule) => {
    const api = new TessModule.TessBaseAPI();
    const langs = 'eng';
    loadLang({
      langs,
      TessModule,
      langPath: LANG_URI,
      cachePath: './tests/traineddata',
    })
      .then((dataList) => {
        const buf = fs.readFileSync(path);
        const { pix } = readImage(TessModule, buf);
        api.Init(null, langs);
        api.SetImage(pix);
        expect(dataList.length).to.be(1);
        expects(api);
        api.End();
        TessModule.destroy(api);
        TessModule._free(pix);
        done();
      });
  });
};

const getTextCases = {
  'GetUTF8Text from small image': genGetTextCase(
    './tests/unit/assets/images/small.png',
    (api) => {
      const text = api.GetUTF8Text();
      expect(text).to.be(small.text);
    },
  ),
  'GetUTF8Text from large image': genGetTextCase(
    './tests/unit/assets/images/testocr.png',
    (api) => {
      const text = api.GetUTF8Text();
      expect(text).to.be(testocr.text);
    },
  ),
  'GetHOCRText from small image': genGetTextCase(
    './tests/unit/assets/images/small.png',
    (api) => {
      const text = api.GetHOCRText(0);
      expect(text).to.contain('Tesseract');
      expect(text).to.contain("<div class='ocr_page'");
    },
  ),
  'GetHOCRText from large image': genGetTextCase(
    './tests/unit/assets/images/testocr.png',
    (api) => {
      const text = api.GetHOCRText(0);
      expect(text).to.contain('fox');
      expect(text).to.contain("<div class='ocr_page'");
    },
  ),
};

describe('TessBaseAPI.GetText', () => {
  Object.keys(getTextCases).forEach((key) => {
    duplicateIt(key, getTextCases[key], { timeout: 60000 });
  });
});
