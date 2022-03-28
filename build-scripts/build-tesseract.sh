#!/bin/bash

set -euo pipefail
source $(dirname $0)/var.sh

CXXFLAGS="$OPTIM_FLAGS"
CM_FLAGS=(
  -DCMAKE_PREFIX_PATH=$BUILD_DIR
  -DCMAKE_TOOLCHAIN_FILE=$TOOLCHAIN_FILE
  -DLeptonica_DIR=third_party/leptonica/build
)
echo "CM_FLAGS=${CM_FLAGS[@]}"

rm -rf build
mkdir -p build
cd build
emmake cmake .. -DCMAKE_CXX_FLAGS="$CXXFLAGS" ${CM_FLAGS[@]}
emmake make -j
