const fs = require('fs');
const TessModule = require('../../../tesseract/build/bin/tesseract')({
  TesseractProgress(percent) {
    console.log(`Progress: ${percent}`);
  }
});

TessModule.onRuntimeInitialized = () => {
  const lang = 'eng';
  const api = new TessModule.TessBaseAPI();

  TessModule.FS.writeFile(`${lang}.traineddata`, fs.readFileSync(`../../traineddata/${lang}.traineddata`));

  const img = fs.readFileSync('../../data/tyger.png');
  const img_ptr = TessModule._malloc(img.length * Uint8Array.BYTES_PER_ELEMENT);
  TessModule.HEAPU8.set(img, img_ptr);

  api.Init(null, lang);
  api.SetImage(TessModule._pixReadMem(img_ptr, img.length));

  console.log(api.GetUTF8Text());

  api.End();
  TessModule.destroy(api);
  TessModule._free(img_ptr);
}
