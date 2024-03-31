
// Bindings utilities

function WrapperObject() {
}
WrapperObject.prototype = Object.create(WrapperObject.prototype);
WrapperObject.prototype.constructor = WrapperObject;
WrapperObject.prototype.__class__ = WrapperObject;
WrapperObject.__cache__ = {};
Module['WrapperObject'] = WrapperObject;

function getCache(__class__) {
  return (__class__ || WrapperObject).__cache__;
}
Module['getCache'] = getCache;

function wrapPointer(ptr, __class__) {
  var cache = getCache(__class__);
  var ret = cache[ptr];
  if (ret) return ret;
  ret = Object.create((__class__ || WrapperObject).prototype);
  ret.ptr = ptr;
  return cache[ptr] = ret;
}
Module['wrapPointer'] = wrapPointer;

function castObject(obj, __class__) {
  return wrapPointer(obj.ptr, __class__);
}
Module['castObject'] = castObject;

Module['NULL'] = wrapPointer(0);

function destroy(obj) {
  if (!obj['__destroy__']) throw 'Error: Cannot destroy object. (Did you create it yourself?)';
  obj['__destroy__']();
  // Remove from cache, so the object can be GC'd and refs added onto it released
  delete getCache(obj.__class__)[obj.ptr];
}
Module['destroy'] = destroy;

function compare(obj1, obj2) {
  return obj1.ptr === obj2.ptr;
}
Module['compare'] = compare;

function getPointer(obj) {
  return obj.ptr;
}
Module['getPointer'] = getPointer;

function getClass(obj) {
  return obj.__class__;
}
Module['getClass'] = getClass;

// Converts big (string or array) values into a C-style storage, in temporary space

var ensureCache = {
  buffer: 0,  // the main buffer of temporary storage
  size: 0,   // the size of buffer
  pos: 0,    // the next free offset in buffer
  temps: [], // extra allocations
  needed: 0, // the total size we need next time

  prepare: function() {
    if (ensureCache.needed) {
      // clear the temps
      for (var i = 0; i < ensureCache.temps.length; i++) {
        Module['_free'](ensureCache.temps[i]);
      }
      ensureCache.temps.length = 0;
      // prepare to allocate a bigger buffer
      Module['_free'](ensureCache.buffer);
      ensureCache.buffer = 0;
      ensureCache.size += ensureCache.needed;
      // clean up
      ensureCache.needed = 0;
    }
    if (!ensureCache.buffer) { // happens first time, or when we need to grow
      ensureCache.size += 128; // heuristic, avoid many small grow events
      ensureCache.buffer = Module['_malloc'](ensureCache.size);
      assert(ensureCache.buffer);
    }
    ensureCache.pos = 0;
  },
  alloc: function(array, view) {
    assert(ensureCache.buffer);
    var bytes = view.BYTES_PER_ELEMENT;
    var len = array.length * bytes;
    len = (len + 7) & -8; // keep things aligned to 8 byte boundaries
    var ret;
    if (ensureCache.pos + len >= ensureCache.size) {
      // we failed to allocate in the buffer, ensureCache time around :(
      assert(len > 0); // null terminator, at least
      ensureCache.needed += len;
      ret = Module['_malloc'](len);
      ensureCache.temps.push(ret);
    } else {
      // we can allocate in the buffer
      ret = ensureCache.buffer + ensureCache.pos;
      ensureCache.pos += len;
    }
    return ret;
  },
  copy: function(array, view, offset) {
    var offsetShifted = offset;
    var bytes = view.BYTES_PER_ELEMENT;
    switch (bytes) {
      case 2: offsetShifted >>= 1; break;
      case 4: offsetShifted >>= 2; break;
      case 8: offsetShifted >>= 3; break;
    }
    for (var i = 0; i < array.length; i++) {
      view[offsetShifted + i] = array[i];
    }
  },
};

function ensureString(value) {
  if (typeof value === 'string') {
    var intArray = intArrayFromString(value);
    var offset = ensureCache.alloc(intArray, HEAP8);
    ensureCache.copy(intArray, HEAP8, offset);
    return offset;
  }
  return value;
}
function ensureInt8(value) {
  if (typeof value === 'object') {
    var offset = ensureCache.alloc(value, HEAP8);
    ensureCache.copy(value, HEAP8, offset);
    return offset;
  }
  return value;
}
function ensureInt16(value) {
  if (typeof value === 'object') {
    var offset = ensureCache.alloc(value, HEAP16);
    ensureCache.copy(value, HEAP16, offset);
    return offset;
  }
  return value;
}
function ensureInt32(value) {
  if (typeof value === 'object') {
    var offset = ensureCache.alloc(value, HEAP32);
    ensureCache.copy(value, HEAP32, offset);
    return offset;
  }
  return value;
}
function ensureFloat32(value) {
  if (typeof value === 'object') {
    var offset = ensureCache.alloc(value, HEAPF32);
    ensureCache.copy(value, HEAPF32, offset);
    return offset;
  }
  return value;
}
function ensureFloat64(value) {
  if (typeof value === 'object') {
    var offset = ensureCache.alloc(value, HEAPF64);
    ensureCache.copy(value, HEAPF64, offset);
    return offset;
  }
  return value;
}


// ParagraphJustification
/** @suppress {undefinedVars, duplicate} */function ParagraphJustification() { throw "cannot construct a ParagraphJustification, no constructor in IDL" }
ParagraphJustification.prototype = Object.create(WrapperObject.prototype);
ParagraphJustification.prototype.constructor = ParagraphJustification;
ParagraphJustification.prototype.__class__ = ParagraphJustification;
ParagraphJustification.__cache__ = {};
Module['ParagraphJustification'] = ParagraphJustification;

  ParagraphJustification.prototype['__destroy__'] = ParagraphJustification.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_ParagraphJustification___destroy___0(self);
};
// BoolPtr
/** @suppress {undefinedVars, duplicate} */function BoolPtr() { throw "cannot construct a BoolPtr, no constructor in IDL" }
BoolPtr.prototype = Object.create(WrapperObject.prototype);
BoolPtr.prototype.constructor = BoolPtr;
BoolPtr.prototype.__class__ = BoolPtr;
BoolPtr.__cache__ = {};
Module['BoolPtr'] = BoolPtr;

  BoolPtr.prototype['__destroy__'] = BoolPtr.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_BoolPtr___destroy___0(self);
};
// TessResultRenderer
/** @suppress {undefinedVars, duplicate} */function TessResultRenderer() { throw "cannot construct a TessResultRenderer, no constructor in IDL" }
TessResultRenderer.prototype = Object.create(WrapperObject.prototype);
TessResultRenderer.prototype.constructor = TessResultRenderer;
TessResultRenderer.prototype.__class__ = TessResultRenderer;
TessResultRenderer.__cache__ = {};
Module['TessResultRenderer'] = TessResultRenderer;

TessResultRenderer.prototype['BeginDocument'] = TessResultRenderer.prototype.BeginDocument = /** @suppress {undefinedVars, duplicate} */function(title) {
  var self = this.ptr;
  ensureCache.prepare();
  if (title && typeof title === 'object') title = title.ptr;
  else title = ensureString(title);
  return !!(_emscripten_bind_TessResultRenderer_BeginDocument_1(self, title));
};;

TessResultRenderer.prototype['AddImage'] = TessResultRenderer.prototype.AddImage = /** @suppress {undefinedVars, duplicate} */function(api) {
  var self = this.ptr;
  if (api && typeof api === 'object') api = api.ptr;
  return !!(_emscripten_bind_TessResultRenderer_AddImage_1(self, api));
};;

TessResultRenderer.prototype['EndDocument'] = TessResultRenderer.prototype.EndDocument = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_TessResultRenderer_EndDocument_0(self));
};;

TessResultRenderer.prototype['happy'] = TessResultRenderer.prototype.happy = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_TessResultRenderer_happy_0(self));
};;

TessResultRenderer.prototype['file_extension'] = TessResultRenderer.prototype.file_extension = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return UTF8ToString(_emscripten_bind_TessResultRenderer_file_extension_0(self));
};;

TessResultRenderer.prototype['title'] = TessResultRenderer.prototype.title = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return UTF8ToString(_emscripten_bind_TessResultRenderer_title_0(self));
};;

TessResultRenderer.prototype['imagenum'] = TessResultRenderer.prototype.imagenum = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_TessResultRenderer_imagenum_0(self);
};;

  TessResultRenderer.prototype['__destroy__'] = TessResultRenderer.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_TessResultRenderer___destroy___0(self);
};
// LongStarPtr
/** @suppress {undefinedVars, duplicate} */function LongStarPtr() { throw "cannot construct a LongStarPtr, no constructor in IDL" }
LongStarPtr.prototype = Object.create(WrapperObject.prototype);
LongStarPtr.prototype.constructor = LongStarPtr;
LongStarPtr.prototype.__class__ = LongStarPtr;
LongStarPtr.__cache__ = {};
Module['LongStarPtr'] = LongStarPtr;

  LongStarPtr.prototype['__destroy__'] = LongStarPtr.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_LongStarPtr___destroy___0(self);
};
// VoidPtr
/** @suppress {undefinedVars, duplicate} */function VoidPtr() { throw "cannot construct a VoidPtr, no constructor in IDL" }
VoidPtr.prototype = Object.create(WrapperObject.prototype);
VoidPtr.prototype.constructor = VoidPtr;
VoidPtr.prototype.__class__ = VoidPtr;
VoidPtr.__cache__ = {};
Module['VoidPtr'] = VoidPtr;

  VoidPtr.prototype['__destroy__'] = VoidPtr.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_VoidPtr___destroy___0(self);
};
// ResultIterator
/** @suppress {undefinedVars, duplicate} */function ResultIterator(resit) {
  if (resit && typeof resit === 'object') resit = resit.ptr;
  this.ptr = _emscripten_bind_ResultIterator_ResultIterator_1(resit);
  getCache(ResultIterator)[this.ptr] = this;
};;
ResultIterator.prototype = Object.create(WrapperObject.prototype);
ResultIterator.prototype.constructor = ResultIterator;
ResultIterator.prototype.__class__ = ResultIterator;
ResultIterator.__cache__ = {};
Module['ResultIterator'] = ResultIterator;

ResultIterator.prototype['Begin'] = ResultIterator.prototype.Begin = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_ResultIterator_Begin_0(self);
};;

ResultIterator.prototype['RestartParagraph'] = ResultIterator.prototype.RestartParagraph = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_ResultIterator_RestartParagraph_0(self);
};;

ResultIterator.prototype['IsWithinFirstTextlineOfParagraph'] = ResultIterator.prototype.IsWithinFirstTextlineOfParagraph = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_ResultIterator_IsWithinFirstTextlineOfParagraph_0(self));
};;

ResultIterator.prototype['RestartRow'] = ResultIterator.prototype.RestartRow = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_ResultIterator_RestartRow_0(self);
};;

ResultIterator.prototype['Next'] = ResultIterator.prototype.Next = /** @suppress {undefinedVars, duplicate} */function(level) {
  var self = this.ptr;
  if (level && typeof level === 'object') level = level.ptr;
  return !!(_emscripten_bind_ResultIterator_Next_1(self, level));
};;

ResultIterator.prototype['IsAtBeginningOf'] = ResultIterator.prototype.IsAtBeginningOf = /** @suppress {undefinedVars, duplicate} */function(level) {
  var self = this.ptr;
  if (level && typeof level === 'object') level = level.ptr;
  return !!(_emscripten_bind_ResultIterator_IsAtBeginningOf_1(self, level));
};;

ResultIterator.prototype['IsAtFinalElement'] = ResultIterator.prototype.IsAtFinalElement = /** @suppress {undefinedVars, duplicate} */function(level, element) {
  var self = this.ptr;
  if (level && typeof level === 'object') level = level.ptr;
  if (element && typeof element === 'object') element = element.ptr;
  return !!(_emscripten_bind_ResultIterator_IsAtFinalElement_2(self, level, element));
};;

