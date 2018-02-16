#!/bin/bash

TARGET=$1
DIR=$(cd `dirname $0`; pwd)

main() {
  make -C ${DIR}/.. -f ${DIR}/Makefile ${TARGET}
}

main "$@"
