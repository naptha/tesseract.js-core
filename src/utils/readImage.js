module.exports = (TessModule, buf) => {
  const ptr = TessModule._malloc(buf.length * Uint8Array.BYTES_PER_ELEMENT);
  TessModule.HEAPU8.set(buf, ptr);
  const pix = TessModule._pixReadMem(ptr, buf.length);
  if (TessModule.getValue(pix + (7 * 4), 'i32') === 0) {
    /*
     * Set a yres default value to prevent warning from tesseract
     * See kMinCredibleResolution in tesseract/src/ccstruct/publictypes.h
     */
    TessModule.setValue(pix + (7 * 4), 70, 'i32');
  }
  const [w, h, d, spp, wpl, refcount, xres, yres, informat, special] = Array(10).fill(0)
    .map((v, idx) => (
      TessModule.getValue(pix + (idx * 4), 'i32')
    ));
  return {
    w,
    h,
    d,
    spp,
    wpl,
    refcount,
    xres,
    yres,
    informat,
    special,
    data: pix,
  };
};
