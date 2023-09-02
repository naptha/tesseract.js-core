#!/bin/bash
set -euo pipefail
source $(dirname $0)/var.sh

LIB_PATH=third_party/tesseract
CXXFLAGS="$OPTIM_FLAGS"
CM_FLAGS=(
  -DCMAKE_PREFIX_PATH=$BUILD_DIR
  -DLeptonica_DIR=../leptonica/build
  -DOPENMP_BUILD=OFF
  -DBUILD_TRAINING_TOOLS=OFF
  -DGRAPHICS_DISABLED=ON
)

if [ $BUILD_WASM = 1 ]; then
  CM_FLAGS+=(-DCMAKE_TOOLCHAIN_FILE=$TOOLCHAIN_FILE)
  CM_FLAGS+=(-DWASM_BUILD=ON)
fi

echo "CM_FLAGS=${CM_FLAGS[@]}"

cd $LIB_PATH
if [ $BUILD_CLEAN = 1 ]
then
  rm -rf build
fi
mkdir -p build
cd build

## For the .wasm version, a version is built with SIMD enabled and disabled.
if [ $BUILD_WASM = 1 ]; then
  $CMAKE_CMD .. -DCMAKE_CXX_FLAGS="$CXXFLAGS" ${CM_FLAGS[@]} -D HAVE_SSE4_1=1 -D DISABLED_LEGACY_ENGINE=1
  $MAKE_CMD -j${PROC}
  $CMAKE_CMD .. -DCMAKE_CXX_FLAGS="$CXXFLAGS" ${CM_FLAGS[@]} -D HAVE_SSE4_1=0 -D DISABLED_LEGACY_ENGINE=1
  $MAKE_CMD -j${PROC}
  $CMAKE_CMD .. -DCMAKE_CXX_FLAGS="$CXXFLAGS" ${CM_FLAGS[@]} -D HAVE_SSE4_1=1 -D DISABLED_LEGACY_ENGINE=0
  $MAKE_CMD -j${PROC}
  $CMAKE_CMD .. -DCMAKE_CXX_FLAGS="$CXXFLAGS" ${CM_FLAGS[@]} -D HAVE_SSE4_1=0 -D DISABLED_LEGACY_ENGINE=0
  $MAKE_CMD -j${PROC}
else
  $CMAKE_CMD .. -DCMAKE_CXX_FLAGS="$CXXFLAGS" ${CM_FLAGS[@]}
  $MAKE_CMD -j${PROC}
fi