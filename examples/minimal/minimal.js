var lang = 'eng'; 

var fs   = require("fs")
var TesseractCore = require('../../')
var Module = TesseractCore();

// This requires eng.traineddata to be located in the same directory!
var buf = fs.readFileSync(lang + '.traineddata');
Module.FS_createPath("/", "tessdata", true, true)
Module.FS_createDataFile('tessdata', lang + '.traineddata', buf, true, false);

var image = require('./test-image');

var width = image.width,
    height = image.height,
    pic = new Uint8Array(width * height);
var picptr = Module.allocate(image.data, 'i8', Module.ALLOC_NORMAL);
var base = new Module.TessBaseAPI()
base.Init(null, lang)
base.SetImage(Module.wrapPointer(picptr), width, height, 1, width)
base.SetRectangle(0, 0, width, height)

// recognize the text on the image
var text = base.GetUTF8Text()
console.log(text)

// cleanup memory
base.End();
Module.destroy(base)
Module._free(picptr);