const fs = require('fs');
const TesseractCore = require('../../../src/tesseract-core.asm');
const { width, height, data } = require('../../data/test-image.json');

TesseractCore().then((TessModule) => {
  const lang = 'eng';
  const api = new TessModule.TessBaseAPI();
  const buf = fs.readFileSync(`../../../tests/traineddata/${lang}.traineddata`);
  const ptr = TessModule._malloc(data.length * Uint8Array.BYTES_PER_ELEMENT);

  TessModule.FS.writeFile(`${lang}.traineddata`, buf);
  TessModule.HEAPU8.set(data, ptr);

  api.Init(null, lang);
  api.SetImage(ptr, width, height, Uint8Array.BYTES_PER_ELEMENT, width);
  api.SetRectangle(0, 0, width, height);

  console.log(api.GetUTF8Text());

  api.End();
  TessModule.destroy(api);
  TessModule._free(ptr);
});