ResultIterator.prototype['Cmp'] = ResultIterator.prototype.Cmp = /** @suppress {undefinedVars, duplicate} */function(other) {
  var self = this.ptr;
  if (other && typeof other === 'object') other = other.ptr;
  return _emscripten_bind_ResultIterator_Cmp_1(self, other);
};;

ResultIterator.prototype['SetBoundingBoxComponents'] = ResultIterator.prototype.SetBoundingBoxComponents = /** @suppress {undefinedVars, duplicate} */function(include_upper_dots, include_lower_dots) {
  var self = this.ptr;
  if (include_upper_dots && typeof include_upper_dots === 'object') include_upper_dots = include_upper_dots.ptr;
  if (include_lower_dots && typeof include_lower_dots === 'object') include_lower_dots = include_lower_dots.ptr;
  _emscripten_bind_ResultIterator_SetBoundingBoxComponents_2(self, include_upper_dots, include_lower_dots);
};;

ResultIterator.prototype['BoundingBox'] = ResultIterator.prototype.BoundingBox = /** @suppress {undefinedVars, duplicate} */function(level, padding, left, top, right, bottom) {
  var self = this.ptr;
  if (level && typeof level === 'object') level = level.ptr;
  if (padding && typeof padding === 'object') padding = padding.ptr;
  if (left && typeof left === 'object') left = left.ptr;
  if (top && typeof top === 'object') top = top.ptr;
  if (right && typeof right === 'object') right = right.ptr;
  if (bottom && typeof bottom === 'object') bottom = bottom.ptr;
  if (bottom === undefined) { return !!(_emscripten_bind_ResultIterator_BoundingBox_5(self, level, padding, left, top, right)) }
  return !!(_emscripten_bind_ResultIterator_BoundingBox_6(self, level, padding, left, top, right, bottom));
};;

ResultIterator.prototype['BoundingBoxInternal'] = ResultIterator.prototype.BoundingBoxInternal = /** @suppress {undefinedVars, duplicate} */function(level, left, top, right, bottom) {
  var self = this.ptr;
  if (level && typeof level === 'object') level = level.ptr;
  if (left && typeof left === 'object') left = left.ptr;
  if (top && typeof top === 'object') top = top.ptr;
  if (right && typeof right === 'object') right = right.ptr;
  if (bottom && typeof bottom === 'object') bottom = bottom.ptr;
  return !!(_emscripten_bind_ResultIterator_BoundingBoxInternal_5(self, level, left, top, right, bottom));
};;

ResultIterator.prototype['Empty'] = ResultIterator.prototype.Empty = /** @suppress {undefinedVars, duplicate} */function(level) {
  var self = this.ptr;
  if (level && typeof level === 'object') level = level.ptr;
  return !!(_emscripten_bind_ResultIterator_Empty_1(self, level));
};;

ResultIterator.prototype['BlockType'] = ResultIterator.prototype.BlockType = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_ResultIterator_BlockType_0(self);
};;

ResultIterator.prototype['BlockPolygon'] = ResultIterator.prototype.BlockPolygon = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_ResultIterator_BlockPolygon_0(self), Pta);
};;

ResultIterator.prototype['GetBinaryImage'] = ResultIterator.prototype.GetBinaryImage = /** @suppress {undefinedVars, duplicate} */function(level) {
  var self = this.ptr;
  if (level && typeof level === 'object') level = level.ptr;
  return wrapPointer(_emscripten_bind_ResultIterator_GetBinaryImage_1(self, level), Pix);
};;

ResultIterator.prototype['GetImage'] = ResultIterator.prototype.GetImage = /** @suppress {undefinedVars, duplicate} */function(level, padding, original_img, left, top) {
  var self = this.ptr;
  if (level && typeof level === 'object') level = level.ptr;
  if (padding && typeof padding === 'object') padding = padding.ptr;
  if (original_img && typeof original_img === 'object') original_img = original_img.ptr;
  if (left && typeof left === 'object') left = left.ptr;
  if (top && typeof top === 'object') top = top.ptr;
  return wrapPointer(_emscripten_bind_ResultIterator_GetImage_5(self, level, padding, original_img, left, top), Pix);
};;

ResultIterator.prototype['Baseline'] = ResultIterator.prototype.Baseline = /** @suppress {undefinedVars, duplicate} */function(level, x1, y1, x2, y2) {
  var self = this.ptr;
  if (level && typeof level === 'object') level = level.ptr;
  if (x1 && typeof x1 === 'object') x1 = x1.ptr;
  if (y1 && typeof y1 === 'object') y1 = y1.ptr;
  if (x2 && typeof x2 === 'object') x2 = x2.ptr;
  if (y2 && typeof y2 === 'object') y2 = y2.ptr;
  return !!(_emscripten_bind_ResultIterator_Baseline_5(self, level, x1, y1, x2, y2));
};;

ResultIterator.prototype['RowAttributes'] = ResultIterator.prototype.RowAttributes = /** @suppress {undefinedVars, duplicate} */function(row_height, descenders, ascenders) {
  var self = this.ptr;
  if (row_height && typeof row_height === 'object') row_height = row_height.ptr;
  if (descenders && typeof descenders === 'object') descenders = descenders.ptr;
  if (ascenders && typeof ascenders === 'object') ascenders = ascenders.ptr;
  return !!(_emscripten_bind_ResultIterator_RowAttributes_3(self, row_height, descenders, ascenders));
};;

ResultIterator.prototype['Orientation'] = ResultIterator.prototype.Orientation = /** @suppress {undefinedVars, duplicate} */function(orientation, writing_direction, textline_order, deskew_angle) {
  var self = this.ptr;
  if (orientation && typeof orientation === 'object') orientation = orientation.ptr;
  if (writing_direction && typeof writing_direction === 'object') writing_direction = writing_direction.ptr;
  if (textline_order && typeof textline_order === 'object') textline_order = textline_order.ptr;
  if (deskew_angle && typeof deskew_angle === 'object') deskew_angle = deskew_angle.ptr;
  _emscripten_bind_ResultIterator_Orientation_4(self, orientation, writing_direction, textline_order, deskew_angle);
};;

ResultIterator.prototype['ParagraphInfo'] = ResultIterator.prototype.ParagraphInfo = /** @suppress {undefinedVars, duplicate} */function(justification, is_list_item, is_crown, first_line_indent) {
  var self = this.ptr;
  if (justification && typeof justification === 'object') justification = justification.ptr;
  if (is_list_item && typeof is_list_item === 'object') is_list_item = is_list_item.ptr;
  if (is_crown && typeof is_crown === 'object') is_crown = is_crown.ptr;
  if (first_line_indent && typeof first_line_indent === 'object') first_line_indent = first_line_indent.ptr;
  _emscripten_bind_ResultIterator_ParagraphInfo_4(self, justification, is_list_item, is_crown, first_line_indent);
};;

ResultIterator.prototype['ParagraphIsLtr'] = ResultIterator.prototype.ParagraphIsLtr = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_ResultIterator_ParagraphIsLtr_0(self));
};;

ResultIterator.prototype['GetUTF8Text'] = ResultIterator.prototype.GetUTF8Text = /** @suppress {undefinedVars, duplicate} */function(level) {
  var self = this.ptr;
  if (level && typeof level === 'object') level = level.ptr;
  return UTF8ToString(_emscripten_bind_ResultIterator_GetUTF8Text_1(self, level));
};;

ResultIterator.prototype['SetLineSeparator'] = ResultIterator.prototype.SetLineSeparator = /** @suppress {undefinedVars, duplicate} */function(new_line) {
  var self = this.ptr;
  ensureCache.prepare();
  if (new_line && typeof new_line === 'object') new_line = new_line.ptr;
  else new_line = ensureString(new_line);
  _emscripten_bind_ResultIterator_SetLineSeparator_1(self, new_line);
};;

ResultIterator.prototype['SetParagraphSeparator'] = ResultIterator.prototype.SetParagraphSeparator = /** @suppress {undefinedVars, duplicate} */function(new_para) {
  var self = this.ptr;
  ensureCache.prepare();
  if (new_para && typeof new_para === 'object') new_para = new_para.ptr;
  else new_para = ensureString(new_para);
  _emscripten_bind_ResultIterator_SetParagraphSeparator_1(self, new_para);
};;

ResultIterator.prototype['Confidence'] = ResultIterator.prototype.Confidence = /** @suppress {undefinedVars, duplicate} */function(level) {
  var self = this.ptr;
  if (level && typeof level === 'object') level = level.ptr;
  return _emscripten_bind_ResultIterator_Confidence_1(self, level);
};;

ResultIterator.prototype['WordFontAttributes'] = ResultIterator.prototype.WordFontAttributes = /** @suppress {undefinedVars, duplicate} */function(is_bold, is_italic, is_underlined, is_monospace, is_serif, is_smallcaps, pointsize, font_id) {
  var self = this.ptr;
  if (is_bold && typeof is_bold === 'object') is_bold = is_bold.ptr;
  if (is_italic && typeof is_italic === 'object') is_italic = is_italic.ptr;
  if (is_underlined && typeof is_underlined === 'object') is_underlined = is_underlined.ptr;
  if (is_monospace && typeof is_monospace === 'object') is_monospace = is_monospace.ptr;
  if (is_serif && typeof is_serif === 'object') is_serif = is_serif.ptr;
  if (is_smallcaps && typeof is_smallcaps === 'object') is_smallcaps = is_smallcaps.ptr;
  if (pointsize && typeof pointsize === 'object') pointsize = pointsize.ptr;
  if (font_id && typeof font_id === 'object') font_id = font_id.ptr;
  return UTF8ToString(_emscripten_bind_ResultIterator_WordFontAttributes_8(self, is_bold, is_italic, is_underlined, is_monospace, is_serif, is_smallcaps, pointsize, font_id));
};;

ResultIterator.prototype['WordRecognitionLanguage'] = ResultIterator.prototype.WordRecognitionLanguage = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return UTF8ToString(_emscripten_bind_ResultIterator_WordRecognitionLanguage_0(self));
};;

ResultIterator.prototype['WordDirection'] = ResultIterator.prototype.WordDirection = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_ResultIterator_WordDirection_0(self);
};;

ResultIterator.prototype['WordIsFromDictionary'] = ResultIterator.prototype.WordIsFromDictionary = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_ResultIterator_WordIsFromDictionary_0(self));
};;

ResultIterator.prototype['WordIsNumeric'] = ResultIterator.prototype.WordIsNumeric = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_ResultIterator_WordIsNumeric_0(self));
};;

ResultIterator.prototype['HasBlamerInfo'] = ResultIterator.prototype.HasBlamerInfo = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_ResultIterator_HasBlamerInfo_0(self));
};;

ResultIterator.prototype['HasTruthString'] = ResultIterator.prototype.HasTruthString = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_ResultIterator_HasTruthString_0(self));
};;

ResultIterator.prototype['EquivalentToTruth'] = ResultIterator.prototype.EquivalentToTruth = /** @suppress {undefinedVars, duplicate} */function(str) {
  var self = this.ptr;
  ensureCache.prepare();
  if (str && typeof str === 'object') str = str.ptr;
  else str = ensureString(str);
  return !!(_emscripten_bind_ResultIterator_EquivalentToTruth_1(self, str));
};;

ResultIterator.prototype['WordTruthUTF8Text'] = ResultIterator.prototype.WordTruthUTF8Text = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return UTF8ToString(_emscripten_bind_ResultIterator_WordTruthUTF8Text_0(self));
};;

ResultIterator.prototype['WordNormedUTF8Text'] = ResultIterator.prototype.WordNormedUTF8Text = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return UTF8ToString(_emscripten_bind_ResultIterator_WordNormedUTF8Text_0(self));
};;

