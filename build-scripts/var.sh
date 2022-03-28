#!/bin/bash
#
# Common variables for all scripts

set -euo pipefail

# Include llvm binaries
export PATH=$PATH:$EMSDK/upstream/bin

# Flags for code optimization, focus on speed instead
# of size
OPTIM_FLAGS=(
  -O3
)

if [[ "$OSTYPE" == "linux-gnu"* ]]; then
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
TOOLCHAIN_FILE=$EMSDK/upstream/emscripten/cmake/Modules/Platform/Emscripten.cmake

CFLAGS="-I$BUILD_DIR/include $OPTIM_FLAGS"
CXXFLAGS="-I$BUILD_DIR/include $OPTIM_FLAGS"
LDFLAGS="$CFLAGS -L$BUILD_DIR/lib"

echo "EMSDK=$EMSDK"
echo "OPTIM_FLAGS=$OPTIM_FLAGS"
echo "BUILD_DIR=$BUILD_DIR"
