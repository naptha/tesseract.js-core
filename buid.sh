#!/bin/bash
#
# This script build tesseract-core.js.
#

main() {
  cd tesseract
  sh build-in-docker.sh
  cp ./build/bin/* ../
}

main "$@"