ResultIterator.prototype['WordLattice'] = ResultIterator.prototype.WordLattice = /** @suppress {undefinedVars, duplicate} */function(lattice_size) {
  var self = this.ptr;
  if (lattice_size && typeof lattice_size === 'object') lattice_size = lattice_size.ptr;
  return UTF8ToString(_emscripten_bind_ResultIterator_WordLattice_1(self, lattice_size));
};;

ResultIterator.prototype['SymbolIsSuperscript'] = ResultIterator.prototype.SymbolIsSuperscript = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_ResultIterator_SymbolIsSuperscript_0(self));
};;

ResultIterator.prototype['SymbolIsSubscript'] = ResultIterator.prototype.SymbolIsSubscript = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_ResultIterator_SymbolIsSubscript_0(self));
};;

ResultIterator.prototype['SymbolIsDropcap'] = ResultIterator.prototype.SymbolIsDropcap = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_ResultIterator_SymbolIsDropcap_0(self));
};;

  ResultIterator.prototype['__destroy__'] = ResultIterator.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_ResultIterator___destroy___0(self);
};
// TextlineOrder
/** @suppress {undefinedVars, duplicate} */function TextlineOrder() { throw "cannot construct a TextlineOrder, no constructor in IDL" }
TextlineOrder.prototype = Object.create(WrapperObject.prototype);
TextlineOrder.prototype.constructor = TextlineOrder;
TextlineOrder.prototype.__class__ = TextlineOrder;
TextlineOrder.__cache__ = {};
Module['TextlineOrder'] = TextlineOrder;

  TextlineOrder.prototype['__destroy__'] = TextlineOrder.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_TextlineOrder___destroy___0(self);
};
// ETEXT_DESC
/** @suppress {undefinedVars, duplicate} */function ETEXT_DESC() { throw "cannot construct a ETEXT_DESC, no constructor in IDL" }
ETEXT_DESC.prototype = Object.create(WrapperObject.prototype);
ETEXT_DESC.prototype.constructor = ETEXT_DESC;
ETEXT_DESC.prototype.__class__ = ETEXT_DESC;
ETEXT_DESC.__cache__ = {};
Module['ETEXT_DESC'] = ETEXT_DESC;

  ETEXT_DESC.prototype['__destroy__'] = ETEXT_DESC.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_ETEXT_DESC___destroy___0(self);
};
// PageIterator
/** @suppress {undefinedVars, duplicate} */function PageIterator() { throw "cannot construct a PageIterator, no constructor in IDL" }
PageIterator.prototype = Object.create(WrapperObject.prototype);
PageIterator.prototype.constructor = PageIterator;
PageIterator.prototype.__class__ = PageIterator;
PageIterator.__cache__ = {};
Module['PageIterator'] = PageIterator;

PageIterator.prototype['Begin'] = PageIterator.prototype.Begin = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_PageIterator_Begin_0(self);
};;

PageIterator.prototype['RestartParagraph'] = PageIterator.prototype.RestartParagraph = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_PageIterator_RestartParagraph_0(self);
};;

PageIterator.prototype['IsWithinFirstTextlineOfParagraph'] = PageIterator.prototype.IsWithinFirstTextlineOfParagraph = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_PageIterator_IsWithinFirstTextlineOfParagraph_0(self));
};;

PageIterator.prototype['RestartRow'] = PageIterator.prototype.RestartRow = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_PageIterator_RestartRow_0(self);
};;

PageIterator.prototype['Next'] = PageIterator.prototype.Next = /** @suppress {undefinedVars, duplicate} */function(level) {
  var self = this.ptr;
  if (level && typeof level === 'object') level = level.ptr;
  return !!(_emscripten_bind_PageIterator_Next_1(self, level));
};;

PageIterator.prototype['IsAtBeginningOf'] = PageIterator.prototype.IsAtBeginningOf = /** @suppress {undefinedVars, duplicate} */function(level) {
  var self = this.ptr;
  if (level && typeof level === 'object') level = level.ptr;
  return !!(_emscripten_bind_PageIterator_IsAtBeginningOf_1(self, level));
};;

PageIterator.prototype['IsAtFinalElement'] = PageIterator.prototype.IsAtFinalElement = /** @suppress {undefinedVars, duplicate} */function(level, element) {
  var self = this.ptr;
  if (level && typeof level === 'object') level = level.ptr;
  if (element && typeof element === 'object') element = element.ptr;
  return !!(_emscripten_bind_PageIterator_IsAtFinalElement_2(self, level, element));
};;

PageIterator.prototype['Cmp'] = PageIterator.prototype.Cmp = /** @suppress {undefinedVars, duplicate} */function(other) {
  var self = this.ptr;
  if (other && typeof other === 'object') other = other.ptr;
  return _emscripten_bind_PageIterator_Cmp_1(self, other);
};;

PageIterator.prototype['SetBoundingBoxComponents'] = PageIterator.prototype.SetBoundingBoxComponents = /** @suppress {undefinedVars, duplicate} */function(include_upper_dots, include_lower_dots) {
  var self = this.ptr;
  if (include_upper_dots && typeof include_upper_dots === 'object') include_upper_dots = include_upper_dots.ptr;
  if (include_lower_dots && typeof include_lower_dots === 'object') include_lower_dots = include_lower_dots.ptr;
  _emscripten_bind_PageIterator_SetBoundingBoxComponents_2(self, include_upper_dots, include_lower_dots);
};;

PageIterator.prototype['BoundingBox'] = PageIterator.prototype.BoundingBox = /** @suppress {undefinedVars, duplicate} */function(level, padding, left, top, right, bottom) {
  var self = this.ptr;
  if (level && typeof level === 'object') level = level.ptr;
  if (padding && typeof padding === 'object') padding = padding.ptr;
  if (left && typeof left === 'object') left = left.ptr;
  if (top && typeof top === 'object') top = top.ptr;
  if (right && typeof right === 'object') right = right.ptr;
  if (bottom && typeof bottom === 'object') bottom = bottom.ptr;
  if (bottom === undefined) { return !!(_emscripten_bind_PageIterator_BoundingBox_5(self, level, padding, left, top, right)) }
  return !!(_emscripten_bind_PageIterator_BoundingBox_6(self, level, padding, left, top, right, bottom));
};;

PageIterator.prototype['BoundingBoxInternal'] = PageIterator.prototype.BoundingBoxInternal = /** @suppress {undefinedVars, duplicate} */function(level, left, top, right, bottom) {
  var self = this.ptr;
  if (level && typeof level === 'object') level = level.ptr;
  if (left && typeof left === 'object') left = left.ptr;
  if (top && typeof top === 'object') top = top.ptr;
  if (right && typeof right === 'object') right = right.ptr;
  if (bottom && typeof bottom === 'object') bottom = bottom.ptr;
  return !!(_emscripten_bind_PageIterator_BoundingBoxInternal_5(self, level, left, top, right, bottom));
};;

PageIterator.prototype['Empty'] = PageIterator.prototype.Empty = /** @suppress {undefinedVars, duplicate} */function(level) {
  var self = this.ptr;
  if (level && typeof level === 'object') level = level.ptr;
  return !!(_emscripten_bind_PageIterator_Empty_1(self, level));
};;

PageIterator.prototype['BlockType'] = PageIterator.prototype.BlockType = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_PageIterator_BlockType_0(self);
};;

PageIterator.prototype['BlockPolygon'] = PageIterator.prototype.BlockPolygon = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_PageIterator_BlockPolygon_0(self), Pta);
};;

PageIterator.prototype['GetBinaryImage'] = PageIterator.prototype.GetBinaryImage = /** @suppress {undefinedVars, duplicate} */function(level) {
  var self = this.ptr;
  if (level && typeof level === 'object') level = level.ptr;
  return wrapPointer(_emscripten_bind_PageIterator_GetBinaryImage_1(self, level), Pix);
};;

PageIterator.prototype['GetImage'] = PageIterator.prototype.GetImage = /** @suppress {undefinedVars, duplicate} */function(level, padding, original_img, left, top) {
  var self = this.ptr;
  if (level && typeof level === 'object') level = level.ptr;
  if (padding && typeof padding === 'object') padding = padding.ptr;
  if (original_img && typeof original_img === 'object') original_img = original_img.ptr;
  if (left && typeof left === 'object') left = left.ptr;
  if (top && typeof top === 'object') top = top.ptr;
  return wrapPointer(_emscripten_bind_PageIterator_GetImage_5(self, level, padding, original_img, left, top), Pix);
};;

PageIterator.prototype['Baseline'] = PageIterator.prototype.Baseline = /** @suppress {undefinedVars, duplicate} */function(level, x1, y1, x2, y2) {
  var self = this.ptr;
  if (level && typeof level === 'object') level = level.ptr;
  if (x1 && typeof x1 === 'object') x1 = x1.ptr;
  if (y1 && typeof y1 === 'object') y1 = y1.ptr;
  if (x2 && typeof x2 === 'object') x2 = x2.ptr;
  if (y2 && typeof y2 === 'object') y2 = y2.ptr;
  return !!(_emscripten_bind_PageIterator_Baseline_5(self, level, x1, y1, x2, y2));
};;

PageIterator.prototype['Orientation'] = PageIterator.prototype.Orientation = /** @suppress {undefinedVars, duplicate} */function(orientation, writing_direction, textline_order, deskew_angle) {
  var self = this.ptr;
  if (orientation && typeof orientation === 'object') orientation = orientation.ptr;
  if (writing_direction && typeof writing_direction === 'object') writing_direction = writing_direction.ptr;
  if (textline_order && typeof textline_order === 'object') textline_order = textline_order.ptr;
  if (deskew_angle && typeof deskew_angle === 'object') deskew_angle = deskew_angle.ptr;
  _emscripten_bind_PageIterator_Orientation_4(self, orientation, writing_direction, textline_order, deskew_angle);
};;

PageIterator.prototype['ParagraphInfo'] = PageIterator.prototype.ParagraphInfo = /** @suppress {undefinedVars, duplicate} */function(justification, is_list_item, is_crown, first_line_indent) {
  var self = this.ptr;
  if (justification && typeof justification === 'object') justification = justification.ptr;
  if (is_list_item && typeof is_list_item === 'object') is_list_item = is_list_item.ptr;
  if (is_crown && typeof is_crown === 'object') is_crown = is_crown.ptr;
  if (first_line_indent && typeof first_line_indent === 'object') first_line_indent = first_line_indent.ptr;
  _emscripten_bind_PageIterator_ParagraphInfo_4(self, justification, is_list_item, is_crown, first_line_indent);
};;

  PageIterator.prototype['__destroy__'] = PageIterator.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_PageIterator___destroy___0(self);
};
// WritingDirection
/** @suppress {undefinedVars, duplicate} */function WritingDirection() { throw "cannot construct a WritingDirection, no constructor in IDL" }
WritingDirection.prototype = Object.create(WrapperObject.prototype);
WritingDirection.prototype.constructor = WritingDirection;
WritingDirection.prototype.__class__ = WritingDirection;
WritingDirection.__cache__ = {};
Module['WritingDirection'] = WritingDirection;

  WritingDirection.prototype['__destroy__'] = WritingDirection.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_WritingDirection___destroy___0(self);
};
// WordChoiceIterator
/** @suppress {undefinedVars, duplicate} */function WordChoiceIterator(result_it) {
  if (result_it && typeof result_it === 'object') result_it = result_it.ptr;
  this.ptr = _emscripten_bind_WordChoiceIterator_WordChoiceIterator_1(result_it);
  getCache(WordChoiceIterator)[this.ptr] = this;
};;
WordChoiceIterator.prototype = Object.create(WrapperObject.prototype);
WordChoiceIterator.prototype.constructor = WordChoiceIterator;
WordChoiceIterator.prototype.__class__ = WordChoiceIterator;
WordChoiceIterator.__cache__ = {};
Module['WordChoiceIterator'] = WordChoiceIterator;

WordChoiceIterator.prototype['Next'] = WordChoiceIterator.prototype.Next = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_WordChoiceIterator_Next_0(self));
};;

