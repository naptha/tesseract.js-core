const expect = require('expect.js');
const TessModuleASM = require('../../tesseract-core.asm')();
const loadTrainedDataFromRemote = require('./utils/loadTrainedDataFromRemote');

describe('TessBaseAPI.Init', () => {
  it('Init', () => {
    const api = new TessModuleASM.TessBaseAPI();
    return loadTrainedDataFromRemote('eng', TessModuleASM)
      .then((dataList) => {
        api.Init(null, 'eng');
        expect(dataList.length).to.be(1);
        expect(dataList[0].length).not.to.be(0);
        expect(api.GetInitLanguagesAsString()).to.be('eng');
      });
  }).timeout(10000);
});
