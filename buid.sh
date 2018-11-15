#!/bin/bash
#
# This script build tesseract-core.js.
#

main() {
  cd tesseract
  sh build-for-tesseract.js.sh
  cp ./build/bin/* ..
}

main "$@"
