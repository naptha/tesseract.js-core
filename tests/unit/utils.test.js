const expect = require('expect.js');
const loadLang = require('../../src/utils/loadLang');
const {
  LANG_URI,
  ONE_LANG,
  TWO_LANGS,
  THREE_LANGS,
} = require('../config.json');

describe('loadLang', () => {
  it('load 1 lang', (done) => {
    loadLang({ langs: ONE_LANG, langURI: LANG_URI })
      .then((langs) => {
        expect(langs.length).to.be(1);
        expect(langs[0].length).not.to.be(0);
        done();
      });
  });

  it('load 2 langs', (done) => {
    loadLang({ langs: TWO_LANGS, langURI: LANG_URI })
      .then((langs) => {
        expect(langs.length).to.be(2);
        expect(langs[0].length).not.to.be(0);
        expect(langs[1].length).not.to.be(0);
        done();
      });
  });

  it('load 3 langs', (done) => {
    loadLang({ langs: THREE_LANGS, langURI: LANG_URI })
      .then((langs) => {
        expect(langs.length).to.be(3);
        expect(langs[0].length).not.to.be(0);
        expect(langs[1].length).not.to.be(0);
        expect(langs[2].length).not.to.be(0);
        done();
      });
  }).timeout(4000);
});
