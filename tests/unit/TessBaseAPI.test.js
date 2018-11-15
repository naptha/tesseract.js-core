const TessModuleASM = require('../../tesseract-core.asm')();
const loadTrainedDataFromRemote = require('./utils/loadTrainedDataFromRemote');

describe('TessBaseAPI.Init', () => {
  test('Init', () => {
    const api = new TessModuleASM.TessBaseAPI();
    return loadTrainedDataFromRemote('eng', TessModuleASM)
      .then(() => {
        api.Init(null, 'eng');
        expect(api.GetInitLanguagesAsString()).toBe('eng');
      });
  });
});
