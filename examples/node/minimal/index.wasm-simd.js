const fs = require('fs');
const path = require('path');

const TesseractCore = require('../../../tesseract-core-simd');

const [,, imagePath] = process.argv;

TesseractCore().then((TessModule) => {
  const lang = 'eng';
  const api = new TessModule.TessBaseAPI();

  const buf = fs.readFileSync(path.resolve(__dirname, `../../../tests/traineddata/${lang}.traineddata`));

  TessModule.FS.writeFile(`${lang}.traineddata`, buf);

  api.Init(null, lang);

  const fileBuf = fs.readFileSync(imagePath);
  TessModule.FS.writeFile('/input', fileBuf);

  api.SetImageFile();

  console.log(api.GetUTF8Text());

  api.End();
  TessModule.destroy(api);
});
