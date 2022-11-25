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
if [ $BUILD_CLEAN = 1 ]
then
  rm -rf build
fi
mkdir -p build
cd build
emmake cmake .. -DCMAKE_CXX_FLAGS="$CXXFLAGS" ${CM_FLAGS[@]} -D HAVE_SSE4_1=1 
emmake make -j${PROC}
emmake cmake .. -DCMAKE_CXX_FLAGS="$CXXFLAGS" ${CM_FLAGS[@]} -D HAVE_SSE4_1=0 
emmake make -j${PROC}
