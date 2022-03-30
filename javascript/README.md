Tesseract - Javascript version
==============================

This folder contains files for tesseract.js.

```
.
|-- anterior.js         # ...
|-- gen-glue.sh         # generate glue code: glue.cpp & glue.js
|-- glue.js             # generated from gen-glue.sh
|-- src
|   |-- glue.cpp        # generated from gen-glue.sh
|   |-- wrapper.cpp     # wrapper for glue.cpp, use for including headers and declare interface
|-- tesseract.idl       # WebIDL file, check below for details
```

### tesseract.idl

This WebIDL file base on following files:

- src/api/baseapi.h
- src/ccmain/pageiterator.h
- src/ccmain/resultiterator.h
- src/ccstruct/publictypes.h

Basic guidance for converting C/C++ types to WebIDL types:

| C/C++ | WebIDL |
| ----- | ------ |
| void | void |
| const | [Const] |
| char\* | DOMString |
| int | long |
| bool | boolean |
| const unsigned char\* | Uint8Array |
| Pix\* | Pix |
| Pixa\*\* | PixaPtr |
| int\*\* | LongStarPtr |
| ETEXT\_DESC\* | ETEXT\_DESC |
| const & | [Const, Ref] |
| int\* | IntPtr |
| float\* | FloatPtr |
| bool\* | BoolPtr |

> IDL = Interface Description Language, describing APIs implemented in web.
