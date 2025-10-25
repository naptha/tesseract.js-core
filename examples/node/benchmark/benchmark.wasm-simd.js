const fs = require('fs');
const path = require('path');
const TesseractCore = require('../../../tesseract-core-simd');

TesseractCore().then(async (TessModule) => {
  const lang = 'eng';
  const api = new TessModule.TessBaseAPI();
  const buf = fs.readFileSync(path.resolve(__dirname, `../../../tests/traineddata/${lang}.traineddata`));
  TessModule.FS.writeFile(`${lang}.traineddata`, buf);
  api.Init(null, lang);

  const fileArr = [path.resolve(__dirname, '../../data/meditations.jpg'), path.resolve(__dirname, '../../data/tyger.jpg'), path.resolve(__dirname, '../../data/testocr.png')];
  let timeTotal = 0;
  for (let i = 0; i < fileArr.length; i++) {
    const file = fileArr[i];
    const fileBuf = fs.readFileSync(file);
    TessModule.FS.writeFile('/input', fileBuf);

    api.SetImageFile();
    const time1 = Date.now();
    for (let j = 0; j < 10; j++) {
      api.SetImageFile();
      const text = api.GetUTF8Text();
    }
    const time2 = Date.now();
    const timeDif = (time2 - time1) / 1e3;
    timeTotal += timeDif;

    console.log(`${file} [x10] runtime: ${timeDif}s`);
  }

  console.log(`Total runtime: ${timeTotal}s`);

  api.End();
  TessModule.destroy(api);
});
