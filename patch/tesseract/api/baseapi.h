--- baseapi.h	2018-02-15 21:15:35.913236333 +0800
+++ baseapi.h.new	2018-02-16 13:41:44.008253000 +0800
@@ -178,6 +178,13 @@
    * Print Tesseract parameters to the given file.
    */
   void PrintVariables(FILE *fp) const;
+  
+  /**
+   * Print Tesseract parameters to std
+   */
+  void PrintVariables() {
+    PrintVariables(stdout);
+  }
 
   /**
    * Get value of named variable as a string, if it exists.
