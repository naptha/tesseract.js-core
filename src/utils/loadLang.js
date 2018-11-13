const util = require('util');
const fs = require('fs');
const fetch = require('node-fetch');
const zlib = require('zlib');

const readFile = util.promisify(fs.readFile);

const handleLang = ({
  tessModule,
  dataPath,
  cachePath,
  cache,
  lang,
}) => (data) => {
  if (tessModule) {
    tessModule.FS.writeFile(`${dataPath || '.'}/${lang}.traineddata`, data);
  }
  if (cache) {
    fs.writeFileSync(`${cachePath || '.'}/${lang}.traineddata`, data);
  }
  return data;
};

const loadAndGunzipFile = ({
  langURI,
  cachePath,
  ...options
}) => lang => (
  readFile(`${cachePath || '.'}/${lang}.traineddata`)
    .then(handleLang({ cachePath, lang, ...options }))
    .catch(() => (
      // console.log(`Download ${lang}.traineddata.gz from ${langURI}/${lang}.traineddata.gz...`);
      fetch(`${langURI}/${lang}.traineddata.gz`)
        .then(resp => resp.arrayBuffer())
        .then(buf => zlib.gunzipSync(buf))
        .then(handleLang({ cachePath, lang, ...options }))
    ))
);

/**
 * Load language(s) from local cache, download from remote if not in cache.
 *
 * All params below actually store in a object.
 *
 * ex:
 *   loadLang({ langs, tesssModule, ... });
 *
 * @name loadLang
 * @function
 * @param {string} langs - langs to load, use '+' for multiple languages, ex: eng+chi_tra
 * @param {object} tessModule - TesseractModule
 * @param {string} langURI - prefix URI for downloading lang file
 * @param {string} cachePath - path to find cache
 * @param {string} dataPath - path to store data in mem
 * @param {boolean} cache - true for caching
 *
 */
module.exports = ({
  langs,
  ...options
}) => (
  Promise
    .all(langs.split('+').map(loadAndGunzipFile(options)))
);
