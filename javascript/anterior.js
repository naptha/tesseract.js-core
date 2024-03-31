BoolPtr.prototype['getValue'] = function(n){ return !!getValue(getPointer(this) + (n || 0) * 'i1') }
IntPtr.prototype['getValue'] = function(n){ return getValue(getPointer(this) + (n || 0) * 4, 'i32') }
FloatPtr.prototype['getValue'] = function(n){ return getValue(getPointer(this) + (n || 0) * 4, 'float') }
DoublePtr.prototype['getValue'] = function(n){ return getValue(getPointer(this) + (n || 0) * 8, 'double') }

BoxPtr.prototype['get'] = PixaPtr.prototype['get'] = PixPtr.prototype['get'] = 
	function(n){ return getValue(getPointer(this) + (n || 0) * 4, '*') }


function pointerHelper(){
	this.obj = {}
}
pointerHelper.prototype['wrap'] = function(name, type){
	var ptr = _malloc(4);
	setValue(ptr, 0, 'i32');
	return this.obj[name] = wrapPointer(ptr, type);
}
pointerHelper.prototype['bool'] = function(name){
	return this['wrap'](name, BoolPtr);
}
pointerHelper.prototype['i32'] = function(name){
	return this['wrap'](name, IntPtr);
}
pointerHelper.prototype['f32'] = function(name){ // NOTE: actual llvm codename is float
	return this['wrap'](name, FloatPtr);
}
pointerHelper.prototype['f64'] = function(name){ // NOTE BENE: llvm codename is double
	return this.obj[name] = wrapPointer(_malloc(8), DoublePtr)
}
pointerHelper.prototype['peek'] = function(){
	var obj = {};
	for(var name in this.obj){
		obj[name] = this.obj[name]['getValue']()
	}
	return obj;
}

pointerHelper.prototype['get'] = function(){
	var obj = {};
	for(var name in this.obj){
		obj[name] = this.obj[name]['getValue']()
		_free(getPointer(this.obj[name]))
	}
	return obj;
}

ResultIterator.prototype['getBoundingBox'] = function(level){
	var pt = new pointerHelper();
	this['BoundingBox'](level, pt['i32']('x0'), pt['i32']('y0'), pt['i32']('x1'), pt['i32']('y1'))
	return pt.get();
}


ResultIterator.prototype['getBaseline'] = function(pil){ // pi is the page iterator
	var pt = new pointerHelper();
	var has_baseline = !!this['Baseline'](pil,
						pt['i32']('x0'), pt['i32']('y0'),
						pt['i32']('x1'), pt['i32']('y1'));
	var obj = pt.get();
	obj['has_baseline'] = has_baseline;
	return obj;
}

ResultIterator.prototype['getRowAttributes'] = function(){ // pi is the page iterator
	var pt = new pointerHelper();
	this['RowAttributes'](pt['f32']('row_height'), pt['f32']('descenders'), pt['f32']('ascenders'));
	var obj = pt.get();
	return obj;
}

ResultIterator.prototype['getWordFontAttributes'] =  function(){
	var pt = new pointerHelper();
	var fontName = this['WordFontAttributes'](pt['bool']('is_bold'),
										 pt['bool']('is_italic'),
										 pt['bool']('is_underlined'),
										 pt['bool']('is_monospace'),
										 pt['bool']('is_serif'),
										 pt['bool']('is_smallcaps'),
										 pt['i32']('pointsize'),
										 pt['i32']('font_id'));
	var obj = pt.get()
	obj['font_name'] = fontName;
	return obj;
}

Module['pointerHelper'] = pointerHelper;
