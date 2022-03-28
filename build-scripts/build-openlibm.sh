#!/bin/bash

set -euo pipefail
source $(dirname $0)/var.sh

LIB_PATH=third_party/openlibm
emmake make -C $LIB_PATH clean
emmake make -C $LIB_PATH prefix=$BUILD_DIR install -j
