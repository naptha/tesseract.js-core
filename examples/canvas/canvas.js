const http = require('http');
const zlib = require('zlib');
const fs = require('fs');
const Canvas = require('canvas');
const TesseractCore = require('../../');

const Module = TesseractCore({
  TOTAL_MEMORY: 90e6,
  TesseractProgress(percent) {
    console.log('progress:', percent);
  },
});

function loadImage(fileName) {
  const data = fs.readFileSync(fileName);
  const img = new Canvas.Image();
  img.src = data;
  const canvas = new Canvas(img.width, img.height);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);
  return ctx.getImageData(0, 0, img.width, img.height);
}


function runOCR() {
  const { width, height, data } = loadImage('tyger.jpg');
  const pic = new Uint8Array(width * height);
  for (let i = 0; i < height; i += 1) {
    for (let j = 0; j < width; j += 1) {
      const b = 4 * ((i * width) + j);
      const luma = (data[b] + data[b + 1] + data[b + 2]) / 3;
      const alpha = data[b + 3] / 255;
      pic[(i * width) + j] = (luma * alpha) + ((1 - alpha) * 128);
    }
  }

  console.log('image size', width, 'x', height);

  const picptr = Module._malloc(pic.length * Uint8Array.BYTES_PER_ELEMENT);
  Module.HEAPU8.set(pic, picptr);

  // initialize C++ API
  const base = new Module.TessBaseAPI();
  base.Init(null, 'eng');
  // stick the picture in memory

  base.SetImage(picptr, width, height, 1, width);
  base.SetRectangle(0, 0, width, height);

  // recognize the text on the image
  const text = base.GetUTF8Text();
  console.log(text);

  // clean up memory and allocated objects
  base.End();
  Module.destroy(base);
  Module._free(picptr);
}

function loadTessdata(lang, cb) {
  fs.readFile(`../traineddata/${lang}.traineddata`, (err, data) => {
    if (!err) return cb(new Uint8Array(data), lang);
    http.get(`http://cdn.rawgit.com/naptha/tessdata/gh-pages/3.02/${lang}.traineddata.gz`, (res) => {
      const gunzip = zlib.createGunzip();
      res.pipe(gunzip).pipe(fs.createWriteStream(`${lang}.traineddata`));
      gunzip.on('end', () => { loadTessdata(lang, cb); });
    });
    return cb([], lang);
  });
}

// load the tesseract language data
loadTessdata('eng', (data, lang) => {
  Module.FS.mkdir('/tessdata');
  Module.FS.writeFile(`/tessdata/${lang}.traineddata`, data);
  runOCR();
});
