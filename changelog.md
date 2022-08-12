## Version 3.0.0
Version 3.0.0 changes provide (1) a significant improvement in performance and (2) compatibility with Node.js 18. 

- Updates Tesseract to version 5
- Added SIMD-enabled build
   - This version is significantly faster on supported devices
   - As SIMD support is only available on certain browsers/devices, it will be up to Tesseract.js and/or application developers to serve the correct version
- Depreciated asm.js build
   - This version is not deleted, however has not been updated and will be deleted in next major release
- Updated emscripten version for compatibility with Node.js 18
- Refactored build scripts
- Added benchmark examples

