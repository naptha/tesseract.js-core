const fs = require('fs');
const { readImage } = require('tesseract.js-utils');
const TesseractCore = require('../../../tesseract-core-simd');

TesseractCore().then(async (TessModule) => {
  const lang = 'eng';
  const api = new TessModule.TessBaseAPI();
  const buf = fs.readFileSync(`../../../tests/traineddata/${lang}.traineddata`);

  const image = fs.readFileSync('../../data/tyger.jpg');
  const { pix } = readImage(TessModule, image);

  TessModule.FS.writeFile(`${lang}.traineddata`, buf);

  api.Init(null, lang);

  let time1 = Date.now();
  for (let i=0; i<10; i++) {
    api.SetImage(pix);
    api.GetUTF8Text();
  }
  let time2 = Date.now();
  console.log("GetUTF8Text runtime: " + (time2 - time1) / 1e3 + "s");

  api.End();
  TessModule.destroy(api);
  TessModule._free(pix);
});
