const fs = require('fs');
const { readImage } = require('tesseract.js-utils');
const TesseractCore = require('../../../tesseract-core');

TesseractCore().then(async (TessModule) => {
  const lang = 'eng';
  const api = new TessModule.TessBaseAPI();
  const buf = fs.readFileSync(`../../../tests/traineddata/${lang}.traineddata`);
  TessModule.FS.writeFile(`${lang}.traineddata`, buf);
  api.Init(null, lang);

  const fileArr = ['../../data/meditations.jpg', '../../data/tyger.jpg', '../../data/testocr.png'];
  let timeTotal = 0;
  for (const file of fileArr) {
    const image = fs.readFileSync(file);
    const { pix } = readImage(TessModule, image);
  
    let time1 = Date.now();
    for (let i=0; i<10; i++) {
      api.SetImage(pix);
      api.GetUTF8Text();
    }
    let time2 = Date.now();
    const timeDif = (time2 - time1) / 1e3;
    timeTotal += timeDif;

    console.log(file + " [x10] runtime: " + timeDif + "s");
    TessModule._free(pix);
  }

  console.log("Total runtime: " + timeTotal + "s");

  api.End();
  TessModule.destroy(api);
  
});