WordChoiceIterator.prototype['GetUTF8Text'] = WordChoiceIterator.prototype.GetUTF8Text = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return UTF8ToString(_emscripten_bind_WordChoiceIterator_GetUTF8Text_0(self));
};;

WordChoiceIterator.prototype['Confidence'] = WordChoiceIterator.prototype.Confidence = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_WordChoiceIterator_Confidence_0(self);
};;

  WordChoiceIterator.prototype['__destroy__'] = WordChoiceIterator.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_WordChoiceIterator___destroy___0(self);
};
// Box
/** @suppress {undefinedVars, duplicate} */function Box() { throw "cannot construct a Box, no constructor in IDL" }
Box.prototype = Object.create(WrapperObject.prototype);
Box.prototype.constructor = Box;
Box.prototype.__class__ = Box;
Box.__cache__ = {};
Module['Box'] = Box;

  Box.prototype['get_x'] = Box.prototype.get_x = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_Box_get_x_0(self);
};
    Object.defineProperty(Box.prototype, 'x', { get: Box.prototype.get_x });
  Box.prototype['get_y'] = Box.prototype.get_y = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_Box_get_y_0(self);
};
    Object.defineProperty(Box.prototype, 'y', { get: Box.prototype.get_y });
  Box.prototype['get_w'] = Box.prototype.get_w = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_Box_get_w_0(self);
};
    Object.defineProperty(Box.prototype, 'w', { get: Box.prototype.get_w });
  Box.prototype['get_h'] = Box.prototype.get_h = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_Box_get_h_0(self);
};
    Object.defineProperty(Box.prototype, 'h', { get: Box.prototype.get_h });
  Box.prototype['get_refcount'] = Box.prototype.get_refcount = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_Box_get_refcount_0(self);
};
    Object.defineProperty(Box.prototype, 'refcount', { get: Box.prototype.get_refcount });
  Box.prototype['__destroy__'] = Box.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_Box___destroy___0(self);
};
// TessPDFRenderer
/** @suppress {undefinedVars, duplicate} */function TessPDFRenderer(outputbase, datadir, textonly) {
  ensureCache.prepare();
  if (outputbase && typeof outputbase === 'object') outputbase = outputbase.ptr;
  else outputbase = ensureString(outputbase);
  if (datadir && typeof datadir === 'object') datadir = datadir.ptr;
  else datadir = ensureString(datadir);
  if (textonly && typeof textonly === 'object') textonly = textonly.ptr;
  this.ptr = _emscripten_bind_TessPDFRenderer_TessPDFRenderer_3(outputbase, datadir, textonly);
  getCache(TessPDFRenderer)[this.ptr] = this;
};;
TessPDFRenderer.prototype = Object.create(WrapperObject.prototype);
TessPDFRenderer.prototype.constructor = TessPDFRenderer;
TessPDFRenderer.prototype.__class__ = TessPDFRenderer;
TessPDFRenderer.__cache__ = {};
Module['TessPDFRenderer'] = TessPDFRenderer;

TessPDFRenderer.prototype['BeginDocument'] = TessPDFRenderer.prototype.BeginDocument = /** @suppress {undefinedVars, duplicate} */function(title) {
  var self = this.ptr;
  ensureCache.prepare();
  if (title && typeof title === 'object') title = title.ptr;
  else title = ensureString(title);
  return !!(_emscripten_bind_TessPDFRenderer_BeginDocument_1(self, title));
};;

TessPDFRenderer.prototype['AddImage'] = TessPDFRenderer.prototype.AddImage = /** @suppress {undefinedVars, duplicate} */function(api) {
  var self = this.ptr;
  if (api && typeof api === 'object') api = api.ptr;
  return !!(_emscripten_bind_TessPDFRenderer_AddImage_1(self, api));
};;

TessPDFRenderer.prototype['EndDocument'] = TessPDFRenderer.prototype.EndDocument = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_TessPDFRenderer_EndDocument_0(self));
};;

TessPDFRenderer.prototype['happy'] = TessPDFRenderer.prototype.happy = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_TessPDFRenderer_happy_0(self));
};;

TessPDFRenderer.prototype['file_extension'] = TessPDFRenderer.prototype.file_extension = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return UTF8ToString(_emscripten_bind_TessPDFRenderer_file_extension_0(self));
};;

TessPDFRenderer.prototype['title'] = TessPDFRenderer.prototype.title = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return UTF8ToString(_emscripten_bind_TessPDFRenderer_title_0(self));
};;

TessPDFRenderer.prototype['imagenum'] = TessPDFRenderer.prototype.imagenum = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_TessPDFRenderer_imagenum_0(self);
};;

  TessPDFRenderer.prototype['__destroy__'] = TessPDFRenderer.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_TessPDFRenderer___destroy___0(self);
};
// PixaPtr
/** @suppress {undefinedVars, duplicate} */function PixaPtr() { throw "cannot construct a PixaPtr, no constructor in IDL" }
PixaPtr.prototype = Object.create(WrapperObject.prototype);
PixaPtr.prototype.constructor = PixaPtr;
PixaPtr.prototype.__class__ = PixaPtr;
PixaPtr.__cache__ = {};
Module['PixaPtr'] = PixaPtr;

  PixaPtr.prototype['__destroy__'] = PixaPtr.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_PixaPtr___destroy___0(self);
};
// FloatPtr
/** @suppress {undefinedVars, duplicate} */function FloatPtr() { throw "cannot construct a FloatPtr, no constructor in IDL" }
FloatPtr.prototype = Object.create(WrapperObject.prototype);
FloatPtr.prototype.constructor = FloatPtr;
FloatPtr.prototype.__class__ = FloatPtr;
FloatPtr.__cache__ = {};
Module['FloatPtr'] = FloatPtr;

  FloatPtr.prototype['__destroy__'] = FloatPtr.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_FloatPtr___destroy___0(self);
};
// ChoiceIterator
/** @suppress {undefinedVars, duplicate} */function ChoiceIterator(result_it) {
  if (result_it && typeof result_it === 'object') result_it = result_it.ptr;
  this.ptr = _emscripten_bind_ChoiceIterator_ChoiceIterator_1(result_it);
  getCache(ChoiceIterator)[this.ptr] = this;
};;
ChoiceIterator.prototype = Object.create(WrapperObject.prototype);
ChoiceIterator.prototype.constructor = ChoiceIterator;
ChoiceIterator.prototype.__class__ = ChoiceIterator;
ChoiceIterator.__cache__ = {};
Module['ChoiceIterator'] = ChoiceIterator;

ChoiceIterator.prototype['Next'] = ChoiceIterator.prototype.Next = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_ChoiceIterator_Next_0(self));
};;

ChoiceIterator.prototype['GetUTF8Text'] = ChoiceIterator.prototype.GetUTF8Text = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return UTF8ToString(_emscripten_bind_ChoiceIterator_GetUTF8Text_0(self));
};;

ChoiceIterator.prototype['Confidence'] = ChoiceIterator.prototype.Confidence = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_ChoiceIterator_Confidence_0(self);
};;

  ChoiceIterator.prototype['__destroy__'] = ChoiceIterator.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_ChoiceIterator___destroy___0(self);
};
// PixPtr
/** @suppress {undefinedVars, duplicate} */function PixPtr() { throw "cannot construct a PixPtr, no constructor in IDL" }
PixPtr.prototype = Object.create(WrapperObject.prototype);
PixPtr.prototype.constructor = PixPtr;
PixPtr.prototype.__class__ = PixPtr;
PixPtr.__cache__ = {};
Module['PixPtr'] = PixPtr;

  PixPtr.prototype['__destroy__'] = PixPtr.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_PixPtr___destroy___0(self);
};
// UNICHARSET
/** @suppress {undefinedVars, duplicate} */function UNICHARSET() { throw "cannot construct a UNICHARSET, no constructor in IDL" }
UNICHARSET.prototype = Object.create(WrapperObject.prototype);
UNICHARSET.prototype.constructor = UNICHARSET;
UNICHARSET.prototype.__class__ = UNICHARSET;
UNICHARSET.__cache__ = {};
Module['UNICHARSET'] = UNICHARSET;

UNICHARSET.prototype['get_script_from_script_id'] = UNICHARSET.prototype.get_script_from_script_id = /** @suppress {undefinedVars, duplicate} */function(id) {
  var self = this.ptr;
  if (id && typeof id === 'object') id = id.ptr;
  return UTF8ToString(_emscripten_bind_UNICHARSET_get_script_from_script_id_1(self, id));
};;

UNICHARSET.prototype['get_script_id_from_name'] = UNICHARSET.prototype.get_script_id_from_name = /** @suppress {undefinedVars, duplicate} */function(script_name) {
  var self = this.ptr;
  ensureCache.prepare();
  if (script_name && typeof script_name === 'object') script_name = script_name.ptr;
  else script_name = ensureString(script_name);
  return _emscripten_bind_UNICHARSET_get_script_id_from_name_1(self, script_name);
};;

