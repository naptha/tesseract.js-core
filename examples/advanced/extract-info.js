// TODO: make this an executable example (i.e. add requisite boilerplate)


// this is the function used by tesseract.js in order
// to capture all the information from the C++ api 

function DumpLiterallyEverything(){
    var ri = base.GetIterator();
    var blocks = [];
    var block, para, textline, word, symbol;

    do {
        if(ri.IsAtBeginningOf(Module.RIL_BLOCK)){
            var poly = ri.BlockPolygon();
            var polygon = null;
            // BlockPolygon() returns null when automatic page segmentation is off
            if(Module.getPointer(poly) > 0){
                var n = poly.get_n(),
                    px = poly.get_x(),
                    py = poly.get_y(),
                    polygon = [];
                for(var i = 0; i < n; i++){
                    polygon.push([px.getValue(i), py.getValue(i)]);
                }
                Module._ptaDestroy(Module.getPointer(poly));    
            }
            
            block = {
                paragraphs: [],

                text: ri.GetUTF8Text(Module.RIL_BLOCK),
                confidence: ri.Confidence(Module.RIL_BLOCK),
                baseline: ri.getBaseline(Module.RIL_BLOCK),
                bbox: ri.getBoundingBox(Module.RIL_BLOCK),

                blocktype: enumToString(ri.BlockType(), 'PT'),
                polygon: polygon
            }
            blocks.push(block)
        }
        if(ri.IsAtBeginningOf(Module.RIL_PARA)){
            para = {
                lines: [],

                text: ri.GetUTF8Text(Module.RIL_PARA),
                confidence: ri.Confidence(Module.RIL_PARA),
                baseline: ri.getBaseline(Module.RIL_PARA),
                bbox: ri.getBoundingBox(Module.RIL_PARA),

                is_ltr: !!ri.ParagraphIsLtr()
            }
            block.paragraphs.push(para)
        }
        if(ri.IsAtBeginningOf(Module.RIL_TEXTLINE)){
            textline = {
                words: [],

                text: ri.GetUTF8Text(Module.RIL_TEXTLINE),
                confidence: ri.Confidence(Module.RIL_TEXTLINE),
                baseline: ri.getBaseline(Module.RIL_TEXTLINE),
                bbox: ri.getBoundingBox(Module.RIL_TEXTLINE)
            }
            para.lines.push(textline)
        }
        if(ri.IsAtBeginningOf(Module.RIL_WORD)){
            var fontInfo = ri.getWordFontAttributes(),
                wordDir = ri.WordDirection();
            word = {
                symbols: [],
                choices: [],

                text: ri.GetUTF8Text(Module.RIL_WORD),
                confidence: ri.Confidence(Module.RIL_WORD),
                baseline: ri.getBaseline(Module.RIL_WORD),
                bbox: ri.getBoundingBox(Module.RIL_WORD),

                is_numeric: !!ri.WordIsNumeric(),
                in_dictionary: !!ri.WordIsFromDictionary(),
                direction: enumToString(wordDir, 'DIR'),
                language: ri.WordRecognitionLanguage(),

                is_bold: fontInfo.is_bold,
                is_italic: fontInfo.is_italic,
                is_underlined: fontInfo.is_underlined,
                is_monospace: fontInfo.is_monospace,
                is_serif: fontInfo.is_serif,
                is_smallcaps: fontInfo.is_smallcaps,
                font_size: fontInfo.pointsize,
                font_id: fontInfo.font_id,
                font_name: fontInfo.font_name,
            }
            var wc = new Module.WordChoiceIterator(ri);
            do {
                word.choices.push({
                    text: wc.GetUTF8Text(),
                    confidence: wc.Confidence()
                })
            } while (wc.Next());
            Module.destroy(wc)
            textline.words.push(word)
        }
        
        var image = null;
        // var pix = ri.GetBinaryImage(Module.RIL_SYMBOL)
        // var image = pix2array(pix);
        // not sure if this stuff gets properly garbage collected
        // but calling pixDestroy here ends up breaking things

        symbol = {
            choices: [],
            image: image,

            text: ri.GetUTF8Text(Module.RIL_SYMBOL),
            confidence: ri.Confidence(Module.RIL_SYMBOL),
            baseline: ri.getBaseline(Module.RIL_SYMBOL),
            bbox: ri.getBoundingBox(Module.RIL_SYMBOL),

            is_superscript: !!ri.SymbolIsSuperscript(),
            is_subscript: !!ri.SymbolIsSubscript(),
            is_dropcap: !!ri.SymbolIsDropcap(),
        }
        word.symbols.push(symbol)
        var ci = new Module.ChoiceIterator(ri);
        do {
            symbol.choices.push({
                text: ci.GetUTF8Text(),
                confidence: ci.Confidence()
            })
        } while (ci.Next());
        Module.destroy(ci)
    } while (ri.Next(Module.RIL_SYMBOL));
    Module.destroy(ri)

    return {
        text: base.GetUTF8Text(),
        html: base.GetHOCRText(),

        confidence: base.MeanTextConf(),

        blocks: blocks,

        psm: enumToString(base.GetPageSegMode(), 'PSM'),
        oem: enumToString(base.oem(), 'OEM'),
        version: base.Version(),
    }
}


// this makes it a bit more convenient
function circularize(page){
    page.paragraphs = []
    page.lines = []
    page.words = []
    page.symbols = []

    page.blocks.forEach(function(block){
        block.page = page;

        block.lines = []
        block.words = []
        block.symbols = []

        block.paragraphs.forEach(function(para){
            para.block = block;
            para.page = page;

            para.words = []
            para.symbols = []
            
            para.lines.forEach(function(line){
                line.paragraph = para;
                line.block = block;
                line.page = page;

                line.symbols = []

                line.words.forEach(function(word){
                    word.line = line;
                    word.paragraph = para;
                    word.block = block;
                    word.page = page;
                    word.symbols.forEach(function(sym){
                        sym.word = word;
                        sym.line = line;
                        sym.paragraph = para;
                        sym.block = block;
                        sym.page = page;
                        
                        sym.line.symbols.push(sym)
                        sym.paragraph.symbols.push(sym)
                        sym.block.symbols.push(sym)
                        sym.page.symbols.push(sym)
                    })
                    word.paragraph.words.push(word)
                    word.block.words.push(word)
                    word.page.words.push(word)
                })
                line.block.lines.push(line)
                line.page.lines.push(line)
            })
            para.page.paragraphs.push(para)
        })
    })
    return page
}

// this is a helper for a part which is commented out
function pix2array(pix){
    var depth = pix.get_d(),
        wpl = pix.get_wpl(),
        width = pix.get_w(),
        height = pix.get_h(),
        data = pix.get_data();
    var array = new Uint8Array(width * height);
    for(var y = 0; y < height; y++){
        for(var j = 0; j < wpl; j++){
            var bs = Module.getValue(data + wpl * 4 * y + j * 4, 'i32');
            for(var k = 0; k < 8 * 4; k++){
                var val = (bs >> k) & 1;
                var x = j * 8 * 4 - k;
                if(x >= width) continue;
                array[x + width * y] = val;
            }
        }
    }
    return {
        width: width,
        height: height,
        data: array
    }
}
