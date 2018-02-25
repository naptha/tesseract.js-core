const http = require('http');
const zlib = require('zlib');
const fs = require('fs');
const TesseractCore = require('../../');

const Module = TesseractCore();

const readPbm = (fileName) => {
  const pbm = fs.readFileSync(fileName); // this is a simple image format
  let start = 0;
  for (; pbm[start] !== 0; start += 1); // find the first non-ascii char
  const lines = pbm.toString('ascii', 0, start).split(/\s+/);
  if (lines[0] !== 'P4') throw new Error('Image must be a Binary-encoded 1-bit PBM (magic number P4 not found)');

  const width = parseInt(lines[1], 10);
  const height = parseInt(lines[2], 10);

  const pic = new Uint8Array(width * height);
  console.log('image size', width, 'x', height, lines);
  const bytesPerLine = Math.ceil(width / 8);
  for (let i = 0; i < height; i += 1) {
    for (let j = 0; j < width; j += 1) {
      pic[(i * width) + j] =
        ((pbm[start + (i * bytesPerLine) + Math.floor(j / 8)] >> (7 - (j % 8))) & 1) * 255;
    }
  }
  return { pic, width, height };
};

function runOCR() {
  const { pic, width, height } = readPbm('test.pbm');
  const picptr = Module._malloc(pic.length * Uint8Array.BYTES_PER_ELEMENT);
  Module.HEAPU8.set(pic, picptr);

  // initialize C++ API
  const base = new Module.TessBaseAPI();
  base.Init(null, 'eng');
  // stick the picture in memory

  base.SetImage(picptr, width, height, 1, width);
  base.SetRectangle(0, 0, width, height);

  // recognize the text on the image
  console.log('text');
  console.log(base.GetUTF8Text());

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
  Module.FS.writeFile(`./tessdata/${lang}.traineddata`, data);
  runOCR();
});
