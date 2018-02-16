--- ltrresultiterator.h	2018-02-15 21:15:35.936593000 +0800
+++ ltrresultiterator.h.new	2018-02-16 13:34:57.669279708 +0800
@@ -25,6 +25,7 @@
 #include "pageiterator.h"
 #include "unichar.h"
 
+class WERD_CHOICE_IT;
 class BLOB_CHOICE_IT;
 class WERD_RES;
 
@@ -45,6 +46,7 @@
 
 class TESS_API LTRResultIterator : public PageIterator {
   friend class ChoiceIterator;
+  friend class WordChoiceIterator;
  public:
   // page_res and tesseract come directly from the BaseAPI.
   // The rectangle parameters are copied indirectly from the Thresholder,
@@ -216,6 +218,38 @@
   BLOB_CHOICE_IT* choice_it_;
 };
 
+// Class to iterate over the classifier choices for a single RIL_SYMBOL.
+class WordChoiceIterator {
+ public:
+  // Construction is from a LTRResultIterator that points to the symbol of
+  // interest. The WordChoiceIterator allows a one-shot iteration over the
+  // choices for this symbol and after that is is useless.
+  explicit WordChoiceIterator(const LTRResultIterator& result_it);
+  ~WordChoiceIterator();
+
+  // Moves to the next choice for the symbol and returns false if there
+  // are none left.
+  bool Next();
+
+  // ============= Accessing data ==============.
+
+  // Returns the null terminated UTF-8 encoded text string for the current
+  // choice.
+  // NOTE: Unlike LTRResultIterator::GetUTF8Text, the return points to an
+  // internal structure and should NOT be delete[]ed to free after use.
+  const char* GetUTF8Text() const;
+
+  // Returns the confidence of the current choice.
+  // The number should be interpreted as a percent probability. (0.0f-100.0f)
+  float Confidence() const;
+
+ private:
+  // Pointer to the WERD_RES object owned by the API.
+  WERD_RES* word_res_;
+  // Iterator over the blob choices.
+  WERD_CHOICE_IT* choice_it_;
+};
+
 }  // namespace tesseract.
 
 #endif  // TESSERACT_CCMAIN_LTR_RESULT_ITERATOR_H_
