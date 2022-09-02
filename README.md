tesseract.js-core
=================

![](https://raw.githubusercontent.com/jeromewu/tesseract.js-core/master/assets/images/tesseract.js-core.png)

Core part of [tesseract.js](https://github.com/naptha/tesseract.js), which compiles original tesseract from C to JavaScript WebAssembly.


## Structure

1.	Build scripts are in `build-scripts` folder
2.	Javascript/wrapper files are in `javascript` folder
3.	All dependencies (including Tesseract) are in `third_party` folder
    1. All dependencies are unmodified except for Tesseract, which uses a forked repo
    1. The Tesseract repo has the following changes:
       1. Modified `CMakeLists.txt` to build with emscripten
       1. Modified `ltrresultiterator.h` and `ltrresultiterator.cpp` to add `WordChoiceIterator` class
       1. Added `src/arch_see` folder, which is used instead of `src/arch` for the simd-enabled build
          1. This hard-codes the use of the SSE function
       1. Commented out "Empty page!!" message in `src/textord/colfind.cpp` to prevent this from printing to console
       1. Added calls to `EM_ASM_ARGS` to `src/ccmain/control.cpp` for progress logging (and added `<emscripten.h>` header)

## Running Minimal Examples
To run the browser examples, launch a web server in the root of the repo (i.e. run `http-server`).  Then navigate to the pages in `examples/web/minimal/` in your browser.  

To run the node examples, navigate to `examples/node/minimal/` and then run e.g. `node index.wasm.js`.

The "benchmark" examples behave similarly, except that they take longer to run and report runtime instead of recognition text.  All other examples are experimental and should not be expected to run. 

## Contribution

As we leverage git-submodule to manage dependencies, remember to add recursive when cloning the repository:

```
$ git clone --recursive https://github.com/naptha/tesseract.js-core
```

To build tesseract-core.js by yourself, please install [docker](https://www.docker.com/) and run:

```
$ bash build-with-docker.sh
```

The genreated files will be stored in root path.
