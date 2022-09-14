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
if [ $BUILD_CLEAN = 1 ]
then
  rm -rf build
  mkdir -p build
fi
cd build
emmake cmake .. -DCMAKE_C_FLAGS="$CXXFLAGS" ${CM_FLAGS[@]}
if [ $BUILD_CLEAN = 1 ]
then
  emmake make clean
fi
emmake make install -j$PROC
cd $ROOT_DIR
