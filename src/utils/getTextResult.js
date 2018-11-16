module.exports = (tess, pix) => {
  tess.SetImage(pix);
  return tess.GetUTF8Text();
};
