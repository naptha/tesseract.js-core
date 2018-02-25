tesseract.js-core
=================

![](https://raw.githubusercontent.com/jeromewu/tesseract.js-core/master/assets/images/tesseract.js-core.png)

Core part of [tesseract.js](https://github.com/naptha/tesseract.js), which compiles original tesseract from C to JavaScript WebAssembly.

## Environment

- Emscripten: 1.37.33 (trzeci/emscripten:sdk-tag-1.37.33-64bit)
- Leptonica: 1.75.2
- Tesseract: 3.05.01
- Node: 8.9.4

## Contribution

To contribute, feel free to modify anything inside src/ folder and when everything is done, simply execute:

```bash
$ sh scripts/compile.sh
```

And you will have the new index.js to go.
