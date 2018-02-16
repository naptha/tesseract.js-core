#!/bin/bash
docker run -it -v $(pwd):/src trzeci/emscripten:sdk-tag-1.37.33-64bit /bin/bash
