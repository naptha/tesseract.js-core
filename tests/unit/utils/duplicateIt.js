const TesseractCoreASM = require('../../../tesseract-core.asm');
const TesseractCoreWASM = require('../../../tesseract-core');
const TesseractCoreWASMSIMD = require('../../../tesseract-core-simd');

module.exports = (desc, callback, { timeout }) => {
  it(`[ASM]: ${desc}`, callback(TesseractCoreASM)).timeout(timeout);
  it(`[WASM]: ${desc}`, callback(TesseractCoreWASM)).timeout(timeout);
  it(`[WASM-SIMD]: ${desc}`, callback(TesseractCoreWASMSIMD)).timeout(timeout);
};
