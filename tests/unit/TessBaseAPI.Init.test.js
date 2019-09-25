const expect = require('expect.js');
const { loadLang } = require('tesseract.js-utils');
const duplicateIt = require('./utils/duplicateIt');
const {
  LANG_URI,
} = require('../config.json');
const {
  ONE_LANG,
  TWO_LANGS,
  THREE_LANGS,
} = require('./assets/data/lang.json');

const getLangOptions = langs => options => ({
  langs,
  langPath: LANG_URI,
  cachePath: './tests/traineddata',
  ...options,
});

const loadLangCases = {
  'init with 1 langauge': TesseractCore => (done) => {
    TesseractCore().then((TessModule) => {
      const api = new TessModule.TessBaseAPI();
      const langs = ONE_LANG;
      loadLang(getLangOptions(langs)({
        TessModule,
      }))
        .then((dataList) => {
          api.Init(null, langs);
          expect(dataList.length).to.be(1);
          expect(dataList[0].length).not.to.be(0);
          expect(api.GetInitLanguagesAsString()).to.be(langs);
          api.End();
          TessModule.destroy(api);
          done();
        });
    });
  },
  'init with 1 langauge and customized path': TesseractCore => (done) => {
    TesseractCore().then((TessModule) => {
      const api = new TessModule.TessBaseAPI();
      const langs = ONE_LANG;
      loadLang(getLangOptions(langs)({
        TessModule,
        dataPath: 'traineddata',
      }))
        .then((dataList) => {
          api.Init('traineddata', langs);
          expect(dataList.length).to.be(1);
          expect(dataList[0].length).not.to.be(0);
          expect(api.GetInitLanguagesAsString()).to.be(langs);
          api.End();
          TessModule.destroy(api);
          done();
        });
    });
  },
  'init with 2 langauages': TesseractCore => (done) => {
    TesseractCore().then((TessModule) => {
      const api = new TessModule.TessBaseAPI();
      const langs = TWO_LANGS;
      loadLang(getLangOptions(langs)({
        TessModule,
      }))
        .then((dataList) => {
          api.Init(null, langs);
          expect(dataList.length).to.be(2);
          expect(dataList[0].length).not.to.be(0);
          expect(dataList[1].length).not.to.be(0);
          expect(api.GetInitLanguagesAsString()).to.be(langs);
          api.End();
          TessModule.destroy(api);
          done();
        });
    });
  },
  'init with 2 langauages and customized path': TesseractCore => (done) => {
    TesseractCore().then((TessModule) => {
      const api = new TessModule.TessBaseAPI();
      const langs = TWO_LANGS;
      loadLang(getLangOptions(langs)({
        TessModule,
        dataPath: 'traineddata',
      }))
        .then((dataList) => {
          api.Init('traineddata', langs);
          expect(dataList.length).to.be(2);
          expect(dataList[0].length).not.to.be(0);
          expect(dataList[1].length).not.to.be(0);
          expect(api.GetInitLanguagesAsString()).to.be(langs);
          api.End();
          TessModule.destroy(api);
          done();
        });
    });
  },
  'init with 3 languages': TesseractCore => (done) => {
    TesseractCore().then((TessModule) => {
      const api = new TessModule.TessBaseAPI();
      const langs = THREE_LANGS;
      loadLang(getLangOptions(langs)({
        TessModule,
      }))
        .then((dataList) => {
          api.Init(null, langs);
          expect(dataList.length).to.be(3);
          expect(dataList[0].length).not.to.be(0);
          expect(dataList[1].length).not.to.be(0);
          expect(dataList[2].length).not.to.be(0);
          expect(api.GetInitLanguagesAsString()).to.be(langs);
          api.End();
          TessModule.destroy(api);
          done();
        });
    });
  },
  'init with 3 languages and customized path': TesseractCore => (done) => {
    TesseractCore().then((TessModule) => {
      const api = new TessModule.TessBaseAPI();
      const langs = THREE_LANGS;
      loadLang(getLangOptions(langs)({
        TessModule,
        dataPath: 'traineddata',
      }))
        .then((dataList) => {
          api.Init('traineddata', langs);
          expect(dataList.length).to.be(3);
          expect(dataList[0].length).not.to.be(0);
          expect(dataList[1].length).not.to.be(0);
          expect(dataList[2].length).not.to.be(0);
          expect(api.GetInitLanguagesAsString()).to.be(langs);
          api.End();
          TessModule.destroy(api);
          done();
        });
    });
  },
};


describe('TessBaseAPI.Init', () => {
  Object.keys(loadLangCases).forEach((key) => {
    duplicateIt(key, loadLangCases[key], { timeout: 30000 });
  });
});
