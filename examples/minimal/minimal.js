const lang = 'eng';

const fs = require('fs');
const TesseractCore = require('../../tesseract/tesseract-core');
const { width, height, data } = require('./test-image');

const Module = TesseractCore();
const tessAPI = new Module.TessBaseAPI();

const buf = fs.readFileSync(`../traineddata/${lang}.traineddata`);

Module.FS.mkdir('/tessdata');
Module.FS.writeFile(`/tessdata/${lang}.traineddata`, buf);

const picptr = Module.allocate(data, 'i8', Module.ALLOC_NORMAL);

tessAPI.Init(null, lang);
tessAPI.SetImage(Module.wrapPointer(picptr), width, height, 1, width);
tessAPI.SetRectangle(0, 0, width, height);

const text = tessAPI.GetUTF8Text();
console.log(text);

tessAPI.End();
Module.destroy(tessAPI);
