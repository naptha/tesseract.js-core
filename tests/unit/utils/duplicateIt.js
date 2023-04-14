const TesseractCore = require('../../../tesseract-core');
const TesseractCoreSIMD = require('../../../tesseract-core-simd');

module.exports = (desc, callback, { timeout }) => {
  it(`[WASM]: ${desc}`, callback(TesseractCore)).timeout(timeout);
  it(`[WASM-SIMD]: ${desc}`, callback(TesseractCoreSIMD)).timeout(timeout);
};
