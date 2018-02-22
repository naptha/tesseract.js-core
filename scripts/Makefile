LEPTONICA_PATH := leptonica
PATCH_PATH := patch
TESSERACT_PATH := tesseract

WEBIDL_BINDER_PY := /emsdk_portable/sdk/tools/webidl_binder.py

EMMAKE := emmake
EM := em++
DEFS := -DUSE_STD_NAMESPACE
FLAGS := --std=c++11 -Wno-inconsistent-missing-override
LIBS := -I../$(LEPTONICA_PATH)/src \
				-I./api \
				-I./lstm \
				-I./opencl \
				-I./ccutil \
				-I./textord \
				-I./classify \
				-I./dict \
				-I./ccmain \
				-I./cutil \
				-I./wordrec \
				-I./ccstruct \
				-I./arch \
				-I./viewer

EM_DEFS := -DANDROID_BUILD \
					 -DGRAPHICS_DISABLED \
					 -DIMGUNPK_H \
					 -DSECURE_NAMES \
					 -DTESSDATA_PREFIX="./" \
					 $(DEFS)
EM_FLAGS := -Oz --closure 1 \
						--memory-init-file 0 \
						-s TOTAL_MEMORY=268435456 \
						-s EXPORT_NAME='"TesseractCore"' \
						-s MODULARIZE=1 \
  					-s EXPORTED_FUNCTIONS='["_pixDestroy","_boxaDestroy","_pixaDestroy","_ptaDestroy", "_pixReadMemTiff"]' \
						-s EXTRA_EXPORTED_RUNTIME_METHODS='["FS", "ccall", "cwrap", "setValue", "getValue", "ALLOC_NORMAL", "allocate"]' \
  					--js-transform "python strip_node.py" \
  					--llvm-lto 1 \
						-s INVOKE_RUN=0 \
						-s NO_EXIT_RUNTIME=1 \
						-s AGGRESSIVE_VARIABLE_ELIMINATION=1 \
						-s ASSERTIONS=1 \
						-s DEMANGLE_SUPPORT=1 \
						--post-js glue.js \
						--post-js anterior.js \
						$(FLAGS)
TES_SRC := ./api/*.cpp \
					 ./lstm/*.cpp \
					 ./ccmain/*.cpp \
					 ./ccutil/*.cpp \
					 ./wordrec/*.cpp \
					 ./textord/*.cpp \
					 ./ccstruct/*.cpp \
					 ./dict/*.cpp \
					 ./cutil/*.cpp \
					 ./classify/*.cpp \
					 ./arch/*.cpp \
					 ./viewer/svutil.cpp

all: patch-lep leptonica patch-tes tess-deps tesseract

patch-lep:
	patch -Nbs $(LEPTONICA_PATH)/src/makefile.static $(PATCH_PATH)/leptonica/src/makefile.static; exit 0
#	patch -Nbs $(LEPTONICA_PATH)/src/environ.h $(PATCH_PATH)/leptonica/src/environ.h; exit 0

leptonica: patch-lep
	$(EMMAKE) make -C $(LEPTONICA_PATH)/src -f makefile.static
	cp ${LEPTONICA_PATH}/obj/nodebug/*.o ${TESSERACT_PATH}/

patch-tes:
	patch -Nbs $(TESSERACT_PATH)/ccmain/ltrresultiterator.cpp $(PATCH_PATH)/tesseract/ccmain/ltrresultiterator.cpp; exit 0
	patch -Nbs $(TESSERACT_PATH)/ccmain/ltrresultiterator.h $(PATCH_PATH)/tesseract/ccmain/ltrresultiterator.h; exit 0
	patch -Nbs $(TESSERACT_PATH)/ccmain/control.cpp $(PATCH_PATH)/tesseract/ccmain/control.cpp; exit 0
	patch -Nbs $(TESSERACT_PATH)/api/baseapi.h $(PATCH_PATH)/tesseract/api/baseapi.h; exit 0

prepare:
	cd ${TESSERACT_PATH} && \
		python $(WEBIDL_BINDER_PY) ../src/tesseract.idl glue && \
		cp ../src/* .

tess-deps:
	cd $(TESSERACT_PATH) && \
		$(EM) $(FLAGS) $(DEFS) $(LIBS) -c $(TES_SRC)

tesseract: prepare
	cd $(TESSERACT_PATH) && \
		$(EM) $(EM_FLAGS) $(EM_DEFS) $(LIBS) ./wrapper.cpp *.o -o tesseract-core.js

