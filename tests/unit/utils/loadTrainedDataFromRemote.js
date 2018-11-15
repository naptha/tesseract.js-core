const fetch = require('node-fetch');
const zlib = require('zlib');
const { LANG_URI } = require('../../config.json');

const loadAndGunzipFile = tessModule => lang => (
  fetch(`${LANG_URI}/${lang}.traineddata.gz`)
    .then(resp => resp.arrayBuffer())
    .then(buf => zlib.gunzipSync(buf))
    .then((data) => {
      if (tessModule !== null) {
        tessModule.FS.writeFile(`${lang}.traineddata`, data);
      }
      return data;
    })
);

module.exports = (langStr, tessModule = null) => {
  const langs = langStr.split('+');
  return Promise
    .all(langs.map(loadAndGunzipFile(tessModule)));
};
