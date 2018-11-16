const fs = require('fs');

module.exports = (TessModule, path) => {
  const buf = fs.readFileSync(path);
  const ptr = TessModule._malloc(buf.length * Uint8Array.BYTES_PER_ELEMENT);
  TessModule.HEAPU8.set(buf, ptr);
  const pix = TessModule._pixReadMem(ptr, buf.length);
  return {
    width: TessModule.getValue(pix, 'i32'),
    height: TessModule.getValue(pix + 4, 'i32'),
    data: pix,
  };
};
