const fs = require('fs');
const TesseractCore = require('../../tesseract/build/bin/tesseract-asm')();
const { width, height, data } = require('./test-image');

const lang = 'eng';
const tessAPI = new TesseractCore.TessBaseAPI();
const buf = fs.readFileSync(`../traineddata/${lang}.traineddata`);

TesseractCore.FS.mkdir('/tessdata');
TesseractCore.FS.writeFile(`/tessdata/${lang}.traineddata`, buf);

// const ptr = TesseractCore._malloc(data.length * Uint8Array.BYTES_PER_ELEMENT);

// TesseractCore.HEAPU8.set(data, ptr);

tessAPI.Init('/tessdata', lang);
// tessAPI.SetImage(ptr, width, height, Uint8Array.BYTES_PER_ELEMENT, width);
// tessAPI.SetRectangle(0, 0, width, height);

/*
console.log(tessAPI.GetUTF8Text());
*/

// tessAPI.End();
// TesseractCore.destroy(tessAPI);
// TesseractCore._free(ptr);
