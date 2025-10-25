const expect = require('expect.js');
const fs = require('fs');
const path = require('path');

const duplicateIt = require('./utils/duplicateIt');

const loadLangCases = {
  'init with 1 langauge': (TesseractCore) => (done) => {
    TesseractCore().then((TessModule) => {
      const api = new TessModule.TessBaseAPI();
      const lang1 = 'slk_frak';
      const buf = fs.readFileSync(path.resolve(__dirname, `../traineddata/${lang1}.traineddata`));

      TessModule.FS.writeFile(`${lang1}.traineddata`, buf);
      const langs = lang1;

      api.Init(null, langs);
      expect(api.GetInitLanguagesAsString()).to.be(langs);
      api.End();
      TessModule.destroy(api);
      done();
    });
  },
  'init with 2 langauges': (TesseractCore) => (done) => {
    TesseractCore().then((TessModule) => {
      const api = new TessModule.TessBaseAPI();
      const lang1 = 'slk_frak';
      const buf = fs.readFileSync(path.resolve(__dirname, `../traineddata/${lang1}.traineddata`));
      TessModule.FS.writeFile(`${lang1}.traineddata`, buf);
      const lang2 = 'fas';
      const buf2 = fs.readFileSync(path.resolve(__dirname, `../traineddata/${lang2}.traineddata`));
      TessModule.FS.writeFile(`${lang2}.traineddata`, buf2);
      const langs = `${lang1}+${lang2}`;

      api.Init(null, langs);
      expect(api.GetInitLanguagesAsString()).to.be(langs);
      api.End();
      TessModule.destroy(api);
      done();
    });
  },
  'init with 3 langauges': (TesseractCore) => (done) => {
    TesseractCore().then((TessModule) => {
      const api = new TessModule.TessBaseAPI();
      const lang1 = 'slk_frak';
      const buf = fs.readFileSync(path.resolve(__dirname, `../traineddata/${lang1}.traineddata`));
      TessModule.FS.writeFile(`${lang1}.traineddata`, buf);
      const lang2 = 'fas';
      const buf2 = fs.readFileSync(path.resolve(__dirname, `../traineddata/${lang2}.traineddata`));
      TessModule.FS.writeFile(`${lang2}.traineddata`, buf2);
      const lang3 = 'mri';
      const buf3 = fs.readFileSync(path.resolve(__dirname, `../traineddata/${lang3}.traineddata`));
      TessModule.FS.writeFile(`${lang3}.traineddata`, buf3);
      const langs = `${lang1}+${lang2}+${lang3}`;

      api.Init(null, langs);
      expect(api.GetInitLanguagesAsString()).to.be(langs);
      api.End();
      TessModule.destroy(api);
      done();
    });
  },
};

describe('TessBaseAPI.Init', () => {
  Object.keys(loadLangCases).forEach((key) => {
    duplicateIt(key, loadLangCases[key], { timeout: 30000 });
  });
});
