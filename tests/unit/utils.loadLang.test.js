const expect = require('expect.js');
const loadLang = require('../../src/utils/loadLang');
const {
  LANG_URI,
} = require('../config.json');
const {
  ONE_LANG,
  TWO_LANGS,
  THREE_LANGS,
} = require('./assets/data/lang.json');

describe('utils.loadLang', () => {
  it(`load 1 lang from ${LANG_URI}`, (done) => {
    loadLang({ langs: ONE_LANG, langURI: LANG_URI })
      .then((langs) => {
        expect(langs.length).to.be(1);
        expect(langs[0].length).not.to.be(0);
        done();
      });
  }).timeout(60000);

  it(`load 2 langs from ${LANG_URI}`, (done) => {
    loadLang({ langs: TWO_LANGS, langURI: LANG_URI })
      .then((langs) => {
        expect(langs.length).to.be(2);
        expect(langs[0].length).not.to.be(0);
        expect(langs[1].length).not.to.be(0);
        done();
      });
  }).timeout(60000);

  it(`load 3 langs from ${LANG_URI}`, (done) => {
    loadLang({ langs: THREE_LANGS, langURI: LANG_URI })
      .then((langs) => {
        expect(langs.length).to.be(3);
        expect(langs[0].length).not.to.be(0);
        expect(langs[1].length).not.to.be(0);
        expect(langs[2].length).not.to.be(0);
        done();
      });
  }).timeout(60000);
});
