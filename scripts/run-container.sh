#!/bin/bash
docker run -it \
  --mount type=bind,source=$(pwd),target=/src \
  trzeci/emscripten:sdk-tag-1.37.33-64bit \
  /bin/bash