UNICHARSET.prototype['get_script_table_size'] = UNICHARSET.prototype.get_script_table_size = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_UNICHARSET_get_script_table_size_0(self);
};;

  UNICHARSET.prototype['__destroy__'] = UNICHARSET.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_UNICHARSET___destroy___0(self);
};
// IntPtr
/** @suppress {undefinedVars, duplicate} */function IntPtr() { throw "cannot construct a IntPtr, no constructor in IDL" }
IntPtr.prototype = Object.create(WrapperObject.prototype);
IntPtr.prototype.constructor = IntPtr;
IntPtr.prototype.__class__ = IntPtr;
IntPtr.__cache__ = {};
Module['IntPtr'] = IntPtr;

  IntPtr.prototype['__destroy__'] = IntPtr.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_IntPtr___destroy___0(self);
};
// Orientation
/** @suppress {undefinedVars, duplicate} */function Orientation() { throw "cannot construct a Orientation, no constructor in IDL" }
Orientation.prototype = Object.create(WrapperObject.prototype);
Orientation.prototype.constructor = Orientation;
Orientation.prototype.__class__ = Orientation;
Orientation.__cache__ = {};
Module['Orientation'] = Orientation;

  Orientation.prototype['__destroy__'] = Orientation.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_Orientation___destroy___0(self);
};
// OSBestResult
/** @suppress {undefinedVars, duplicate} */function OSBestResult() { throw "cannot construct a OSBestResult, no constructor in IDL" }
OSBestResult.prototype = Object.create(WrapperObject.prototype);
OSBestResult.prototype.constructor = OSBestResult;
OSBestResult.prototype.__class__ = OSBestResult;
OSBestResult.__cache__ = {};
Module['OSBestResult'] = OSBestResult;

  OSBestResult.prototype['get_orientation_id'] = OSBestResult.prototype.get_orientation_id = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_OSBestResult_get_orientation_id_0(self);
};
    Object.defineProperty(OSBestResult.prototype, 'orientation_id', { get: OSBestResult.prototype.get_orientation_id });
  OSBestResult.prototype['get_script_id'] = OSBestResult.prototype.get_script_id = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_OSBestResult_get_script_id_0(self);
};
    Object.defineProperty(OSBestResult.prototype, 'script_id', { get: OSBestResult.prototype.get_script_id });
  OSBestResult.prototype['get_sconfidence'] = OSBestResult.prototype.get_sconfidence = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_OSBestResult_get_sconfidence_0(self);
};
    Object.defineProperty(OSBestResult.prototype, 'sconfidence', { get: OSBestResult.prototype.get_sconfidence });
  OSBestResult.prototype['get_oconfidence'] = OSBestResult.prototype.get_oconfidence = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_OSBestResult_get_oconfidence_0(self);
};
    Object.defineProperty(OSBestResult.prototype, 'oconfidence', { get: OSBestResult.prototype.get_oconfidence });
  OSBestResult.prototype['__destroy__'] = OSBestResult.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_OSBestResult___destroy___0(self);
};
// Boxa
/** @suppress {undefinedVars, duplicate} */function Boxa() { throw "cannot construct a Boxa, no constructor in IDL" }
Boxa.prototype = Object.create(WrapperObject.prototype);
Boxa.prototype.constructor = Boxa;
Boxa.prototype.__class__ = Boxa;
Boxa.__cache__ = {};
Module['Boxa'] = Boxa;

  Boxa.prototype['get_n'] = Boxa.prototype.get_n = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_Boxa_get_n_0(self);
};
    Object.defineProperty(Boxa.prototype, 'n', { get: Boxa.prototype.get_n });
  Boxa.prototype['get_nalloc'] = Boxa.prototype.get_nalloc = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_Boxa_get_nalloc_0(self);
};
    Object.defineProperty(Boxa.prototype, 'nalloc', { get: Boxa.prototype.get_nalloc });
  Boxa.prototype['get_refcount'] = Boxa.prototype.get_refcount = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_Boxa_get_refcount_0(self);
};
    Object.defineProperty(Boxa.prototype, 'refcount', { get: Boxa.prototype.get_refcount });
  Boxa.prototype['get_box'] = Boxa.prototype.get_box = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_Boxa_get_box_0(self), BoxPtr);
};
    Object.defineProperty(Boxa.prototype, 'box', { get: Boxa.prototype.get_box });
  Boxa.prototype['__destroy__'] = Boxa.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_Boxa___destroy___0(self);
};
// PixColormap
/** @suppress {undefinedVars, duplicate} */function PixColormap() { throw "cannot construct a PixColormap, no constructor in IDL" }
PixColormap.prototype = Object.create(WrapperObject.prototype);
PixColormap.prototype.constructor = PixColormap;
PixColormap.prototype.__class__ = PixColormap;
PixColormap.__cache__ = {};
Module['PixColormap'] = PixColormap;

  PixColormap.prototype['get_array'] = PixColormap.prototype.get_array = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_PixColormap_get_array_0(self);
};
    Object.defineProperty(PixColormap.prototype, 'array', { get: PixColormap.prototype.get_array });
  PixColormap.prototype['get_depth'] = PixColormap.prototype.get_depth = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_PixColormap_get_depth_0(self);
};
    Object.defineProperty(PixColormap.prototype, 'depth', { get: PixColormap.prototype.get_depth });
  PixColormap.prototype['get_nalloc'] = PixColormap.prototype.get_nalloc = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_PixColormap_get_nalloc_0(self);
};
    Object.defineProperty(PixColormap.prototype, 'nalloc', { get: PixColormap.prototype.get_nalloc });
  PixColormap.prototype['get_n'] = PixColormap.prototype.get_n = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_PixColormap_get_n_0(self);
};
    Object.defineProperty(PixColormap.prototype, 'n', { get: PixColormap.prototype.get_n });
  PixColormap.prototype['__destroy__'] = PixColormap.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_PixColormap___destroy___0(self);
};
// Pta
/** @suppress {undefinedVars, duplicate} */function Pta() { throw "cannot construct a Pta, no constructor in IDL" }
Pta.prototype = Object.create(WrapperObject.prototype);
Pta.prototype.constructor = Pta;
Pta.prototype.__class__ = Pta;
Pta.__cache__ = {};
Module['Pta'] = Pta;

  Pta.prototype['get_n'] = Pta.prototype.get_n = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_Pta_get_n_0(self);
};
    Object.defineProperty(Pta.prototype, 'n', { get: Pta.prototype.get_n });
  Pta.prototype['get_nalloc'] = Pta.prototype.get_nalloc = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_Pta_get_nalloc_0(self);
};
    Object.defineProperty(Pta.prototype, 'nalloc', { get: Pta.prototype.get_nalloc });
  Pta.prototype['get_refcount'] = Pta.prototype.get_refcount = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_Pta_get_refcount_0(self);
};
    Object.defineProperty(Pta.prototype, 'refcount', { get: Pta.prototype.get_refcount });
  Pta.prototype['get_x'] = Pta.prototype.get_x = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_Pta_get_x_0(self), FloatPtr);
};
    Object.defineProperty(Pta.prototype, 'x', { get: Pta.prototype.get_x });
  Pta.prototype['get_y'] = Pta.prototype.get_y = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_Pta_get_y_0(self), FloatPtr);
};
    Object.defineProperty(Pta.prototype, 'y', { get: Pta.prototype.get_y });
  Pta.prototype['__destroy__'] = Pta.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_Pta___destroy___0(self);
};
// Pix
/** @suppress {undefinedVars, duplicate} */function Pix() { throw "cannot construct a Pix, no constructor in IDL" }
Pix.prototype = Object.create(WrapperObject.prototype);
Pix.prototype.constructor = Pix;
Pix.prototype.__class__ = Pix;
Pix.__cache__ = {};
Module['Pix'] = Pix;

  Pix.prototype['get_w'] = Pix.prototype.get_w = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_Pix_get_w_0(self);
};
    Object.defineProperty(Pix.prototype, 'w', { get: Pix.prototype.get_w });
  Pix.prototype['get_h'] = Pix.prototype.get_h = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_Pix_get_h_0(self);
};
    Object.defineProperty(Pix.prototype, 'h', { get: Pix.prototype.get_h });
  Pix.prototype['get_d'] = Pix.prototype.get_d = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_Pix_get_d_0(self);
};
    Object.defineProperty(Pix.prototype, 'd', { get: Pix.prototype.get_d });
  Pix.prototype['get_spp'] = Pix.prototype.get_spp = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_Pix_get_spp_0(self);
};
    Object.defineProperty(Pix.prototype, 'spp', { get: Pix.prototype.get_spp });
  Pix.prototype['get_wpl'] = Pix.prototype.get_wpl = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_Pix_get_wpl_0(self);
};
    Object.defineProperty(Pix.prototype, 'wpl', { get: Pix.prototype.get_wpl });
  Pix.prototype['get_refcount'] = Pix.prototype.get_refcount = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_Pix_get_refcount_0(self);
};
    Object.defineProperty(Pix.prototype, 'refcount', { get: Pix.prototype.get_refcount });
  Pix.prototype['get_xres'] = Pix.prototype.get_xres = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_Pix_get_xres_0(self);
};
    Object.defineProperty(Pix.prototype, 'xres', { get: Pix.prototype.get_xres });
  Pix.prototype['get_yres'] = Pix.prototype.get_yres = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_Pix_get_yres_0(self);
};
    Object.defineProperty(Pix.prototype, 'yres', { get: Pix.prototype.get_yres });
  Pix.prototype['get_informat'] = Pix.prototype.get_informat = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_Pix_get_informat_0(self);
};
    Object.defineProperty(Pix.prototype, 'informat', { get: Pix.prototype.get_informat });
  Pix.prototype['get_special'] = Pix.prototype.get_special = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_Pix_get_special_0(self);
};
    Object.defineProperty(Pix.prototype, 'special', { get: Pix.prototype.get_special });
  Pix.prototype['get_text'] = Pix.prototype.get_text = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return UTF8ToString(_emscripten_bind_Pix_get_text_0(self));
};
    Object.defineProperty(Pix.prototype, 'text', { get: Pix.prototype.get_text });
  Pix.prototype['get_colormap'] = Pix.prototype.get_colormap = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_Pix_get_colormap_0(self), PixColormap);
};
    Object.defineProperty(Pix.prototype, 'colormap', { get: Pix.prototype.get_colormap });
  Pix.prototype['get_data'] = Pix.prototype.get_data = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_Pix_get_data_0(self);
};
    Object.defineProperty(Pix.prototype, 'data', { get: Pix.prototype.get_data });
  Pix.prototype['__destroy__'] = Pix.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_Pix___destroy___0(self);
};
// DoublePtr
/** @suppress {undefinedVars, duplicate} */function DoublePtr() { throw "cannot construct a DoublePtr, no constructor in IDL" }
DoublePtr.prototype = Object.create(WrapperObject.prototype);
DoublePtr.prototype.constructor = DoublePtr;
DoublePtr.prototype.__class__ = DoublePtr;
DoublePtr.__cache__ = {};
Module['DoublePtr'] = DoublePtr;

  DoublePtr.prototype['__destroy__'] = DoublePtr.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_DoublePtr___destroy___0(self);
};
// Dawg
/** @suppress {undefinedVars, duplicate} */function Dawg() { throw "cannot construct a Dawg, no constructor in IDL" }
Dawg.prototype = Object.create(WrapperObject.prototype);
Dawg.prototype.constructor = Dawg;
Dawg.prototype.__class__ = Dawg;
Dawg.__cache__ = {};
Module['Dawg'] = Dawg;

  Dawg.prototype['__destroy__'] = Dawg.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_Dawg___destroy___0(self);
};
// BoxPtr
/** @suppress {undefinedVars, duplicate} */function BoxPtr() { throw "cannot construct a BoxPtr, no constructor in IDL" }
BoxPtr.prototype = Object.create(WrapperObject.prototype);
BoxPtr.prototype.constructor = BoxPtr;
BoxPtr.prototype.__class__ = BoxPtr;
BoxPtr.__cache__ = {};
Module['BoxPtr'] = BoxPtr;

  BoxPtr.prototype['__destroy__'] = BoxPtr.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_BoxPtr___destroy___0(self);
};
// TessBaseAPI
/** @suppress {undefinedVars, duplicate} */function TessBaseAPI() {
  this.ptr = _emscripten_bind_TessBaseAPI_TessBaseAPI_0();
  getCache(TessBaseAPI)[this.ptr] = this;
};;
TessBaseAPI.prototype = Object.create(WrapperObject.prototype);
TessBaseAPI.prototype.constructor = TessBaseAPI;
TessBaseAPI.prototype.__class__ = TessBaseAPI;
TessBaseAPI.__cache__ = {};
Module['TessBaseAPI'] = TessBaseAPI;

TessBaseAPI.prototype['Version'] = TessBaseAPI.prototype.Version = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return UTF8ToString(_emscripten_bind_TessBaseAPI_Version_0(self));
};;

TessBaseAPI.prototype['SetInputName'] = TessBaseAPI.prototype.SetInputName = /** @suppress {undefinedVars, duplicate} */function(name) {
  var self = this.ptr;
  ensureCache.prepare();
  if (name && typeof name === 'object') name = name.ptr;
  else name = ensureString(name);
  _emscripten_bind_TessBaseAPI_SetInputName_1(self, name);
};;

TessBaseAPI.prototype['GetInputName'] = TessBaseAPI.prototype.GetInputName = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return UTF8ToString(_emscripten_bind_TessBaseAPI_GetInputName_0(self));
};;

TessBaseAPI.prototype['SetInputImage'] = TessBaseAPI.prototype.SetInputImage = /** @suppress {undefinedVars, duplicate} */function(pix) {
  var self = this.ptr;
  if (pix && typeof pix === 'object') pix = pix.ptr;
  _emscripten_bind_TessBaseAPI_SetInputImage_1(self, pix);
};;

TessBaseAPI.prototype['GetInputImage'] = TessBaseAPI.prototype.GetInputImage = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_TessBaseAPI_GetInputImage_0(self), Pix);
};;

TessBaseAPI.prototype['GetSourceYResolution'] = TessBaseAPI.prototype.GetSourceYResolution = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_TessBaseAPI_GetSourceYResolution_0(self);
};;

TessBaseAPI.prototype['GetDatapath'] = TessBaseAPI.prototype.GetDatapath = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return UTF8ToString(_emscripten_bind_TessBaseAPI_GetDatapath_0(self));
};;

TessBaseAPI.prototype['SetOutputName'] = TessBaseAPI.prototype.SetOutputName = /** @suppress {undefinedVars, duplicate} */function(name) {
  var self = this.ptr;
  ensureCache.prepare();
  if (name && typeof name === 'object') name = name.ptr;
  else name = ensureString(name);
  _emscripten_bind_TessBaseAPI_SetOutputName_1(self, name);
};;

