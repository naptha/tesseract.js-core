const expect = require('expect.js');
const loadTrainedDataFromRemote = require('./utils/loadTrainedDataFromRemote');

describe('loadTrainedDataFromRemote', () => {
  it('load 1 lang', () => (
    loadTrainedDataFromRemote('slk_frak')
      .then((langs) => {
        expect(langs.length).to.be(1);
        expect(langs[0].length).not.to.be(0);
      })
  ));

  it('load 2 langs', () => (
    loadTrainedDataFromRemote('slk_frak+fas')
      .then((langs) => {
        expect(langs.length).to.be(2);
        expect(langs[0].length).not.to.be(0);
        expect(langs[1].length).not.to.be(0);
      })
  ));

  it('load 3 langs', () => (
    loadTrainedDataFromRemote('slk_frak+fas+mri')
      .then((langs) => {
        expect(langs.length).to.be(3);
        expect(langs[0].length).not.to.be(0);
        expect(langs[1].length).not.to.be(0);
        expect(langs[2].length).not.to.be(0);
      })
  ));
});
