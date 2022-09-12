#!/bin/bash
NPROC=$(($(cat /proc/cpuinfo | awk '/^processor/{print $3}' | wc -l)-1))

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
  mkdir -p build
fi
cd build
emmake cmake .. -DCMAKE_CXX_FLAGS="$CXXFLAGS" ${CM_FLAGS[@]}
emmake make
emmake cmake .. -DCMAKE_CXX_FLAGS="$CXXFLAGS" ${CM_FLAGS[@]} -D HAVE_SSE4_1=1 
emmake make -j${NPROC}
emmake cmake .. -DCMAKE_CXX_FLAGS="$CXXFLAGS" ${CM_FLAGS[@]} -D HAVE_SSE4_1=0 
emmake make -j${NPROC}
