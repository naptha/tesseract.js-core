#!/bin/bash
#
# Common variables for all scripts

set -euo pipefail

## Build to .wasm
BUILD_WASM=1

## Build only a single .wasm build (SIMD-enabled, LSTM + Legacy supported)
## Since multiple builds are provided in release versions (currently 4),
## this option saves time when enabled during development, 
## but must be disabled for all builds to be updated before a release. 
BUILD_SINGLE=0

# Include llvm binaries
if [ $BUILD_WASM = 1 ]; then
  export PATH=$PATH:$EMSDK/upstream/bin
fi

if [ $BUILD_WASM = 1 ]; then
  export CONFIGURE_CMD="emconfigure"
  export MAKE_CMD="emmake make"
  export CMAKE_CMD="emmake cmake"
else
  export CONFIGURE_CMD=""
  export MAKE_CMD="make"
  export CMAKE_CMD="cmake"
fi


# Build everything from scratch (rather than any incremental changes)
# This should always be set to 1 in the Git repo, and buils should always be run with BUILD_CLEAN=1 before pushing.
# However, it reduces compile time during development to set BUILD_CLEAN=0. 
BUILD_CLEAN=1

# Number of processes
PROC=$(($(cat /proc/cpuinfo | awk '/^processor/{print $3}' | wc -l)-1))

OPTIM_FLAGS=(
  -O3
)

if [[ "$OSTYPE" == "linux-gnu"* ]] && [ $BUILD_WASM = 1 ]; then
  # Use closure complier only in linux environment
  OPTIM_FLAGS=(
    "${OPTIM_FLAGS[@]}"
    --closure 1
  )
fi

# Convert array to string
OPTIM_FLAGS="${OPTIM_FLAGS[@]}"

# Root directory
ROOT_DIR=$PWD

# Directory to install headers and libraries
BUILD_DIR=$ROOT_DIR/dep
LIB_DIR=$BUILD_DIR/lib
INCLUDE_DIR=$BUILD_DIR/include

# Directory to look for pkgconfig files
EM_PKG_CONFIG_PATH=$BUILD_DIR/lib/pkgconfig

# Toolchain file path for cmake
if [ $BUILD_WASM = 1 ]; then
  TOOLCHAIN_FILE=$EMSDK/upstream/emscripten/cmake/Modules/Platform/Emscripten.cmake
fi

CFLAGS="-I$BUILD_DIR/include $OPTIM_FLAGS"
CXXFLAGS="-I$BUILD_DIR/include $OPTIM_FLAGS"
LDFLAGS="$CFLAGS -L$BUILD_DIR/lib"

echo "BUILD_CLEAN=$BUILD_CLEAN"
echo "PROC=$PROC"

echo "EMSDK=$EMSDK"
echo "OPTIM_FLAGS=$OPTIM_FLAGS"
echo "BUILD_DIR=$BUILD_DIR"
