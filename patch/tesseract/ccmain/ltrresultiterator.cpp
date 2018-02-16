--- ltrresultiterator.cpp	2018-02-15 21:15:35.936593000 +0800
+++ ltrresultiterator.cpp.new	2018-02-16 13:26:56.070183146 +0800
@@ -342,6 +342,52 @@
   return false;
 }
 
+WordChoiceIterator::WordChoiceIterator(const LTRResultIterator& result_it) {
+  ASSERT_HOST(result_it.it_->word() != NULL);
+  word_res_ = result_it.it_->word();
+  WERD_CHOICE_LIST* choices = &word_res_->best_choices;
+  if (choices != NULL && !choices->empty()) {
+    choice_it_ = new WERD_CHOICE_IT(choices);
+    choice_it_->mark_cycle_pt();
+  } else {
+    choice_it_ = NULL;
+  }
+}
+
+WordChoiceIterator::~WordChoiceIterator() {
+  delete choice_it_;
+}
+
+// Moves to the next choice for the symbol and returns false if there
+// are none left.
+bool WordChoiceIterator::Next() {
+  if (choice_it_ == NULL)
+    return false;
+  choice_it_->forward();
+  return !choice_it_->cycled_list();
+}
+
+// Returns the null terminated UTF-8 encoded text string for the current
+// choice. Do NOT use delete [] to free after use.
+const char* WordChoiceIterator::GetUTF8Text() const {
+  if (choice_it_ == NULL)
+    return NULL;
+  return choice_it_->data()->unichar_string().string();
+  // UNICHAR_ID id = choice_it_->data()->unichar_id();
+  // return word_res_->uch_set->id_to_unichar_ext(id);
+}
+
+// Returns the confidence of the current choice.
+// The number should be interpreted as a percent probability. (0.0f-100.0f)
+float WordChoiceIterator::Confidence() const {
+  if (choice_it_ == NULL)
+    return 0.0f;
+  float confidence = 100 + 5 * choice_it_->data()->certainty();
+  if (confidence < 0.0f) confidence = 0.0f;
+  if (confidence > 100.0f) confidence = 100.0f;
+  return confidence;
+}
+
 ChoiceIterator::ChoiceIterator(const LTRResultIterator& result_it) {
   ASSERT_HOST(result_it.it_->word() != NULL);
   word_res_ = result_it.it_->word();
