#include "baseapi.h"
#include "resultiterator.h"
#include "allheaders.h"
#include "osdetect.h"

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
