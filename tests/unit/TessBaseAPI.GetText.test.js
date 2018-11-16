const expect = require('expect.js');
const duplicateIt = require('./utils/duplicateIt');
const loadLang = require('../../src/utils/loadLang');
const readImage = require('../../src/utils/readImage');
const { LANG_URI } = require('../config.json');
const testocr = require('./assets/data/testocr.json');
const small = require('./assets/data/small.json');

const genGetTextCase = (path, expects) => TesseractCore => (done) => {
  TesseractCore().then((TessModule) => {
    const api = new TessModule.TessBaseAPI();
    const langs = 'eng';
    loadLang({
      langs,
      tessModule: TessModule,
      langURI: LANG_URI,
      cachePath: './tests/traineddata',
    })
      .then((dataList) => {
        const { data } = readImage(TessModule, path);
        api.Init(null, langs);
        api.SetImage(data);
        expect(dataList.length).to.be(1);
        expects(api);
        api.End();
        TessModule.destroy(api);
        TessModule._free(data);
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
