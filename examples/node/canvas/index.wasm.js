const https = require('https');
const zlib = require('zlib');
const fs = require('fs');
const Canvas = require('canvas');
const TessModule = require('../../../tesseract/build/bin/tesseract')({
   TesseractProgress(percent) {
     console.log('progress:', percent);
   },
});

const loadImage = (fileName) => {
  const data = fs.readFileSync(fileName);
  const img = new Canvas.Image();
  img.src = data;
  const canvas = new Canvas(img.width, img.height);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);
  return ctx.getImageData(0, 0, img.width, img.height);
}


function runOCR() {
  const { width, height, data } = loadImage('../../data/tyger.jpg');
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

  const picptr = TessModule._malloc(pic.length * Uint8Array.BYTES_PER_ELEMENT);
  TessModule.HEAPU8.set(pic, picptr);

  // initialize C++ API
  const api = new TessModule.TessBaseAPI();
  api.Init(null, 'eng');
  // stick the picture in memory

  api.SetImage(picptr, width, height, 1, width);
  api.SetRectangle(0, 0, width, height);

  // recognize the text on the image
  console.log(api.GetUTF8Text());

  // clean up memory and allocated objects
  api.End();
  TessModule.destroy(api);
  TessModule._free(picptr);
}

function loadTessdata(lang, cb) {
  fs.readFile(`./${lang}.traineddata`, (err, data) => {
    if (!err) return cb(new Uint8Array(data), lang);
    https.get(`https://rawcdn.githack.com/naptha/tessdata/gh-pages/3.02/${lang}.traineddata.gz`, (res) => {
      const gunzip = zlib.createGunzip();
      res.pipe(gunzip).pipe(fs.createWriteStream(`${lang}.traineddata`));
      gunzip.on('end', () => { loadTessdata(lang, cb); });
    });
  });
}

TessModule.onRuntimeInitialized = () => {
  // load the tesseract language data
  loadTessdata('eng', (data, lang) => {
    TessModule.FS.writeFile(`${lang}.traineddata`, data);
    runOCR();
  });
}
