const TesseractCoreASM = require('../../../tesseract-core.asm');
const TesseractCoreWASM = require('../../../tesseract-core');

module.exports = (desc, callback, { timeout }) => {
  it(`[ASM]: ${desc}`, callback(TesseractCoreASM)).timeout(timeout);
  it(`[WASM]: ${desc}`, callback(TesseractCoreWASM)).timeout(timeout);
};
