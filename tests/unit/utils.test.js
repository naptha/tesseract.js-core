const loadTrainedDataFromRemote = require('./utils/loadTrainedDataFromRemote');

describe('loadTrainedDataFromRemote', () => {
  test('load 1 lang', () => {
    expect.assertions(2);
    return loadTrainedDataFromRemote('slk_frak')
      .then((langs) => {
        expect(langs.length).toBe(1);
        expect(langs[0].length).not.toBe(0);
      });
  });

  test('load 2 langs', () => {
    expect.assertions(3);
    return loadTrainedDataFromRemote('slk_frak+fas')
      .then((langs) => {
        expect(langs.length).toBe(2);
        expect(langs[0].length).not.toBe(0);
        expect(langs[1].length).not.toBe(0);
      });
  });

  test('load 3 langs', () => {
    expect.assertions(4);
    return loadTrainedDataFromRemote('slk_frak+fas+mri')
      .then((langs) => {
        expect(langs.length).toBe(3);
        expect(langs[0].length).not.toBe(0);
        expect(langs[1].length).not.toBe(0);
        expect(langs[2].length).not.toBe(0);
      });
  });
});