TessBaseAPI.prototype['SetVariable'] = TessBaseAPI.prototype.SetVariable = /** @suppress {undefinedVars, duplicate} */function(name, value) {
  var self = this.ptr;
  ensureCache.prepare();
  if (name && typeof name === 'object') name = name.ptr;
  else name = ensureString(name);
  if (value && typeof value === 'object') value = value.ptr;
  else value = ensureString(value);
  return !!(_emscripten_bind_TessBaseAPI_SetVariable_2(self, name, value));
};;

TessBaseAPI.prototype['SetDebugVariable'] = TessBaseAPI.prototype.SetDebugVariable = /** @suppress {undefinedVars, duplicate} */function(name, value) {
  var self = this.ptr;
  ensureCache.prepare();
  if (name && typeof name === 'object') name = name.ptr;
  else name = ensureString(name);
  if (value && typeof value === 'object') value = value.ptr;
  else value = ensureString(value);
  return !!(_emscripten_bind_TessBaseAPI_SetDebugVariable_2(self, name, value));
};;

TessBaseAPI.prototype['GetIntVariable'] = TessBaseAPI.prototype.GetIntVariable = /** @suppress {undefinedVars, duplicate} */function(name, value) {
  var self = this.ptr;
  ensureCache.prepare();
  if (name && typeof name === 'object') name = name.ptr;
  else name = ensureString(name);
  if (value && typeof value === 'object') value = value.ptr;
  return !!(_emscripten_bind_TessBaseAPI_GetIntVariable_2(self, name, value));
};;

TessBaseAPI.prototype['GetBoolVariable'] = TessBaseAPI.prototype.GetBoolVariable = /** @suppress {undefinedVars, duplicate} */function(name, value) {
  var self = this.ptr;
  ensureCache.prepare();
  if (name && typeof name === 'object') name = name.ptr;
  else name = ensureString(name);
  if (value && typeof value === 'object') value = value.ptr;
  return !!(_emscripten_bind_TessBaseAPI_GetBoolVariable_2(self, name, value));
};;

TessBaseAPI.prototype['GetDoubleVariable'] = TessBaseAPI.prototype.GetDoubleVariable = /** @suppress {undefinedVars, duplicate} */function(name, value) {
  var self = this.ptr;
  ensureCache.prepare();
  if (name && typeof name === 'object') name = name.ptr;
  else name = ensureString(name);
  if (value && typeof value === 'object') value = value.ptr;
  return !!(_emscripten_bind_TessBaseAPI_GetDoubleVariable_2(self, name, value));
};;

TessBaseAPI.prototype['GetStringVariable'] = TessBaseAPI.prototype.GetStringVariable = /** @suppress {undefinedVars, duplicate} */function(name) {
  var self = this.ptr;
  ensureCache.prepare();
  if (name && typeof name === 'object') name = name.ptr;
  else name = ensureString(name);
  return UTF8ToString(_emscripten_bind_TessBaseAPI_GetStringVariable_1(self, name));
};;

TessBaseAPI.prototype['Init'] = TessBaseAPI.prototype.Init = /** @suppress {undefinedVars, duplicate} */function(datapath, language, oem, configFilename) {

  
  if (oem === undefined && configFilename !== undefined) oem = 3;

  var self = this.ptr;
  ensureCache.prepare();
  if (datapath && typeof datapath === 'object') datapath = datapath.ptr;
  else datapath = ensureString(datapath);
  if (language && typeof language === 'object') language = language.ptr;
  else language = ensureString(language);
  if (configFilename && typeof configFilename === 'object') configFilename = configFilename.ptr;
  else configFilename = ensureString(configFilename);
  if (oem && typeof oem === 'object') oem = oem.ptr;
  // OEM 3 (OEM_DEFAULT) is the default
  if (oem === undefined && configFilename !== undefined) {return _emscripten_bind_TessBaseAPI_Init_4(self, datapath, language, 3, configFilename)}
  if (oem === undefined) { return _emscripten_bind_TessBaseAPI_Init_2(self, datapath, language) };
  if (configFilename === undefined) {return _emscripten_bind_TessBaseAPI_Init_3(self, datapath, language, oem)};
  return _emscripten_bind_TessBaseAPI_Init_4(self, datapath, language, oem, configFilename);
};;

TessBaseAPI.prototype['GetInitLanguagesAsString'] = TessBaseAPI.prototype.GetInitLanguagesAsString = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return UTF8ToString(_emscripten_bind_TessBaseAPI_GetInitLanguagesAsString_0(self));
};;

TessBaseAPI.prototype['InitForAnalysePage'] = TessBaseAPI.prototype.InitForAnalysePage = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_TessBaseAPI_InitForAnalysePage_0(self);
};;

TessBaseAPI.prototype['SaveParameters'] = TessBaseAPI.prototype.SaveParameters = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_TessBaseAPI_SaveParameters_1(self);
};;

TessBaseAPI.prototype['RestoreParameters'] = TessBaseAPI.prototype.RestoreParameters = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_TessBaseAPI_RestoreParameters_1(self);
};;

TessBaseAPI.prototype['ReadConfigFile'] = TessBaseAPI.prototype.ReadConfigFile = /** @suppress {undefinedVars, duplicate} */function(filename) {
  var self = this.ptr;
  ensureCache.prepare();
  if (filename && typeof filename === 'object') filename = filename.ptr;
  else filename = ensureString(filename);
  _emscripten_bind_TessBaseAPI_ReadConfigFile_1(self, filename);
};;

TessBaseAPI.prototype['ReadDebugConfigFile'] = TessBaseAPI.prototype.ReadDebugConfigFile = /** @suppress {undefinedVars, duplicate} */function(filename) {
  var self = this.ptr;
  ensureCache.prepare();
  if (filename && typeof filename === 'object') filename = filename.ptr;
  else filename = ensureString(filename);
  _emscripten_bind_TessBaseAPI_ReadDebugConfigFile_1(self, filename);
};;

TessBaseAPI.prototype['SetPageSegMode'] = TessBaseAPI.prototype.SetPageSegMode = /** @suppress {undefinedVars, duplicate} */function(mode) {
  var self = this.ptr;
  if (mode && typeof mode === 'object') mode = mode.ptr;
  _emscripten_bind_TessBaseAPI_SetPageSegMode_1(self, mode);
};;

TessBaseAPI.prototype['GetPageSegMode'] = TessBaseAPI.prototype.GetPageSegMode = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_TessBaseAPI_GetPageSegMode_0(self);
};;

TessBaseAPI.prototype['TesseractRect'] = TessBaseAPI.prototype.TesseractRect = /** @suppress {undefinedVars, duplicate} */function(imagedata, bytes_per_pixel, bytes_per_line, left, top, width, height) {
  var self = this.ptr;
  if (imagedata && typeof imagedata === 'object') imagedata = imagedata.ptr;
  if (bytes_per_pixel && typeof bytes_per_pixel === 'object') bytes_per_pixel = bytes_per_pixel.ptr;
  if (bytes_per_line && typeof bytes_per_line === 'object') bytes_per_line = bytes_per_line.ptr;
  if (left && typeof left === 'object') left = left.ptr;
  if (top && typeof top === 'object') top = top.ptr;
  if (width && typeof width === 'object') width = width.ptr;
  if (height && typeof height === 'object') height = height.ptr;
  return UTF8ToString(_emscripten_bind_TessBaseAPI_TesseractRect_7(self, imagedata, bytes_per_pixel, bytes_per_line, left, top, width, height));
};;

TessBaseAPI.prototype['ClearAdaptiveClassifier'] = TessBaseAPI.prototype.ClearAdaptiveClassifier = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_TessBaseAPI_ClearAdaptiveClassifier_0(self);
};;

TessBaseAPI.prototype['SetImage'] = TessBaseAPI.prototype.SetImage = /** @suppress {undefinedVars, duplicate} */function(imagedata, width, height, bytes_per_pixel, bytes_per_line, exif = 1, angle = 0) {
  var self = this.ptr;
  if (imagedata && typeof imagedata === 'object') imagedata = imagedata.ptr;
  if (width && typeof width === 'object') width = width.ptr;
  if (height && typeof height === 'object') height = height.ptr;
  if (bytes_per_pixel && typeof bytes_per_pixel === 'object') bytes_per_pixel = bytes_per_pixel.ptr;
  if (bytes_per_line && typeof bytes_per_line === 'object') bytes_per_line = bytes_per_line.ptr;
  if (width === undefined || width === null) { _emscripten_bind_TessBaseAPI_SetImage_1(self, imagedata, exif, angle);  return }
  _emscripten_bind_TessBaseAPI_SetImage_5(self, imagedata, width, height, bytes_per_pixel, bytes_per_line, exif, angle);
};;

TessBaseAPI.prototype['SetImageFile'] = TessBaseAPI.prototype.SetImageFile = /** @suppress {undefinedVars, duplicate} */function(exif = 1, angle = 0){
  var self = this.ptr;
  return _emscripten_bind_TessBaseAPI_SetImageFile_1(self, exif, angle);
}

TessBaseAPI.prototype['SetSourceResolution'] = TessBaseAPI.prototype.SetSourceResolution = /** @suppress {undefinedVars, duplicate} */function(ppi) {
  var self = this.ptr;
  if (ppi && typeof ppi === 'object') ppi = ppi.ptr;
  _emscripten_bind_TessBaseAPI_SetSourceResolution_1(self, ppi);
};;

TessBaseAPI.prototype['SetRectangle'] = TessBaseAPI.prototype.SetRectangle = /** @suppress {undefinedVars, duplicate} */function(left, top, width, height) {
  var self = this.ptr;
  if (left && typeof left === 'object') left = left.ptr;
  if (top && typeof top === 'object') top = top.ptr;
  if (width && typeof width === 'object') width = width.ptr;
  if (height && typeof height === 'object') height = height.ptr;
  _emscripten_bind_TessBaseAPI_SetRectangle_4(self, left, top, width, height);
};;

TessBaseAPI.prototype['GetThresholdedImage'] = TessBaseAPI.prototype.GetThresholdedImage = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_TessBaseAPI_GetThresholdedImage_0(self), Pix);
};;

TessBaseAPI.prototype['WriteImage'] = TessBaseAPI.prototype.WriteImage = /** @suppress {undefinedVars, duplicate} */function(type) {
  var self = this.ptr;
  _emscripten_bind_TessBaseAPI_WriteImage_0(self, type);
};;

TessBaseAPI.prototype['GetRegions'] = TessBaseAPI.prototype.GetRegions = /** @suppress {undefinedVars, duplicate} */function(pixa) {
  var self = this.ptr;
  if (pixa && typeof pixa === 'object') pixa = pixa.ptr;
  return wrapPointer(_emscripten_bind_TessBaseAPI_GetRegions_1(self, pixa), Boxa);
};;

TessBaseAPI.prototype['GetTextlines'] = TessBaseAPI.prototype.GetTextlines = /** @suppress {undefinedVars, duplicate} */function(raw_image, raw_padding, pixa, blockids, paraids) {
  var self = this.ptr;
  if (raw_image && typeof raw_image === 'object') raw_image = raw_image.ptr;
  if (raw_padding && typeof raw_padding === 'object') raw_padding = raw_padding.ptr;
  if (pixa && typeof pixa === 'object') pixa = pixa.ptr;
  if (blockids && typeof blockids === 'object') blockids = blockids.ptr;
  if (paraids && typeof paraids === 'object') paraids = paraids.ptr;
  if (pixa === undefined) { return wrapPointer(_emscripten_bind_TessBaseAPI_GetTextlines_2(self, raw_image, raw_padding), Boxa) }
  if (blockids === undefined) { return wrapPointer(_emscripten_bind_TessBaseAPI_GetTextlines_3(self, raw_image, raw_padding, pixa), Boxa) }
  if (paraids === undefined) { return wrapPointer(_emscripten_bind_TessBaseAPI_GetTextlines_4(self, raw_image, raw_padding, pixa, blockids), Boxa) }
  return wrapPointer(_emscripten_bind_TessBaseAPI_GetTextlines_5(self, raw_image, raw_padding, pixa, blockids, paraids), Boxa);
};;

