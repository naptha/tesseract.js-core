#include <tesseract/baseapi.h>
#include <tesseract/resultiterator.h>
#include <allheaders.h>
#include <tesseract/osdetect.h>
#include <tesseract/ocrclass.h>
#include "dawg.h"
#include "unicharset.h"
#include <tesseract/renderer.h>

namespace tesseract {
	typedef unsigned char* Uint8Array;
	typedef unsigned int* Uint32Array;

	typedef int IntPtr;
	typedef double DoublePtr;
	typedef float FloatPtr;
	typedef bool BoolPtr;

	typedef int* LongStarPtr;

	typedef Orientation Orientation_;
	typedef WritingDirection WritingDirection_;
	typedef TextlineOrder TextlineOrder_;
	typedef ParagraphJustification ParagraphJustification_;

	typedef Pixa* PixaPtr;
	typedef Pix* PixPtr;
	typedef Box* BoxPtr;

	#include "glue.cpp"
}
