const fs = require('fs');
const TessModule = require('../../../tesseract/build/bin/tesseract-asm')({
  TesseractProgress(percent) {
    console.log(`Progress: ${percent}`);
  }
});
const lang = 'eng';
const api = new TessModule.TessBaseAPI();

TessModule.FS.writeFile(`${lang}.traineddata`, fs.readFileSync(`../../traineddata/${lang}.traineddata`));

const img = fs.readFileSync('../../data/testocr.png');
const img_ptr = TessModule._malloc(img.length * Uint8Array.BYTES_PER_ELEMENT);
TessModule.HEAPU8.set(img, img_ptr);
const img_pixa = TessModule._pixReadMem(img_ptr, img.length);

api.Init(null, lang);
api.SetImage(img_pixa);

const width = TessModule.getValue(img_pixa, 'i32');
const height = TessModule.getValue(img_pixa+4, 'i32');

console.log(`image size: ${width} x ${height}`);
console.log(api.GetUTF8Text());

api.End();
TessModule.destroy(api);
TessModule._free(img_ptr);
