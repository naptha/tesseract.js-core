#!/bin/bash
docker rmi emscripten-tesseract.js-core:latest -f
docker build -t emscripten-tesseract.js-core:latest .