TessBaseAPI.prototype['GetStrips'] = TessBaseAPI.prototype.GetStrips = /** @suppress {undefinedVars, duplicate} */function(pixa, blockids) {
  var self = this.ptr;
  if (pixa && typeof pixa === 'object') pixa = pixa.ptr;
  if (blockids && typeof blockids === 'object') blockids = blockids.ptr;
  return wrapPointer(_emscripten_bind_TessBaseAPI_GetStrips_2(self, pixa, blockids), Boxa);
};;

TessBaseAPI.prototype['GetWords'] = TessBaseAPI.prototype.GetWords = /** @suppress {undefinedVars, duplicate} */function(pixa) {
  var self = this.ptr;
  if (pixa && typeof pixa === 'object') pixa = pixa.ptr;
  return wrapPointer(_emscripten_bind_TessBaseAPI_GetWords_1(self, pixa), Boxa);
};;

TessBaseAPI.prototype['GetConnectedComponents'] = TessBaseAPI.prototype.GetConnectedComponents = /** @suppress {undefinedVars, duplicate} */function(cc) {
  var self = this.ptr;
  if (cc && typeof cc === 'object') cc = cc.ptr;
  return wrapPointer(_emscripten_bind_TessBaseAPI_GetConnectedComponents_1(self, cc), Boxa);
};;

TessBaseAPI.prototype['GetComponentImages'] = TessBaseAPI.prototype.GetComponentImages = /** @suppress {undefinedVars, duplicate} */function(level, text_only, raw_image, raw_padding, pixa, blockids, paraids) {
  var self = this.ptr;
  if (level && typeof level === 'object') level = level.ptr;
  if (text_only && typeof text_only === 'object') text_only = text_only.ptr;
  if (raw_image && typeof raw_image === 'object') raw_image = raw_image.ptr;
  if (raw_padding && typeof raw_padding === 'object') raw_padding = raw_padding.ptr;
  if (pixa && typeof pixa === 'object') pixa = pixa.ptr;
  if (blockids && typeof blockids === 'object') blockids = blockids.ptr;
  if (paraids && typeof paraids === 'object') paraids = paraids.ptr;
  if (pixa === undefined) { return wrapPointer(_emscripten_bind_TessBaseAPI_GetComponentImages_4(self, level, text_only, raw_image, raw_padding), Boxa) }
  if (blockids === undefined) { return wrapPointer(_emscripten_bind_TessBaseAPI_GetComponentImages_5(self, level, text_only, raw_image, raw_padding, pixa), Boxa) }
  if (paraids === undefined) { return wrapPointer(_emscripten_bind_TessBaseAPI_GetComponentImages_6(self, level, text_only, raw_image, raw_padding, pixa, blockids), Boxa) }
  return wrapPointer(_emscripten_bind_TessBaseAPI_GetComponentImages_7(self, level, text_only, raw_image, raw_padding, pixa, blockids, paraids), Boxa);
};;

TessBaseAPI.prototype['GetThresholdedImageScaleFactor'] = TessBaseAPI.prototype.GetThresholdedImageScaleFactor = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_TessBaseAPI_GetThresholdedImageScaleFactor_0(self);
};;

TessBaseAPI.prototype['AnalyseLayout'] = TessBaseAPI.prototype.AnalyseLayout = /** @suppress {undefinedVars, duplicate} */function(merge_similar_words) {
  var self = this.ptr;
  if (merge_similar_words && typeof merge_similar_words === 'object') merge_similar_words = merge_similar_words.ptr;
  if (merge_similar_words === undefined) { return wrapPointer(_emscripten_bind_TessBaseAPI_AnalyseLayout_0(self), PageIterator) }
  return wrapPointer(_emscripten_bind_TessBaseAPI_AnalyseLayout_1(self, merge_similar_words), PageIterator);
};;

TessBaseAPI.prototype['Recognize'] = TessBaseAPI.prototype.Recognize = /** @suppress {undefinedVars, duplicate} */function(monitor) {
  var self = this.ptr;
  if (monitor && typeof monitor === 'object') monitor = monitor.ptr;
  return _emscripten_bind_TessBaseAPI_Recognize_1(self, monitor);
};;

TessBaseAPI.prototype['FindLines'] = TessBaseAPI.prototype.FindLines = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_TessBaseAPI_FindLines_0(self);
};;

TessBaseAPI.prototype['GetGradient'] = TessBaseAPI.prototype.GetGradient = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_TessBaseAPI_GetGradient_0(self);
};;

TessBaseAPI.prototype['ProcessPages'] = TessBaseAPI.prototype.ProcessPages = /** @suppress {undefinedVars, duplicate} */function(filename, retry_config, timeout_millisec, renderer) {
  var self = this.ptr;
  ensureCache.prepare();
  if (filename && typeof filename === 'object') filename = filename.ptr;
  else filename = ensureString(filename);
  if (retry_config && typeof retry_config === 'object') retry_config = retry_config.ptr;
  else retry_config = ensureString(retry_config);
  if (timeout_millisec && typeof timeout_millisec === 'object') timeout_millisec = timeout_millisec.ptr;
  if (renderer && typeof renderer === 'object') renderer = renderer.ptr;
  return !!(_emscripten_bind_TessBaseAPI_ProcessPages_4(self, filename, retry_config, timeout_millisec, renderer));
};;

TessBaseAPI.prototype['ProcessPage'] = TessBaseAPI.prototype.ProcessPage = /** @suppress {undefinedVars, duplicate} */function(pix, page_index, filename, retry_config, timeout_millisec, renderer) {
  var self = this.ptr;
  ensureCache.prepare();
  if (pix && typeof pix === 'object') pix = pix.ptr;
  if (page_index && typeof page_index === 'object') page_index = page_index.ptr;
  if (filename && typeof filename === 'object') filename = filename.ptr;
  else filename = ensureString(filename);
  if (retry_config && typeof retry_config === 'object') retry_config = retry_config.ptr;
  else retry_config = ensureString(retry_config);
  if (timeout_millisec && typeof timeout_millisec === 'object') timeout_millisec = timeout_millisec.ptr;
  if (renderer && typeof renderer === 'object') renderer = renderer.ptr;
  return !!(_emscripten_bind_TessBaseAPI_ProcessPage_6(self, pix, page_index, filename, retry_config, timeout_millisec, renderer));
};;

TessBaseAPI.prototype['GetIterator'] = TessBaseAPI.prototype.GetIterator = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_TessBaseAPI_GetIterator_0(self), ResultIterator);
};;

TessBaseAPI.prototype['GetUTF8Text'] = TessBaseAPI.prototype.GetUTF8Text = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return UTF8ToString(_emscripten_bind_TessBaseAPI_GetUTF8Text_0(self));
};;

TessBaseAPI.prototype['GetHOCRText'] = TessBaseAPI.prototype.GetHOCRText = /** @suppress {undefinedVars, duplicate} */function(page_number) {
  var self = this.ptr;
  if (page_number && typeof page_number === 'object') page_number = page_number.ptr;
  return UTF8ToString(_emscripten_bind_TessBaseAPI_GetHOCRText_1(self, page_number));
};;

TessBaseAPI.prototype['GetTSVText'] = TessBaseAPI.prototype.GetTSVText = /** @suppress {undefinedVars, duplicate} */function(page_number) {
  var self = this.ptr;
  if (page_number && typeof page_number === 'object') page_number = page_number.ptr;
  return UTF8ToString(_emscripten_bind_TessBaseAPI_GetTSVText_1(self, page_number));
};;

TessBaseAPI.prototype['GetBoxText'] = TessBaseAPI.prototype.GetBoxText = /** @suppress {undefinedVars, duplicate} */function(page_number) {
  var self = this.ptr;
  if (page_number && typeof page_number === 'object') page_number = page_number.ptr;
  return UTF8ToString(_emscripten_bind_TessBaseAPI_GetBoxText_1(self, page_number));
};;

TessBaseAPI.prototype['GetUNLVText'] = TessBaseAPI.prototype.GetUNLVText = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return UTF8ToString(_emscripten_bind_TessBaseAPI_GetUNLVText_0(self));
};;

TessBaseAPI.prototype['GetOsdText'] = TessBaseAPI.prototype.GetOsdText = /** @suppress {undefinedVars, duplicate} */function(page_number) {
  var self = this.ptr;
  if (page_number && typeof page_number === 'object') page_number = page_number.ptr;
  return UTF8ToString(_emscripten_bind_TessBaseAPI_GetOsdText_1(self, page_number));
};;

TessBaseAPI.prototype['MeanTextConf'] = TessBaseAPI.prototype.MeanTextConf = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_TessBaseAPI_MeanTextConf_0(self);
};;

TessBaseAPI.prototype['AllWordConfidences'] = TessBaseAPI.prototype.AllWordConfidences = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_TessBaseAPI_AllWordConfidences_0(self), IntPtr);
};;

TessBaseAPI.prototype['AdaptToWordStr'] = TessBaseAPI.prototype.AdaptToWordStr = /** @suppress {undefinedVars, duplicate} */function(mode, wordstr) {
  var self = this.ptr;
  ensureCache.prepare();
  if (mode && typeof mode === 'object') mode = mode.ptr;
  if (wordstr && typeof wordstr === 'object') wordstr = wordstr.ptr;
  else wordstr = ensureString(wordstr);
  return !!(_emscripten_bind_TessBaseAPI_AdaptToWordStr_2(self, mode, wordstr));
};;

TessBaseAPI.prototype['Clear'] = TessBaseAPI.prototype.Clear = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_TessBaseAPI_Clear_0(self);
};;

TessBaseAPI.prototype['End'] = TessBaseAPI.prototype.End = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_TessBaseAPI_End_0(self);
};;

TessBaseAPI.prototype['ClearPersistentCache'] = TessBaseAPI.prototype.ClearPersistentCache = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_TessBaseAPI_ClearPersistentCache_0(self);
};;

TessBaseAPI.prototype['IsValidWord'] = TessBaseAPI.prototype.IsValidWord = /** @suppress {undefinedVars, duplicate} */function(word) {
  var self = this.ptr;
  ensureCache.prepare();
  if (word && typeof word === 'object') word = word.ptr;
  else word = ensureString(word);
  return _emscripten_bind_TessBaseAPI_IsValidWord_1(self, word);
};;

TessBaseAPI.prototype['IsValidCharacter'] = TessBaseAPI.prototype.IsValidCharacter = /** @suppress {undefinedVars, duplicate} */function(utf8_character) {
  var self = this.ptr;
  ensureCache.prepare();
  if (utf8_character && typeof utf8_character === 'object') utf8_character = utf8_character.ptr;
  else utf8_character = ensureString(utf8_character);
  return !!(_emscripten_bind_TessBaseAPI_IsValidCharacter_1(self, utf8_character));
};;

TessBaseAPI.prototype['DetectOS'] = TessBaseAPI.prototype.DetectOS = /** @suppress {undefinedVars, duplicate} */function(osr) {
  var self = this.ptr;
  if (osr && typeof osr === 'object') osr = osr.ptr;
  return !!(_emscripten_bind_TessBaseAPI_DetectOS_1(self, osr));
};;

TessBaseAPI.prototype['GetUnichar'] = TessBaseAPI.prototype.GetUnichar = /** @suppress {undefinedVars, duplicate} */function(unichar_id) {
  var self = this.ptr;
  if (unichar_id && typeof unichar_id === 'object') unichar_id = unichar_id.ptr;
  return UTF8ToString(_emscripten_bind_TessBaseAPI_GetUnichar_1(self, unichar_id));
};;

