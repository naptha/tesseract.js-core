# tesseract.js-core

If you've managed to stumble onto this repository, odds are that you probably want to be using [tesseract.js](https://github.com/naptha/tesseract.js) instead. Tesseract.JS a high level async API that works on the browser as well as the server. 

On the other hand Tesseract.JS-Core is the internal emscripten blob which powers TesseractJS. If you're a big fan of manual memory management and slow, blocking computation, then you're at the right place!

The API essentially mirrors the Tesseract C++ API specified in [baseapi.h](https://github.com/tesseract-ocr/tesseract/blob/master/api/baseapi.h). In particular, it's the subset which is described by [tesseract.idl](https://github.com/naptha/tesseract-emscripten/blob/master/javascript/tesseract.idl)

The contents of this repository is [automatically generated](https://github.com/naptha/tesseract-emscripten/tree/master/javascript), so any issues or pull requests should probably be in that repository. 

This repository only has one file, the 2.7MB "index.js" formatted with UMD and hosted graciously by rawgit.

    <script src="https://cdn.rawgit.com/naptha/tesseract.js-core/0.1.0/index.js"></script>
