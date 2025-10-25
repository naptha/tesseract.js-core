const expect = require('expect.js');
const fs = require('fs');
const path = require('path');
const duplicateIt = require('./utils/duplicateIt');

const testocr = {
  width: 640,
  height: 480,
  text: 'This is a lot of 12 point text to test the\nocr code and see if it works on all types\nof file format.\n\nThe quick brown dog jumped over the\nlazy fox. The quick brown dog jumped\nover the lazy fox. The quick brown dog\njumped over the lazy fox. The quick\nbrown dog jumped over the lazy fox.\n',
};

const small = {
  width: 320,
  height: 180,
  text: 'Tesseract.js\n',
};

const genGetTextCase = (imagePath, expects) => (TesseractCore) => (done) => {
  TesseractCore().then((TessModule) => {
    const api = new TessModule.TessBaseAPI();
    const lang = 'eng';

    const dataPath = path.resolve(__dirname, `../traineddata/${lang}.traineddata`);
    const buf = fs.readFileSync(dataPath);
    TessModule.FS.writeFile(`${lang}.traineddata`, buf);

    const fileBuf = fs.readFileSync(imagePath);
    TessModule.FS.writeFile('/input', fileBuf);
    api.Init(null, lang);
    api.SetImageFile();
    expects(api);
    api.End();
    TessModule.destroy(api);
    done();
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
