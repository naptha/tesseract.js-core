const expect = require('expect.js');
const TesseractCoreASM = require('../../tesseract-core.asm');
const TesseractCoreWASM = require('../../tesseract-core.wasm');
const loadLang = require('../../src/utils/loadLang');
const {
  LANG_URI,
  ONE_LANG,
  TWO_LANGS,
  THREE_LANGS,
} = require('../config.json');

const getLangOptions = langs => options => ({
  langs,
  langURI: LANG_URI,
  ...options,
});

const loadOneLanguage = TesseractCore => (done) => {
  TesseractCore().then((TessModule) => {
    const api = new TessModule.TessBaseAPI();
    const langs = ONE_LANG;
    return loadLang(getLangOptions(langs)({
      tessModule: TessModule,
    }))
      .then((dataList) => {
        api.Init(null, langs);
        expect(dataList.length).to.be(1);
        expect(dataList[0].length).not.to.be(0);
        expect(api.GetInitLanguagesAsString()).to.be(langs);
        api.End();
        done();
      });
  });
};

const loadTwoLanguages = TesseractCore => (done) => {
  TesseractCore().then((TessModule) => {
    const api = new TessModule.TessBaseAPI();
    const langs = TWO_LANGS;
    return loadLang(getLangOptions(langs)({
      tessModule: TessModule,
    }))
      .then((dataList) => {
        api.Init(null, langs);
        expect(dataList.length).to.be(2);
        expect(dataList[0].length).not.to.be(0);
        expect(dataList[1].length).not.to.be(0);
        expect(api.GetInitLanguagesAsString()).to.be(langs);
        api.End();
        done();
      });
  });
};

const loadThreeLanguages = TesseractCore => (done) => {
  TesseractCore().then((TessModule) => {
    const api = new TessModule.TessBaseAPI();
    const langs = THREE_LANGS;
    return loadLang(getLangOptions(langs)({
      tessModule: TessModule,
    }))
      .then((dataList) => {
        api.Init(null, langs);
        expect(dataList.length).to.be(3);
        expect(dataList[0].length).not.to.be(0);
        expect(dataList[1].length).not.to.be(0);
        expect(dataList[2].length).not.to.be(0);
        expect(api.GetInitLanguagesAsString()).to.be(langs);
        api.End();
        done();
      });
  });
};

describe('TessBaseAPI.Init', () => {
  it(
    'ASM: loads 1 language',
    loadOneLanguage(TesseractCoreASM),
  ).timeout(5000);

  it(
    'WASM: loads 1 language',
    loadOneLanguage(TesseractCoreWASM),
  ).timeout(5000);

  it(
    'ASM: loads 2 languages',
    loadTwoLanguages(TesseractCoreASM),
  ).timeout(5000);

  it(
    'WASM: loads 2 languages',
    loadTwoLanguages(TesseractCoreWASM),
  ).timeout(5000);

  it(
    'ASM: loads 3 languages',
    loadThreeLanguages(TesseractCoreASM),
  ).timeout(5000);

  it(
    'WASM: loads 3 languages',
    loadThreeLanguages(TesseractCoreWASM),
  ).timeout(5000);
});
