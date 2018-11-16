const expect = require('expect.js');
const duplicateIt = require('./utils/duplicateIt');
const loadLang = require('../../src/utils/loadLang');
const getTextResult = require('../../src/utils/getTextResult');
const readImage = require('../../src/utils/readImage');
const { LANG_URI } = require('../config.json');
const testocr = require('./assets/data/testocr.json');

const getUTF8TextCases = {
  'read image and get text': TesseractCore => (done) => {
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
          api.Init(null, langs);
          const { data } = readImage(TessModule, './tests/unit/assets/images/testocr.png');
          const text = getTextResult(api, data);
          expect(dataList.length).to.be(1);
          expect(text).to.be(testocr.text);
          api.End();
          TessModule.destroy(api);
          TessModule._free(data);
          done();
        });
    });
  },
};

describe('TessBaseAPI.GetUTF8Text', () => {
  Object.keys(getUTF8TextCases).forEach((key) => {
    duplicateIt(key, getUTF8TextCases[key], { timeout: 60000 });
  });
});
