#!/bin/bash
#
# This script is for generating glue code from tesseract.idl
#

EMSCRIPTEN_VERSION=1.38.45

check_command() {
  CMD=$1
  command -v $CMD >/dev/null 2>&1 || { echo >&2 "$CMD is not installed  Aborting."; exit 1; }
}

gen_glue() {
  docker run -it \
    -v ${PWD}:/src \
    trzeci/emscripten:$EMSCRIPTEN_VERSION \
    sh -c 'python /emsdk_portable/emscripten/sdk/tools/webidl_binder.py tesseract.idl glue'
}

main() {
  check_command docker
  gen_glue
  mv glue.cpp ./src
  rm -rf parser.out WebIDLGrammar.pkl
}

main "$@"
