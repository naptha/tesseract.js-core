#!/bin/bash

patch_files() {
  patch < ../../patch/environ.h.patch
}

compile() {
  emmake make -f makefile.static
}

main() {
  cd leptonica/src
  patch_files
  compile
}

main "$@"
