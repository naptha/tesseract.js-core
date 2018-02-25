const lang = 'eng';

const fs = require('fs');
const TesseractCore = require('../../');
const { width, height, data } = require('./test-image');

const Module = TesseractCore();
const tessAPI = new Module.TessBaseAPI();

const buf = fs.readFileSync(`../traineddata/${lang}.traineddata`);

Module.FS.mkdir('/tessdata');
Module.FS.writeFile(`/tessdata/${lang}.traineddata`, buf);

const ptr = Module._malloc(data.length * Uint8Array.BYTES_PER_ELEMENT);

Module.HEAPU8.set(data, ptr);

tessAPI.Init(null, lang);
tessAPI.SetImage(ptr, width, height, Uint8Array.BYTES_PER_ELEMENT, width);
tessAPI.SetRectangle(0, 0, width, height);

console.log(tessAPI.GetUTF8Text());

tessAPI.End();
Module.destroy(tessAPI);
Module._free(ptr);
