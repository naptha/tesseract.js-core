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

## Contribution

As we leverage git-submodule to manage dependencies, remember to add recursive when cloning the repository:

```
$ git clone --recursive https://github.com/naptha/tesseract.js-core
```

To build tesseract-core.js by yourself, please install [docker](https://www.docker.com/) and run:

```
$ sh build.sh
```

The genreated files will be stored in root path.
