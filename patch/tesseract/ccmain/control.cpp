--- control.cpp	2018-02-15 21:15:35.933256333 +0800
+++ control.cpp.new	2018-02-16 15:48:35.234230333 +0800
@@ -47,6 +47,7 @@
 #include "globals.h"
 #include "sorthelper.h"
 #include "tesseractclass.h"
+#include <emscripten.h>
 
 #define MIN_FONT_ROW_COUNT  8
 #define MAX_XHEIGHT_DIFF  3
@@ -244,6 +245,11 @@
         return false;
       }
     }
+
+    EM_ASM_ARGS({
+      if(Module['TesseractProgress']) Module['TesseractProgress']($0);
+    }, pass_n == 1 ? (30 + 50 * w / words->size()) : (80 + 10 * w / words->size()));
+
     if (word->word->tess_failed) {
       int s;
       for (s = 0; s < word->lang_words.size() &&
@@ -444,6 +450,11 @@
   if (monitor != NULL) {
     monitor->progress = 100;
   }
+
+  EM_ASM_ARGS({
+      if(Module['TesseractProgress']) Module['TesseractProgress']($0);
+  }, 100);
+
   return true;
 }
 
@@ -611,6 +622,11 @@
       monitor->ocr_alive = TRUE;
       monitor->progress = 95 + 5 * word_index / stats_.word_count;
     }
+
+    EM_ASM_ARGS({
+      if(Module['TesseractProgress']) Module['TesseractProgress']($0);
+    }, 95 + 5 * word_index / stats_.word_count);
+
     if (word->rebuild_word == NULL) {
       // Word was not processed by tesseract.
       page_res_it.forward();
