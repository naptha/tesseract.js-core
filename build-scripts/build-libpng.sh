#!/bin/bash

set -euo pipefail
source $(dirname $0)/var.sh

LIB_PATH=third_party/libpng
CXXFLAGS="$OPTIM_FLAGS"
CM_FLAGS=(
  -DCMAKE_INSTALL_PREFIX=$BUILD_DIR
  -DZLIB_LIBRARY=$LIB_DIR
  -DZLIB_INCLUDE_DIR=$INCLUDE_DIR
  -DM_LIBRARY=$LIB_DIR
  -DPNG_STATIC=ON
  -DPNG_SHARED=OFF
  -DPNG_TESTS=NO
)
echo "CM_FLAGS=${CM_FLAGS[@]}"

cd $LIB_PATH
rm -rf build
mkdir -p build
cd build
emmake cmake .. -DCMAKE_C_FLAGS="$CXXFLAGS" ${CM_FLAGS[@]}
emmake make clean
emmake make install -j
cd $ROOT_DIR