TessBaseAPI.prototype['GetDawg'] = TessBaseAPI.prototype.GetDawg = /** @suppress {undefinedVars, duplicate} */function(i) {
  var self = this.ptr;
  if (i && typeof i === 'object') i = i.ptr;
  return wrapPointer(_emscripten_bind_TessBaseAPI_GetDawg_1(self, i), Dawg);
};;

TessBaseAPI.prototype['NumDawgs'] = TessBaseAPI.prototype.NumDawgs = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_TessBaseAPI_NumDawgs_0(self);
};;

TessBaseAPI.prototype['oem'] = TessBaseAPI.prototype.oem = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_TessBaseAPI_oem_0(self);
};;

  TessBaseAPI.prototype['__destroy__'] = TessBaseAPI.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_TessBaseAPI___destroy___0(self);
};
// OSResults
/** @suppress {undefinedVars, duplicate} */function OSResults() {
  this.ptr = _emscripten_bind_OSResults_OSResults_0();
  getCache(OSResults)[this.ptr] = this;
};;
OSResults.prototype = Object.create(WrapperObject.prototype);
OSResults.prototype.constructor = OSResults;
OSResults.prototype.__class__ = OSResults;
OSResults.__cache__ = {};
Module['OSResults'] = OSResults;

OSResults.prototype['print_scores'] = OSResults.prototype.print_scores = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_OSResults_print_scores_0(self);
};;

  OSResults.prototype['get_best_result'] = OSResults.prototype.get_best_result = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_OSResults_get_best_result_0(self), OSBestResult);
};
    Object.defineProperty(OSResults.prototype, 'best_result', { get: OSResults.prototype.get_best_result });
  OSResults.prototype['get_unicharset'] = OSResults.prototype.get_unicharset = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_OSResults_get_unicharset_0(self), UNICHARSET);
};
    Object.defineProperty(OSResults.prototype, 'unicharset', { get: OSResults.prototype.get_unicharset });
  OSResults.prototype['__destroy__'] = OSResults.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_OSResults___destroy___0(self);
};
// Pixa
/** @suppress {undefinedVars, duplicate} */function Pixa() { throw "cannot construct a Pixa, no constructor in IDL" }
Pixa.prototype = Object.create(WrapperObject.prototype);
Pixa.prototype.constructor = Pixa;
Pixa.prototype.__class__ = Pixa;
Pixa.__cache__ = {};
Module['Pixa'] = Pixa;

  Pixa.prototype['get_n'] = Pixa.prototype.get_n = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_Pixa_get_n_0(self);
};
    Object.defineProperty(Pixa.prototype, 'n', { get: Pixa.prototype.get_n });
  Pixa.prototype['get_nalloc'] = Pixa.prototype.get_nalloc = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_Pixa_get_nalloc_0(self);
};
    Object.defineProperty(Pixa.prototype, 'nalloc', { get: Pixa.prototype.get_nalloc });
  Pixa.prototype['get_refcount'] = Pixa.prototype.get_refcount = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return _emscripten_bind_Pixa_get_refcount_0(self);
};
    Object.defineProperty(Pixa.prototype, 'refcount', { get: Pixa.prototype.get_refcount });
  Pixa.prototype['get_pix'] = Pixa.prototype.get_pix = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_Pixa_get_pix_0(self), PixPtr);
};
    Object.defineProperty(Pixa.prototype, 'pix', { get: Pixa.prototype.get_pix });
  Pixa.prototype['get_boxa'] = Pixa.prototype.get_boxa = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_Pixa_get_boxa_0(self), Boxa);
};
    Object.defineProperty(Pixa.prototype, 'boxa', { get: Pixa.prototype.get_boxa });
  Pixa.prototype['__destroy__'] = Pixa.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} */function() {
  var self = this.ptr;
  _emscripten_bind_Pixa___destroy___0(self);
};
(function() {
  function setupEnums() {


    // PageIteratorLevel

    Module['RIL_BLOCK'] = _emscripten_enum_PageIteratorLevel_RIL_BLOCK();

    Module['RIL_PARA'] = _emscripten_enum_PageIteratorLevel_RIL_PARA();

    Module['RIL_TEXTLINE'] = _emscripten_enum_PageIteratorLevel_RIL_TEXTLINE();

    Module['RIL_WORD'] = _emscripten_enum_PageIteratorLevel_RIL_WORD();

    Module['RIL_SYMBOL'] = _emscripten_enum_PageIteratorLevel_RIL_SYMBOL();



    // OcrEngineMode

    Module['OEM_TESSERACT_ONLY'] = _emscripten_enum_OcrEngineMode_OEM_TESSERACT_ONLY();

    Module['OEM_LSTM_ONLY'] = _emscripten_enum_OcrEngineMode_OEM_LSTM_ONLY();

    Module['OEM_TESSERACT_LSTM_COMBINED'] = _emscripten_enum_OcrEngineMode_OEM_TESSERACT_LSTM_COMBINED();

    Module['OEM_DEFAULT'] = _emscripten_enum_OcrEngineMode_OEM_DEFAULT();

    Module['OEM_COUNT'] = _emscripten_enum_OcrEngineMode_OEM_COUNT();



    // WritingDirection_

    Module['WRITING_DIRECTION_LEFT_TO_RIGHT'] = _emscripten_enum_WritingDirection__WRITING_DIRECTION_LEFT_TO_RIGHT();

    Module['WRITING_DIRECTION_RIGHT_TO_LEFT'] = _emscripten_enum_WritingDirection__WRITING_DIRECTION_RIGHT_TO_LEFT();

    Module['WRITING_DIRECTION_TOP_TO_BOTTOM'] = _emscripten_enum_WritingDirection__WRITING_DIRECTION_TOP_TO_BOTTOM();



    // PolyBlockType

    Module['PT_UNKNOWN'] = _emscripten_enum_PolyBlockType_PT_UNKNOWN();

    Module['PT_FLOWING_TEXT'] = _emscripten_enum_PolyBlockType_PT_FLOWING_TEXT();

    Module['PT_HEADING_TEXT'] = _emscripten_enum_PolyBlockType_PT_HEADING_TEXT();

    Module['PT_PULLOUT_TEXT'] = _emscripten_enum_PolyBlockType_PT_PULLOUT_TEXT();

    Module['PT_EQUATION'] = _emscripten_enum_PolyBlockType_PT_EQUATION();

    Module['PT_INLINE_EQUATION'] = _emscripten_enum_PolyBlockType_PT_INLINE_EQUATION();

    Module['PT_TABLE'] = _emscripten_enum_PolyBlockType_PT_TABLE();

    Module['PT_VERTICAL_TEXT'] = _emscripten_enum_PolyBlockType_PT_VERTICAL_TEXT();

    Module['PT_CAPTION_TEXT'] = _emscripten_enum_PolyBlockType_PT_CAPTION_TEXT();

    Module['PT_FLOWING_IMAGE'] = _emscripten_enum_PolyBlockType_PT_FLOWING_IMAGE();

    Module['PT_HEADING_IMAGE'] = _emscripten_enum_PolyBlockType_PT_HEADING_IMAGE();

    Module['PT_PULLOUT_IMAGE'] = _emscripten_enum_PolyBlockType_PT_PULLOUT_IMAGE();

    Module['PT_HORZ_LINE'] = _emscripten_enum_PolyBlockType_PT_HORZ_LINE();

    Module['PT_VERT_LINE'] = _emscripten_enum_PolyBlockType_PT_VERT_LINE();

    Module['PT_NOISE'] = _emscripten_enum_PolyBlockType_PT_NOISE();

    Module['PT_COUNT'] = _emscripten_enum_PolyBlockType_PT_COUNT();



    // StrongScriptDirection

    Module['DIR_NEUTRAL'] = _emscripten_enum_StrongScriptDirection_DIR_NEUTRAL();

    Module['DIR_LEFT_TO_RIGHT'] = _emscripten_enum_StrongScriptDirection_DIR_LEFT_TO_RIGHT();

    Module['DIR_RIGHT_TO_LEFT'] = _emscripten_enum_StrongScriptDirection_DIR_RIGHT_TO_LEFT();

    Module['DIR_MIX'] = _emscripten_enum_StrongScriptDirection_DIR_MIX();



    // ParagraphJustification_

    Module['JUSTIFICATION_UNKNOWN'] = _emscripten_enum_ParagraphJustification__JUSTIFICATION_UNKNOWN();

    Module['JUSTIFICATION_LEFT'] = _emscripten_enum_ParagraphJustification__JUSTIFICATION_LEFT();

    Module['JUSTIFICATION_CENTER'] = _emscripten_enum_ParagraphJustification__JUSTIFICATION_CENTER();

    Module['JUSTIFICATION_RIGHT'] = _emscripten_enum_ParagraphJustification__JUSTIFICATION_RIGHT();



    // TextlineOrder_

    Module['TEXTLINE_ORDER_LEFT_TO_RIGHT'] = _emscripten_enum_TextlineOrder__TEXTLINE_ORDER_LEFT_TO_RIGHT();

    Module['TEXTLINE_ORDER_RIGHT_TO_LEFT'] = _emscripten_enum_TextlineOrder__TEXTLINE_ORDER_RIGHT_TO_LEFT();

    Module['TEXTLINE_ORDER_TOP_TO_BOTTOM'] = _emscripten_enum_TextlineOrder__TEXTLINE_ORDER_TOP_TO_BOTTOM();



    // Orientation_

    Module['ORIENTATION_PAGE_UP'] = _emscripten_enum_Orientation__ORIENTATION_PAGE_UP();

    Module['ORIENTATION_PAGE_RIGHT'] = _emscripten_enum_Orientation__ORIENTATION_PAGE_RIGHT();

    Module['ORIENTATION_PAGE_DOWN'] = _emscripten_enum_Orientation__ORIENTATION_PAGE_DOWN();

    Module['ORIENTATION_PAGE_LEFT'] = _emscripten_enum_Orientation__ORIENTATION_PAGE_LEFT();



    // PageSegMode

    Module['PSM_OSD_ONLY'] = _emscripten_enum_PageSegMode_PSM_OSD_ONLY();

    Module['PSM_AUTO_OSD'] = _emscripten_enum_PageSegMode_PSM_AUTO_OSD();

    Module['PSM_AUTO_ONLY'] = _emscripten_enum_PageSegMode_PSM_AUTO_ONLY();

    Module['PSM_AUTO'] = _emscripten_enum_PageSegMode_PSM_AUTO();

    Module['PSM_SINGLE_COLUMN'] = _emscripten_enum_PageSegMode_PSM_SINGLE_COLUMN();

    Module['PSM_SINGLE_BLOCK_VERT_TEXT'] = _emscripten_enum_PageSegMode_PSM_SINGLE_BLOCK_VERT_TEXT();

    Module['PSM_SINGLE_BLOCK'] = _emscripten_enum_PageSegMode_PSM_SINGLE_BLOCK();

    Module['PSM_SINGLE_LINE'] = _emscripten_enum_PageSegMode_PSM_SINGLE_LINE();

    Module['PSM_SINGLE_WORD'] = _emscripten_enum_PageSegMode_PSM_SINGLE_WORD();

    Module['PSM_CIRCLE_WORD'] = _emscripten_enum_PageSegMode_PSM_CIRCLE_WORD();

    Module['PSM_SINGLE_CHAR'] = _emscripten_enum_PageSegMode_PSM_SINGLE_CHAR();

    Module['PSM_SPARSE_TEXT'] = _emscripten_enum_PageSegMode_PSM_SPARSE_TEXT();

    Module['PSM_SPARSE_TEXT_OSD'] = _emscripten_enum_PageSegMode_PSM_SPARSE_TEXT_OSD();

    Module['PSM_RAW_LINE'] = _emscripten_enum_PageSegMode_PSM_RAW_LINE();

    Module['PSM_COUNT'] = _emscripten_enum_PageSegMode_PSM_COUNT();

  }
  if (runtimeInitialized) setupEnums();
  else addOnInit(setupEnums);
})();
