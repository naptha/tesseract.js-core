#!/bin/bash

set -euo pipefail
source $(dirname $0)/var.sh

LIB_PATH=third_party/tesseract
CXXFLAGS="$OPTIM_FLAGS"
CM_FLAGS=(
  -DCMAKE_PREFIX_PATH=$BUILD_DIR
  -DCMAKE_TOOLCHAIN_FILE=$TOOLCHAIN_FILE
  -DLeptonica_DIR=../leptonica/build
)
echo "CM_FLAGS=${CM_FLAGS[@]}"

cd $LIB_PATH
rm -rf build
mkdir -p build
cd build
emmake cmake .. -DCMAKE_CXX_FLAGS="$CXXFLAGS" ${CM_FLAGS[@]}
emmake make
