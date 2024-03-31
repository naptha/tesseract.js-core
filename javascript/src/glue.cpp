
#include <emscripten.h>

extern "C" {

// Not using size_t for array indices as the values used by the javascript code are signed.
void array_bounds_check(const int array_size, const int array_idx) {
  if (array_idx < 0 || array_idx >= array_size) {
    EM_ASM({
      throw 'Array index ' + $0 + ' out of bounds: [0,' + $1 + ')';
    }, array_idx, array_size);
  }
}

// ParagraphJustification

void EMSCRIPTEN_KEEPALIVE emscripten_bind_ParagraphJustification___destroy___0(ParagraphJustification* self) {
  delete self;
}

// BoolPtr

void EMSCRIPTEN_KEEPALIVE emscripten_bind_BoolPtr___destroy___0(BoolPtr* self) {
  delete self;
}

// TessResultRenderer

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_TessResultRenderer_BeginDocument_1(TessResultRenderer* self, const char* title) {
  return self->BeginDocument(title);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_TessResultRenderer_AddImage_1(TessResultRenderer* self, TessBaseAPI* api) {
  return self->AddImage(api);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_TessResultRenderer_EndDocument_0(TessResultRenderer* self) {
  return self->EndDocument();
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_TessResultRenderer_happy_0(TessResultRenderer* self) {
  return self->happy();
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_TessResultRenderer_file_extension_0(TessResultRenderer* self) {
  return self->file_extension();
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_TessResultRenderer_title_0(TessResultRenderer* self) {
  return self->title();
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_TessResultRenderer_imagenum_0(TessResultRenderer* self) {
  return self->imagenum();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TessResultRenderer___destroy___0(TessResultRenderer* self) {
  delete self;
}

// LongStarPtr

void EMSCRIPTEN_KEEPALIVE emscripten_bind_LongStarPtr___destroy___0(LongStarPtr* self) {
  delete self;
}

// VoidPtr

void EMSCRIPTEN_KEEPALIVE emscripten_bind_VoidPtr___destroy___0(void** self) {
  delete self;
}

// ResultIterator

ResultIterator* EMSCRIPTEN_KEEPALIVE emscripten_bind_ResultIterator_ResultIterator_1(const ResultIterator* resit) {
  return new ResultIterator(*resit);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_ResultIterator_Begin_0(ResultIterator* self) {
  self->Begin();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_ResultIterator_RestartParagraph_0(ResultIterator* self) {
  self->RestartParagraph();
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_ResultIterator_IsWithinFirstTextlineOfParagraph_0(ResultIterator* self) {
  return self->IsWithinFirstTextlineOfParagraph();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_ResultIterator_RestartRow_0(ResultIterator* self) {
  self->RestartRow();
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_ResultIterator_Next_1(ResultIterator* self, PageIteratorLevel level) {
  return self->Next(level);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_ResultIterator_IsAtBeginningOf_1(ResultIterator* self, PageIteratorLevel level) {
  return self->IsAtBeginningOf(level);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_ResultIterator_IsAtFinalElement_2(ResultIterator* self, PageIteratorLevel level, PageIteratorLevel element) {
  return self->IsAtFinalElement(level, element);
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_ResultIterator_Cmp_1(ResultIterator* self, const PageIterator* other) {
  return self->Cmp(*other);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_ResultIterator_SetBoundingBoxComponents_2(ResultIterator* self, bool include_upper_dots, bool include_lower_dots) {
  self->SetBoundingBoxComponents(include_upper_dots, include_lower_dots);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_ResultIterator_BoundingBox_5(ResultIterator* self, PageIteratorLevel level, IntPtr* padding, IntPtr* left, IntPtr* top, IntPtr* right) {
  return self->BoundingBox(level, padding, left, top, right);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_ResultIterator_BoundingBox_6(ResultIterator* self, PageIteratorLevel level, const int padding, IntPtr* left, IntPtr* top, IntPtr* right, IntPtr* bottom) {
  return self->BoundingBox(level, padding, left, top, right, bottom);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_ResultIterator_BoundingBoxInternal_5(ResultIterator* self, PageIteratorLevel level, IntPtr* left, IntPtr* top, IntPtr* right, IntPtr* bottom) {
  return self->BoundingBoxInternal(level, left, top, right, bottom);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_ResultIterator_Empty_1(ResultIterator* self, PageIteratorLevel level) {
  return self->Empty(level);
}

PolyBlockType EMSCRIPTEN_KEEPALIVE emscripten_bind_ResultIterator_BlockType_0(ResultIterator* self) {
  return self->BlockType();
}

Pta* EMSCRIPTEN_KEEPALIVE emscripten_bind_ResultIterator_BlockPolygon_0(ResultIterator* self) {
  return self->BlockPolygon();
}

Pix* EMSCRIPTEN_KEEPALIVE emscripten_bind_ResultIterator_GetBinaryImage_1(ResultIterator* self, PageIteratorLevel level) {
  return self->GetBinaryImage(level);
}

Pix* EMSCRIPTEN_KEEPALIVE emscripten_bind_ResultIterator_GetImage_5(ResultIterator* self, PageIteratorLevel level, int padding, Pix* original_img, IntPtr* left, IntPtr* top) {
  return self->GetImage(level, padding, original_img, left, top);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_ResultIterator_Baseline_5(ResultIterator* self, PageIteratorLevel level, IntPtr* x1, IntPtr* y1, IntPtr* x2, IntPtr* y2) {
  return self->Baseline(level, x1, y1, x2, y2);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_ResultIterator_RowAttributes_3(ResultIterator* self, float *row_height, float *descenders, float *ascenders) {
  return self->RowAttributes(row_height, descenders, ascenders);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_ResultIterator_Orientation_4(ResultIterator* self, Orientation* orientation, WritingDirection* writing_direction, TextlineOrder* textline_order, FloatPtr* deskew_angle) {
  self->Orientation(orientation, writing_direction, textline_order, deskew_angle);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_ResultIterator_ParagraphInfo_4(ResultIterator* self, ParagraphJustification* justification, BoolPtr* is_list_item, BoolPtr* is_crown, IntPtr* first_line_indent) {
  self->ParagraphInfo(justification, is_list_item, is_crown, first_line_indent);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_ResultIterator_ParagraphIsLtr_0(ResultIterator* self) {
  return self->ParagraphIsLtr();
}

char* EMSCRIPTEN_KEEPALIVE emscripten_bind_ResultIterator_GetUTF8Text_1(ResultIterator* self, PageIteratorLevel level) {
  return self->GetUTF8Text(level);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_ResultIterator_SetLineSeparator_1(ResultIterator* self, const char* new_line) {
  self->SetLineSeparator(new_line);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_ResultIterator_SetParagraphSeparator_1(ResultIterator* self, const char* new_para) {
  self->SetParagraphSeparator(new_para);
}

float EMSCRIPTEN_KEEPALIVE emscripten_bind_ResultIterator_Confidence_1(ResultIterator* self, PageIteratorLevel level) {
  return self->Confidence(level);
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_ResultIterator_WordFontAttributes_8(ResultIterator* self, BoolPtr* is_bold, BoolPtr* is_italic, BoolPtr* is_underlined, BoolPtr* is_monospace, BoolPtr* is_serif, BoolPtr* is_smallcaps, IntPtr* pointsize, IntPtr* font_id) {
  return self->WordFontAttributes(is_bold, is_italic, is_underlined, is_monospace, is_serif, is_smallcaps, pointsize, font_id);
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_ResultIterator_WordRecognitionLanguage_0(ResultIterator* self) {
  return self->WordRecognitionLanguage();
}

StrongScriptDirection EMSCRIPTEN_KEEPALIVE emscripten_bind_ResultIterator_WordDirection_0(ResultIterator* self) {
  return self->WordDirection();
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_ResultIterator_WordIsFromDictionary_0(ResultIterator* self) {
  return self->WordIsFromDictionary();
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_ResultIterator_WordIsNumeric_0(ResultIterator* self) {
  return self->WordIsNumeric();
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_ResultIterator_HasBlamerInfo_0(ResultIterator* self) {
  return self->HasBlamerInfo();
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_ResultIterator_HasTruthString_0(ResultIterator* self) {
  return self->HasTruthString();
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_ResultIterator_EquivalentToTruth_1(ResultIterator* self, const char* str) {
  return self->EquivalentToTruth(str);
}

char* EMSCRIPTEN_KEEPALIVE emscripten_bind_ResultIterator_WordTruthUTF8Text_0(ResultIterator* self) {
  return self->WordTruthUTF8Text();
}

char* EMSCRIPTEN_KEEPALIVE emscripten_bind_ResultIterator_WordNormedUTF8Text_0(ResultIterator* self) {
  return self->WordNormedUTF8Text();
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_ResultIterator_WordLattice_1(ResultIterator* self, IntPtr* lattice_size) {
  return self->WordLattice(lattice_size);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_ResultIterator_SymbolIsSuperscript_0(ResultIterator* self) {
  return self->SymbolIsSuperscript();
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_ResultIterator_SymbolIsSubscript_0(ResultIterator* self) {
  return self->SymbolIsSubscript();
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_ResultIterator_SymbolIsDropcap_0(ResultIterator* self) {
  return self->SymbolIsDropcap();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_ResultIterator___destroy___0(ResultIterator* self) {
  delete self;
}

// TextlineOrder

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TextlineOrder___destroy___0(TextlineOrder* self) {
  delete self;
}

// ETEXT_DESC

void EMSCRIPTEN_KEEPALIVE emscripten_bind_ETEXT_DESC___destroy___0(ETEXT_DESC* self) {
  delete self;
}

// PageIterator

void EMSCRIPTEN_KEEPALIVE emscripten_bind_PageIterator_Begin_0(PageIterator* self) {
  self->Begin();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_PageIterator_RestartParagraph_0(PageIterator* self) {
  self->RestartParagraph();
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_PageIterator_IsWithinFirstTextlineOfParagraph_0(PageIterator* self) {
  return self->IsWithinFirstTextlineOfParagraph();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_PageIterator_RestartRow_0(PageIterator* self) {
  self->RestartRow();
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_PageIterator_Next_1(PageIterator* self, PageIteratorLevel level) {
  return self->Next(level);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_PageIterator_IsAtBeginningOf_1(PageIterator* self, PageIteratorLevel level) {
  return self->IsAtBeginningOf(level);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_PageIterator_IsAtFinalElement_2(PageIterator* self, PageIteratorLevel level, PageIteratorLevel element) {
  return self->IsAtFinalElement(level, element);
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_PageIterator_Cmp_1(PageIterator* self, const PageIterator* other) {
  return self->Cmp(*other);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_PageIterator_SetBoundingBoxComponents_2(PageIterator* self, bool include_upper_dots, bool include_lower_dots) {
  self->SetBoundingBoxComponents(include_upper_dots, include_lower_dots);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_PageIterator_BoundingBox_5(PageIterator* self, PageIteratorLevel level, IntPtr* padding, IntPtr* left, IntPtr* top, IntPtr* right) {
  return self->BoundingBox(level, padding, left, top, right);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_PageIterator_BoundingBox_6(PageIterator* self, PageIteratorLevel level, const int padding, IntPtr* left, IntPtr* top, IntPtr* right, IntPtr* bottom) {
  return self->BoundingBox(level, padding, left, top, right, bottom);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_PageIterator_BoundingBoxInternal_5(PageIterator* self, PageIteratorLevel level, IntPtr* left, IntPtr* top, IntPtr* right, IntPtr* bottom) {
  return self->BoundingBoxInternal(level, left, top, right, bottom);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_PageIterator_Empty_1(PageIterator* self, PageIteratorLevel level) {
  return self->Empty(level);
}

PolyBlockType EMSCRIPTEN_KEEPALIVE emscripten_bind_PageIterator_BlockType_0(PageIterator* self) {
  return self->BlockType();
}

Pta* EMSCRIPTEN_KEEPALIVE emscripten_bind_PageIterator_BlockPolygon_0(PageIterator* self) {
  return self->BlockPolygon();
}

Pix* EMSCRIPTEN_KEEPALIVE emscripten_bind_PageIterator_GetBinaryImage_1(PageIterator* self, PageIteratorLevel level) {
  return self->GetBinaryImage(level);
}

Pix* EMSCRIPTEN_KEEPALIVE emscripten_bind_PageIterator_GetImage_5(PageIterator* self, PageIteratorLevel level, int padding, Pix* original_img, IntPtr* left, IntPtr* top) {
  return self->GetImage(level, padding, original_img, left, top);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_PageIterator_Baseline_5(PageIterator* self, PageIteratorLevel level, IntPtr* x1, IntPtr* y1, IntPtr* x2, IntPtr* y2) {
  return self->Baseline(level, x1, y1, x2, y2);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_PageIterator_Orientation_4(PageIterator* self, Orientation* orientation, WritingDirection* writing_direction, TextlineOrder* textline_order, FloatPtr* deskew_angle) {
  self->Orientation(orientation, writing_direction, textline_order, deskew_angle);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_PageIterator_ParagraphInfo_4(PageIterator* self, ParagraphJustification* justification, BoolPtr* is_list_item, BoolPtr* is_crown, IntPtr* first_line_indent) {
  self->ParagraphInfo(justification, is_list_item, is_crown, first_line_indent);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_PageIterator___destroy___0(PageIterator* self) {
  delete self;
}

// WritingDirection

void EMSCRIPTEN_KEEPALIVE emscripten_bind_WritingDirection___destroy___0(WritingDirection* self) {
  delete self;
}

// WordChoiceIterator

WordChoiceIterator* EMSCRIPTEN_KEEPALIVE emscripten_bind_WordChoiceIterator_WordChoiceIterator_1(const ResultIterator* result_it) {
  return new WordChoiceIterator(*result_it);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_WordChoiceIterator_Next_0(WordChoiceIterator* self) {
  return self->Next();
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_WordChoiceIterator_GetUTF8Text_0(WordChoiceIterator* self) {
  return self->GetUTF8Text();
}

float EMSCRIPTEN_KEEPALIVE emscripten_bind_WordChoiceIterator_Confidence_0(WordChoiceIterator* self) {
  return self->Confidence();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_WordChoiceIterator___destroy___0(WordChoiceIterator* self) {
  delete self;
}

// Box

int EMSCRIPTEN_KEEPALIVE emscripten_bind_Box_get_x_0(Box* self) {
  return self->x;
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_Box_get_y_0(Box* self) {
  return self->y;
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_Box_get_w_0(Box* self) {
  return self->w;
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_Box_get_h_0(Box* self) {
  return self->h;
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_Box_get_refcount_0(Box* self) {
  return self->refcount;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Box___destroy___0(Box* self) {
  delete self;
}

// TessPDFRenderer

TessPDFRenderer* EMSCRIPTEN_KEEPALIVE emscripten_bind_TessPDFRenderer_TessPDFRenderer_3(const char* outputbase, const char* datadir, bool textonly) {
  return new TessPDFRenderer(outputbase, datadir, textonly);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_TessPDFRenderer_BeginDocument_1(TessPDFRenderer* self, const char* title) {
  return self->BeginDocument(title);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_TessPDFRenderer_AddImage_1(TessPDFRenderer* self, TessBaseAPI* api) {
  return self->AddImage(api);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_TessPDFRenderer_EndDocument_0(TessPDFRenderer* self) {
  return self->EndDocument();
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_TessPDFRenderer_happy_0(TessPDFRenderer* self) {
  return self->happy();
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_TessPDFRenderer_file_extension_0(TessPDFRenderer* self) {
  return self->file_extension();
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_TessPDFRenderer_title_0(TessPDFRenderer* self) {
  return self->title();
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_TessPDFRenderer_imagenum_0(TessPDFRenderer* self) {
  return self->imagenum();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TessPDFRenderer___destroy___0(TessPDFRenderer* self) {
  delete self;
}

// PixaPtr

void EMSCRIPTEN_KEEPALIVE emscripten_bind_PixaPtr___destroy___0(PixaPtr* self) {
  delete self;
}

// FloatPtr

void EMSCRIPTEN_KEEPALIVE emscripten_bind_FloatPtr___destroy___0(FloatPtr* self) {
  delete self;
}

// ChoiceIterator

ChoiceIterator* EMSCRIPTEN_KEEPALIVE emscripten_bind_ChoiceIterator_ChoiceIterator_1(const ResultIterator* result_it) {
  return new ChoiceIterator(*result_it);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_ChoiceIterator_Next_0(ChoiceIterator* self) {
  return self->Next();
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_ChoiceIterator_GetUTF8Text_0(ChoiceIterator* self) {
  return self->GetUTF8Text();
}

float EMSCRIPTEN_KEEPALIVE emscripten_bind_ChoiceIterator_Confidence_0(ChoiceIterator* self) {
  return self->Confidence();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_ChoiceIterator___destroy___0(ChoiceIterator* self) {
  delete self;
}

// PixPtr

void EMSCRIPTEN_KEEPALIVE emscripten_bind_PixPtr___destroy___0(PixPtr* self) {
  delete self;
}

// UNICHARSET

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_UNICHARSET_get_script_from_script_id_1(UNICHARSET* self, int id) {
  return self->get_script_from_script_id(id);
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_UNICHARSET_get_script_id_from_name_1(UNICHARSET* self, const char* script_name) {
  return self->get_script_id_from_name(script_name);
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_UNICHARSET_get_script_table_size_0(UNICHARSET* self) {
  return self->get_script_table_size();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_UNICHARSET___destroy___0(UNICHARSET* self) {
  delete self;
}

// IntPtr

void EMSCRIPTEN_KEEPALIVE emscripten_bind_IntPtr___destroy___0(IntPtr* self) {
  delete self;
}

// Orientation

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Orientation___destroy___0(Orientation* self) {
  delete self;
}

// OSBestResult

int EMSCRIPTEN_KEEPALIVE emscripten_bind_OSBestResult_get_orientation_id_0(OSBestResult* self) {
  return self->orientation_id;
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_OSBestResult_get_script_id_0(OSBestResult* self) {
  return self->script_id;
}

float EMSCRIPTEN_KEEPALIVE emscripten_bind_OSBestResult_get_sconfidence_0(OSBestResult* self) {
  return self->sconfidence;
}

float EMSCRIPTEN_KEEPALIVE emscripten_bind_OSBestResult_get_oconfidence_0(OSBestResult* self) {
  return self->oconfidence;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_OSBestResult___destroy___0(OSBestResult* self) {
  delete self;
}

// Boxa

int EMSCRIPTEN_KEEPALIVE emscripten_bind_Boxa_get_n_0(Boxa* self) {
  return self->n;
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_Boxa_get_nalloc_0(Boxa* self) {
  return self->nalloc;
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_Boxa_get_refcount_0(Boxa* self) {
  return self->refcount;
}

BoxPtr* EMSCRIPTEN_KEEPALIVE emscripten_bind_Boxa_get_box_0(Boxa* self) {
  return self->box;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Boxa___destroy___0(Boxa* self) {
  delete self;
}

// PixColormap

void* EMSCRIPTEN_KEEPALIVE emscripten_bind_PixColormap_get_array_0(PixColormap* self) {
  return self->array;
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_PixColormap_get_depth_0(PixColormap* self) {
  return self->depth;
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_PixColormap_get_nalloc_0(PixColormap* self) {
  return self->nalloc;
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_PixColormap_get_n_0(PixColormap* self) {
  return self->n;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_PixColormap___destroy___0(PixColormap* self) {
  delete self;
}

// Pta

int EMSCRIPTEN_KEEPALIVE emscripten_bind_Pta_get_n_0(Pta* self) {
  return self->n;
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_Pta_get_nalloc_0(Pta* self) {
  return self->nalloc;
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_Pta_get_refcount_0(Pta* self) {
  return self->refcount;
}

FloatPtr* EMSCRIPTEN_KEEPALIVE emscripten_bind_Pta_get_x_0(Pta* self) {
  return self->x;
}

FloatPtr* EMSCRIPTEN_KEEPALIVE emscripten_bind_Pta_get_y_0(Pta* self) {
  return self->y;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Pta___destroy___0(Pta* self) {
  delete self;
}

// Pix

int EMSCRIPTEN_KEEPALIVE emscripten_bind_Pix_get_w_0(Pix* self) {
  return self->w;
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_Pix_get_h_0(Pix* self) {
  return self->h;
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_Pix_get_d_0(Pix* self) {
  return self->d;
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_Pix_get_spp_0(Pix* self) {
  return self->spp;
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_Pix_get_wpl_0(Pix* self) {
  return self->wpl;
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_Pix_get_refcount_0(Pix* self) {
  return self->refcount;
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_Pix_get_xres_0(Pix* self) {
  return self->xres;
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_Pix_get_yres_0(Pix* self) {
  return self->yres;
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_Pix_get_informat_0(Pix* self) {
  return self->informat;
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_Pix_get_special_0(Pix* self) {
  return self->special;
}

char* EMSCRIPTEN_KEEPALIVE emscripten_bind_Pix_get_text_0(Pix* self) {
  return self->text;
}

PixColormap* EMSCRIPTEN_KEEPALIVE emscripten_bind_Pix_get_colormap_0(Pix* self) {
  return self->colormap;
}

Uint32Array EMSCRIPTEN_KEEPALIVE emscripten_bind_Pix_get_data_0(Pix* self) {
  return self->data;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Pix___destroy___0(Pix* self) {
  delete self;
}

// DoublePtr

void EMSCRIPTEN_KEEPALIVE emscripten_bind_DoublePtr___destroy___0(DoublePtr* self) {
  delete self;
}

// Dawg

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Dawg___destroy___0(Dawg* self) {
  delete self;
}

// BoxPtr

void EMSCRIPTEN_KEEPALIVE emscripten_bind_BoxPtr___destroy___0(BoxPtr* self) {
  delete self;
}

// TessBaseAPI

TessBaseAPI* EMSCRIPTEN_KEEPALIVE emscripten_bind_TessBaseAPI_TessBaseAPI_0() {
  return new TessBaseAPI();
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_TessBaseAPI_Version_0(TessBaseAPI* self) {
  return self->Version();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TessBaseAPI_SetInputName_1(TessBaseAPI* self, const char* name) {
  self->SetInputName(name);
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_TessBaseAPI_GetInputName_0(TessBaseAPI* self) {
  return self->GetInputName();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TessBaseAPI_SetInputImage_1(TessBaseAPI* self, Pix* pix) {
  self->SetInputImage(pix);
}

Pix* EMSCRIPTEN_KEEPALIVE emscripten_bind_TessBaseAPI_GetInputImage_0(TessBaseAPI* self) {
  return self->GetInputImage();
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_TessBaseAPI_GetSourceYResolution_0(TessBaseAPI* self) {
  return self->GetSourceYResolution();
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_TessBaseAPI_GetDatapath_0(TessBaseAPI* self) {
  return self->GetDatapath();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TessBaseAPI_SetOutputName_1(TessBaseAPI* self, const char* name) {
  self->SetOutputName(name);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_TessBaseAPI_SetVariable_2(TessBaseAPI* self, const char* name, const char* value) {
  return self->SetVariable(name, value);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_TessBaseAPI_SetDebugVariable_2(TessBaseAPI* self, const char* name, const char* value) {
  return self->SetDebugVariable(name, value);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_TessBaseAPI_GetIntVariable_2(TessBaseAPI* self, const char* name, IntPtr* value) {
  return self->GetIntVariable(name, value);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_TessBaseAPI_GetBoolVariable_2(TessBaseAPI* self, const char* name, BoolPtr* value) {
  return self->GetBoolVariable(name, value);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_TessBaseAPI_GetDoubleVariable_2(TessBaseAPI* self, const char* name, DoublePtr* value) {
  return self->GetDoubleVariable(name, value);
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_TessBaseAPI_GetStringVariable_1(TessBaseAPI* self, const char* name) {
  return self->GetStringVariable(name);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TessBaseAPI_SaveParameters_1(TessBaseAPI* self) {
  return self->SaveParameters();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TessBaseAPI_RestoreParameters_1(TessBaseAPI* self) {
  return self->RestoreParameters();
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_TessBaseAPI_Init_2(TessBaseAPI* self, const char* datapath, const char* language) {
  return self->Init(datapath, language);
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_TessBaseAPI_Init_3(TessBaseAPI* self, const char* datapath, const char* language, OcrEngineMode oem) {
  return self->Init(datapath, language, oem);
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_TessBaseAPI_Init_4(TessBaseAPI* self, const char* datapath, const char* language, OcrEngineMode oem, char* config) {
  char *configs[64] = {config};
  return self->Init(datapath, language, oem, configs, 1, nullptr, nullptr, false);
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_TessBaseAPI_GetInitLanguagesAsString_0(TessBaseAPI* self) {
  return self->GetInitLanguagesAsString();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TessBaseAPI_InitForAnalysePage_0(TessBaseAPI* self) {
  self->InitForAnalysePage();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TessBaseAPI_ReadConfigFile_1(TessBaseAPI* self, const char* filename) {
  self->ReadConfigFile(filename);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TessBaseAPI_ReadDebugConfigFile_1(TessBaseAPI* self, const char* filename) {
  self->ReadDebugConfigFile(filename);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TessBaseAPI_SetPageSegMode_1(TessBaseAPI* self, PageSegMode mode) {
  self->SetPageSegMode(mode);
}

PageSegMode EMSCRIPTEN_KEEPALIVE emscripten_bind_TessBaseAPI_GetPageSegMode_0(TessBaseAPI* self) {
  return self->GetPageSegMode();
}

char* EMSCRIPTEN_KEEPALIVE emscripten_bind_TessBaseAPI_TesseractRect_7(TessBaseAPI* self, const Uint8Array imagedata, int bytes_per_pixel, int bytes_per_line, int left, int top, int width, int height) {
  return self->TesseractRect(imagedata, bytes_per_pixel, bytes_per_line, left, top, width, height);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TessBaseAPI_ClearAdaptiveClassifier_0(TessBaseAPI* self) {
  self->ClearAdaptiveClassifier();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TessBaseAPI_SetImage_1(TessBaseAPI* self, Pix* imagedata, int exif, const float angle) {
  self->SetImage(imagedata, exif, angle);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TessBaseAPI_SetImage_5(TessBaseAPI* self, const Uint8Array imagedata, int width, int height, int bytes_per_pixel, int bytes_per_line, int exif, const float angle) {
  self->SetImage(imagedata, width, height, bytes_per_pixel, bytes_per_line, exif, angle);
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_TessBaseAPI_SetImageFile_1(TessBaseAPI* self, int exif, const float angle) {
  return self->SetImageFile(exif, angle);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TessBaseAPI_SetSourceResolution_1(TessBaseAPI* self, int ppi) {
  self->SetSourceResolution(ppi);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TessBaseAPI_SetRectangle_4(TessBaseAPI* self, int left, int top, int width, int height) {
  self->SetRectangle(left, top, width, height);
}

Pix* EMSCRIPTEN_KEEPALIVE emscripten_bind_TessBaseAPI_GetThresholdedImage_0(TessBaseAPI* self) {
  return self->GetThresholdedImage();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TessBaseAPI_WriteImage_0(TessBaseAPI* self, const int type) {
  return self->WriteImage(type);
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_TessBaseAPI_FindLines_0(TessBaseAPI* self) {
  return self->FindLines();
}

float EMSCRIPTEN_KEEPALIVE emscripten_bind_TessBaseAPI_GetGradient_0(TessBaseAPI* self) {
  return self->GetGradient();
}

Boxa* EMSCRIPTEN_KEEPALIVE emscripten_bind_TessBaseAPI_GetRegions_1(TessBaseAPI* self, PixaPtr* pixa) {
  return self->GetRegions(pixa);
}

Boxa* EMSCRIPTEN_KEEPALIVE emscripten_bind_TessBaseAPI_GetTextlines_2(TessBaseAPI* self, PixaPtr* raw_image, LongStarPtr* raw_padding) {
  return self->GetTextlines(raw_image, raw_padding);
}

Boxa* EMSCRIPTEN_KEEPALIVE emscripten_bind_TessBaseAPI_GetTextlines_5(TessBaseAPI* self, const bool raw_image, const int raw_padding, PixaPtr* pixa, LongStarPtr* blockids, LongStarPtr* paraids) {
  return self->GetTextlines(raw_image, raw_padding, pixa, blockids, paraids);
}

Boxa* EMSCRIPTEN_KEEPALIVE emscripten_bind_TessBaseAPI_GetStrips_2(TessBaseAPI* self, PixaPtr* pixa, LongStarPtr* blockids) {
  return self->GetStrips(pixa, blockids);
}

Boxa* EMSCRIPTEN_KEEPALIVE emscripten_bind_TessBaseAPI_GetWords_1(TessBaseAPI* self, PixaPtr* pixa) {
  return self->GetWords(pixa);
}

Boxa* EMSCRIPTEN_KEEPALIVE emscripten_bind_TessBaseAPI_GetConnectedComponents_1(TessBaseAPI* self, PixaPtr* cc) {
  return self->GetConnectedComponents(cc);
}

Boxa* EMSCRIPTEN_KEEPALIVE emscripten_bind_TessBaseAPI_GetComponentImages_4(TessBaseAPI* self, const PageIteratorLevel level, const bool text_only, PixaPtr* raw_image, LongStarPtr* raw_padding) {
  return self->GetComponentImages(level, text_only, raw_image, raw_padding);
}

Boxa* EMSCRIPTEN_KEEPALIVE emscripten_bind_TessBaseAPI_GetComponentImages_7(TessBaseAPI* self, const PageIteratorLevel level, const bool text_only, const bool raw_image, const int raw_padding, PixaPtr* pixa, LongStarPtr* blockids, LongStarPtr* paraids) {
  return self->GetComponentImages(level, text_only, raw_image, raw_padding, pixa, blockids, paraids);
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_TessBaseAPI_GetThresholdedImageScaleFactor_0(TessBaseAPI* self) {
  return self->GetThresholdedImageScaleFactor();
}

PageIterator* EMSCRIPTEN_KEEPALIVE emscripten_bind_TessBaseAPI_AnalyseLayout_0(TessBaseAPI* self) {
  return self->AnalyseLayout();
}

PageIterator* EMSCRIPTEN_KEEPALIVE emscripten_bind_TessBaseAPI_AnalyseLayout_1(TessBaseAPI* self, bool merge_similar_words) {
  return self->AnalyseLayout(merge_similar_words);
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_TessBaseAPI_Recognize_1(TessBaseAPI* self, ETEXT_DESC* monitor) {
  return self->Recognize(monitor);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_TessBaseAPI_ProcessPages_4(TessBaseAPI* self, const char* filename, const char* retry_config, int timeout_millisec, TessResultRenderer* renderer) {
  return self->ProcessPages(filename, retry_config, timeout_millisec, renderer);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_TessBaseAPI_ProcessPage_6(TessBaseAPI* self, Pix* pix, int page_index, const char* filename, const char* retry_config, int timeout_millisec, TessResultRenderer* renderer) {
  return self->ProcessPage(pix, page_index, filename, retry_config, timeout_millisec, renderer);
}

ResultIterator* EMSCRIPTEN_KEEPALIVE emscripten_bind_TessBaseAPI_GetIterator_0(TessBaseAPI* self) {
  return self->GetIterator();
}

char* EMSCRIPTEN_KEEPALIVE emscripten_bind_TessBaseAPI_GetUTF8Text_0(TessBaseAPI* self) {
  return self->GetUTF8Text();
}

char* EMSCRIPTEN_KEEPALIVE emscripten_bind_TessBaseAPI_GetHOCRText_1(TessBaseAPI* self, int page_number) {
  return self->GetHOCRText(page_number);
}

char* EMSCRIPTEN_KEEPALIVE emscripten_bind_TessBaseAPI_GetTSVText_1(TessBaseAPI* self, int page_number) {
  return self->GetTSVText(page_number);
}

char* EMSCRIPTEN_KEEPALIVE emscripten_bind_TessBaseAPI_GetBoxText_1(TessBaseAPI* self, int page_number) {
  return self->GetBoxText(page_number);
}

char* EMSCRIPTEN_KEEPALIVE emscripten_bind_TessBaseAPI_GetUNLVText_0(TessBaseAPI* self) {
  return self->GetUNLVText();
}

char* EMSCRIPTEN_KEEPALIVE emscripten_bind_TessBaseAPI_GetOsdText_1(TessBaseAPI* self, int page_number) {
  return self->GetOsdText(page_number);
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_TessBaseAPI_MeanTextConf_0(TessBaseAPI* self) {
  return self->MeanTextConf();
}

IntPtr* EMSCRIPTEN_KEEPALIVE emscripten_bind_TessBaseAPI_AllWordConfidences_0(TessBaseAPI* self) {
  return self->AllWordConfidences();
}

// This function does not exist in LSTM-only build so causes errors.
// Eliminating it completely to avoid confusion.
// bool EMSCRIPTEN_KEEPALIVE emscripten_bind_TessBaseAPI_AdaptToWordStr_2(TessBaseAPI* self, PageSegMode mode, const char* wordstr) {
//   return self->AdaptToWordStr(mode, wordstr);
// }

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TessBaseAPI_Clear_0(TessBaseAPI* self) {
  self->Clear();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TessBaseAPI_End_0(TessBaseAPI* self) {
  self->End();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TessBaseAPI_ClearPersistentCache_0(TessBaseAPI* self) {
  self->ClearPersistentCache();
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_TessBaseAPI_IsValidWord_1(TessBaseAPI* self, const char* word) {
  return self->IsValidWord(word);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_TessBaseAPI_IsValidCharacter_1(TessBaseAPI* self, const char* utf8_character) {
  return self->IsValidCharacter(utf8_character);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_TessBaseAPI_DetectOS_1(TessBaseAPI* self, OSResults* osr) {
  return self->DetectOS(osr);
}

const char* EMSCRIPTEN_KEEPALIVE emscripten_bind_TessBaseAPI_GetUnichar_1(TessBaseAPI* self, int unichar_id) {
  return self->GetUnichar(unichar_id);
}

const Dawg* EMSCRIPTEN_KEEPALIVE emscripten_bind_TessBaseAPI_GetDawg_1(TessBaseAPI* self, int i) {
  return self->GetDawg(i);
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_TessBaseAPI_NumDawgs_0(TessBaseAPI* self) {
  return self->NumDawgs();
}

const OcrEngineMode EMSCRIPTEN_KEEPALIVE emscripten_bind_TessBaseAPI_oem_0(TessBaseAPI* self) {
  return self->oem();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TessBaseAPI___destroy___0(TessBaseAPI* self) {
  delete self;
}

// OSResults

OSResults* EMSCRIPTEN_KEEPALIVE emscripten_bind_OSResults_OSResults_0() {
  return new OSResults();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_OSResults_print_scores_0(OSResults* self) {
  self->print_scores();
}

OSBestResult* EMSCRIPTEN_KEEPALIVE emscripten_bind_OSResults_get_best_result_0(OSResults* self) {
  return &self->best_result;
}

UNICHARSET* EMSCRIPTEN_KEEPALIVE emscripten_bind_OSResults_get_unicharset_0(OSResults* self) {
  return self->unicharset;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_OSResults___destroy___0(OSResults* self) {
  delete self;
}

// Pixa

int EMSCRIPTEN_KEEPALIVE emscripten_bind_Pixa_get_n_0(Pixa* self) {
  return self->n;
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_Pixa_get_nalloc_0(Pixa* self) {
  return self->nalloc;
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_Pixa_get_refcount_0(Pixa* self) {
  return self->refcount;
}

PixPtr* EMSCRIPTEN_KEEPALIVE emscripten_bind_Pixa_get_pix_0(Pixa* self) {
  return self->pix;
}

Boxa* EMSCRIPTEN_KEEPALIVE emscripten_bind_Pixa_get_boxa_0(Pixa* self) {
  return self->boxa;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Pixa___destroy___0(Pixa* self) {
  delete self;
}

// PageIteratorLevel
PageIteratorLevel EMSCRIPTEN_KEEPALIVE emscripten_enum_PageIteratorLevel_RIL_BLOCK() {
  return RIL_BLOCK;
}
PageIteratorLevel EMSCRIPTEN_KEEPALIVE emscripten_enum_PageIteratorLevel_RIL_PARA() {
  return RIL_PARA;
}
PageIteratorLevel EMSCRIPTEN_KEEPALIVE emscripten_enum_PageIteratorLevel_RIL_TEXTLINE() {
  return RIL_TEXTLINE;
}
PageIteratorLevel EMSCRIPTEN_KEEPALIVE emscripten_enum_PageIteratorLevel_RIL_WORD() {
  return RIL_WORD;
}
PageIteratorLevel EMSCRIPTEN_KEEPALIVE emscripten_enum_PageIteratorLevel_RIL_SYMBOL() {
  return RIL_SYMBOL;
}

// OcrEngineMode
OcrEngineMode EMSCRIPTEN_KEEPALIVE emscripten_enum_OcrEngineMode_OEM_TESSERACT_ONLY() {
  return OEM_TESSERACT_ONLY;
}
OcrEngineMode EMSCRIPTEN_KEEPALIVE emscripten_enum_OcrEngineMode_OEM_LSTM_ONLY() {
  return OEM_LSTM_ONLY;
}
OcrEngineMode EMSCRIPTEN_KEEPALIVE emscripten_enum_OcrEngineMode_OEM_TESSERACT_LSTM_COMBINED() {
  return OEM_TESSERACT_LSTM_COMBINED;
}
OcrEngineMode EMSCRIPTEN_KEEPALIVE emscripten_enum_OcrEngineMode_OEM_DEFAULT() {
  return OEM_DEFAULT;
}
OcrEngineMode EMSCRIPTEN_KEEPALIVE emscripten_enum_OcrEngineMode_OEM_COUNT() {
  return OEM_COUNT;
}

// WritingDirection_
WritingDirection_ EMSCRIPTEN_KEEPALIVE emscripten_enum_WritingDirection__WRITING_DIRECTION_LEFT_TO_RIGHT() {
  return WRITING_DIRECTION_LEFT_TO_RIGHT;
}
WritingDirection_ EMSCRIPTEN_KEEPALIVE emscripten_enum_WritingDirection__WRITING_DIRECTION_RIGHT_TO_LEFT() {
  return WRITING_DIRECTION_RIGHT_TO_LEFT;
}
WritingDirection_ EMSCRIPTEN_KEEPALIVE emscripten_enum_WritingDirection__WRITING_DIRECTION_TOP_TO_BOTTOM() {
  return WRITING_DIRECTION_TOP_TO_BOTTOM;
}

// PolyBlockType
PolyBlockType EMSCRIPTEN_KEEPALIVE emscripten_enum_PolyBlockType_PT_UNKNOWN() {
  return PT_UNKNOWN;
}
PolyBlockType EMSCRIPTEN_KEEPALIVE emscripten_enum_PolyBlockType_PT_FLOWING_TEXT() {
  return PT_FLOWING_TEXT;
}
PolyBlockType EMSCRIPTEN_KEEPALIVE emscripten_enum_PolyBlockType_PT_HEADING_TEXT() {
  return PT_HEADING_TEXT;
}
PolyBlockType EMSCRIPTEN_KEEPALIVE emscripten_enum_PolyBlockType_PT_PULLOUT_TEXT() {
  return PT_PULLOUT_TEXT;
}
PolyBlockType EMSCRIPTEN_KEEPALIVE emscripten_enum_PolyBlockType_PT_EQUATION() {
  return PT_EQUATION;
}
PolyBlockType EMSCRIPTEN_KEEPALIVE emscripten_enum_PolyBlockType_PT_INLINE_EQUATION() {
  return PT_INLINE_EQUATION;
}
PolyBlockType EMSCRIPTEN_KEEPALIVE emscripten_enum_PolyBlockType_PT_TABLE() {
  return PT_TABLE;
}
PolyBlockType EMSCRIPTEN_KEEPALIVE emscripten_enum_PolyBlockType_PT_VERTICAL_TEXT() {
  return PT_VERTICAL_TEXT;
}
PolyBlockType EMSCRIPTEN_KEEPALIVE emscripten_enum_PolyBlockType_PT_CAPTION_TEXT() {
  return PT_CAPTION_TEXT;
}
PolyBlockType EMSCRIPTEN_KEEPALIVE emscripten_enum_PolyBlockType_PT_FLOWING_IMAGE() {
  return PT_FLOWING_IMAGE;
}
PolyBlockType EMSCRIPTEN_KEEPALIVE emscripten_enum_PolyBlockType_PT_HEADING_IMAGE() {
  return PT_HEADING_IMAGE;
}
PolyBlockType EMSCRIPTEN_KEEPALIVE emscripten_enum_PolyBlockType_PT_PULLOUT_IMAGE() {
  return PT_PULLOUT_IMAGE;
}
PolyBlockType EMSCRIPTEN_KEEPALIVE emscripten_enum_PolyBlockType_PT_HORZ_LINE() {
  return PT_HORZ_LINE;
}
PolyBlockType EMSCRIPTEN_KEEPALIVE emscripten_enum_PolyBlockType_PT_VERT_LINE() {
  return PT_VERT_LINE;
}
PolyBlockType EMSCRIPTEN_KEEPALIVE emscripten_enum_PolyBlockType_PT_NOISE() {
  return PT_NOISE;
}
PolyBlockType EMSCRIPTEN_KEEPALIVE emscripten_enum_PolyBlockType_PT_COUNT() {
  return PT_COUNT;
}

// StrongScriptDirection
StrongScriptDirection EMSCRIPTEN_KEEPALIVE emscripten_enum_StrongScriptDirection_DIR_NEUTRAL() {
  return DIR_NEUTRAL;
}
StrongScriptDirection EMSCRIPTEN_KEEPALIVE emscripten_enum_StrongScriptDirection_DIR_LEFT_TO_RIGHT() {
  return DIR_LEFT_TO_RIGHT;
}
StrongScriptDirection EMSCRIPTEN_KEEPALIVE emscripten_enum_StrongScriptDirection_DIR_RIGHT_TO_LEFT() {
  return DIR_RIGHT_TO_LEFT;
}
StrongScriptDirection EMSCRIPTEN_KEEPALIVE emscripten_enum_StrongScriptDirection_DIR_MIX() {
  return DIR_MIX;
}

// ParagraphJustification_
ParagraphJustification_ EMSCRIPTEN_KEEPALIVE emscripten_enum_ParagraphJustification__JUSTIFICATION_UNKNOWN() {
  return JUSTIFICATION_UNKNOWN;
}
ParagraphJustification_ EMSCRIPTEN_KEEPALIVE emscripten_enum_ParagraphJustification__JUSTIFICATION_LEFT() {
  return JUSTIFICATION_LEFT;
}
ParagraphJustification_ EMSCRIPTEN_KEEPALIVE emscripten_enum_ParagraphJustification__JUSTIFICATION_CENTER() {
  return JUSTIFICATION_CENTER;
}
ParagraphJustification_ EMSCRIPTEN_KEEPALIVE emscripten_enum_ParagraphJustification__JUSTIFICATION_RIGHT() {
  return JUSTIFICATION_RIGHT;
}

// TextlineOrder_
TextlineOrder_ EMSCRIPTEN_KEEPALIVE emscripten_enum_TextlineOrder__TEXTLINE_ORDER_LEFT_TO_RIGHT() {
  return TEXTLINE_ORDER_LEFT_TO_RIGHT;
}
TextlineOrder_ EMSCRIPTEN_KEEPALIVE emscripten_enum_TextlineOrder__TEXTLINE_ORDER_RIGHT_TO_LEFT() {
  return TEXTLINE_ORDER_RIGHT_TO_LEFT;
}
TextlineOrder_ EMSCRIPTEN_KEEPALIVE emscripten_enum_TextlineOrder__TEXTLINE_ORDER_TOP_TO_BOTTOM() {
  return TEXTLINE_ORDER_TOP_TO_BOTTOM;
}

// Orientation_
Orientation_ EMSCRIPTEN_KEEPALIVE emscripten_enum_Orientation__ORIENTATION_PAGE_UP() {
  return ORIENTATION_PAGE_UP;
}
Orientation_ EMSCRIPTEN_KEEPALIVE emscripten_enum_Orientation__ORIENTATION_PAGE_RIGHT() {
  return ORIENTATION_PAGE_RIGHT;
}
Orientation_ EMSCRIPTEN_KEEPALIVE emscripten_enum_Orientation__ORIENTATION_PAGE_DOWN() {
  return ORIENTATION_PAGE_DOWN;
}
Orientation_ EMSCRIPTEN_KEEPALIVE emscripten_enum_Orientation__ORIENTATION_PAGE_LEFT() {
  return ORIENTATION_PAGE_LEFT;
}

// PageSegMode
PageSegMode EMSCRIPTEN_KEEPALIVE emscripten_enum_PageSegMode_PSM_OSD_ONLY() {
  return PSM_OSD_ONLY;
}
PageSegMode EMSCRIPTEN_KEEPALIVE emscripten_enum_PageSegMode_PSM_AUTO_OSD() {
  return PSM_AUTO_OSD;
}
PageSegMode EMSCRIPTEN_KEEPALIVE emscripten_enum_PageSegMode_PSM_AUTO_ONLY() {
  return PSM_AUTO_ONLY;
}
PageSegMode EMSCRIPTEN_KEEPALIVE emscripten_enum_PageSegMode_PSM_AUTO() {
  return PSM_AUTO;
}
PageSegMode EMSCRIPTEN_KEEPALIVE emscripten_enum_PageSegMode_PSM_SINGLE_COLUMN() {
  return PSM_SINGLE_COLUMN;
}
PageSegMode EMSCRIPTEN_KEEPALIVE emscripten_enum_PageSegMode_PSM_SINGLE_BLOCK_VERT_TEXT() {
  return PSM_SINGLE_BLOCK_VERT_TEXT;
}
PageSegMode EMSCRIPTEN_KEEPALIVE emscripten_enum_PageSegMode_PSM_SINGLE_BLOCK() {
  return PSM_SINGLE_BLOCK;
}
PageSegMode EMSCRIPTEN_KEEPALIVE emscripten_enum_PageSegMode_PSM_SINGLE_LINE() {
  return PSM_SINGLE_LINE;
}
PageSegMode EMSCRIPTEN_KEEPALIVE emscripten_enum_PageSegMode_PSM_SINGLE_WORD() {
  return PSM_SINGLE_WORD;
}
PageSegMode EMSCRIPTEN_KEEPALIVE emscripten_enum_PageSegMode_PSM_CIRCLE_WORD() {
  return PSM_CIRCLE_WORD;
}
PageSegMode EMSCRIPTEN_KEEPALIVE emscripten_enum_PageSegMode_PSM_SINGLE_CHAR() {
  return PSM_SINGLE_CHAR;
}
PageSegMode EMSCRIPTEN_KEEPALIVE emscripten_enum_PageSegMode_PSM_SPARSE_TEXT() {
  return PSM_SPARSE_TEXT;
}
PageSegMode EMSCRIPTEN_KEEPALIVE emscripten_enum_PageSegMode_PSM_SPARSE_TEXT_OSD() {
  return PSM_SPARSE_TEXT_OSD;
}
PageSegMode EMSCRIPTEN_KEEPALIVE emscripten_enum_PageSegMode_PSM_RAW_LINE() {
  return PSM_RAW_LINE;
}
PageSegMode EMSCRIPTEN_KEEPALIVE emscripten_enum_PageSegMode_PSM_COUNT() {
  return PSM_COUNT;
}

}
