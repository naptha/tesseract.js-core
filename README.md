# tesseract.js-core

Odds are you probably want to be using [tesseract.js](https://github.com/naptha/tesseract.js) instead. It's a high level async API that works on the browser as well as the server. But if you're a big fan of manual memory management and slow, blocking computation, then you're at the right place!

The API essentially mirrors the Tesseract C++ API specified in [baseapi.h](https://github.com/tesseract-ocr/tesseract/blob/master/api/baseapi.h). In particular, it's the subset which is described by [tesseract.idl](https://github.com/naptha/tesseract-emscripten/blob/master/javascript/tesseract.idl)



------------------------

Note that this didn't work for me on io.js v1.0.3 (giving a "read_params_file: parameter not found: enable_new_segsearch" error). Switching to Node v0.12.2 worked.