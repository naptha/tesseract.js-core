var lang = 'eng'; 

var http = require("http"),
    zlib = require("zlib"),
    fs   = require("fs")

var TesseractCore = require('../../')
var Module = TesseractCore();

// load the tesseract language data
load_tessdata('eng', function(data){
    Module.FS_createPath("/", "tessdata", true, true)
    Module.FS_createDataFile('tessdata', lang + '.traineddata', data, true, false);
    run_ocr();
})

function run_ocr(){
    var pic = read_pbm('test.pbm')
    var picptr = Module.allocate(pic, 'i8', Module.ALLOC_NORMAL);

    // initialize C++ API
    var base = new Module.TessBaseAPI()
    base.Init(null, 'eng')
    // stick the picture in memory
    
    base.SetImage(Module.wrapPointer(picptr), width, height, 1, width)
    base.SetRectangle(0, 0, width, height)

    // recognize the text on the image
    var text = base.GetUTF8Text()
    console.log('text', text)

    // clean up memory and allocated objects
    base.End();
    Module.destroy(base)
    Module._free(picptr);
}



function read_pbm(fileName){
    var pbm = fs.readFileSync(fileName); // this is a simple image format
    for(var start = 0; pbm[start] != 0; start++); // find the first non-ascii char
    var lines = pbm.toString('ascii', 0, start).split(/\s+/)
    if(lines[0] != 'P4') throw new Error('Image must be a Binary-encoded 1-bit PBM (magic number P4 not found)');
    
    var width = parseInt(lines[1]),
        height = parseInt(lines[2]);
    var pic = new Uint8Array(width * height)
    console.log('image size', width, 'x', height, lines);
    var bytes_per_line = Math.ceil(width / 8);
    for(var i = 0; i < height; i++){
        for(var j = 0; j < width; j++){
            pic[i * width + j] = ((pbm[start + i * bytes_per_line + Math.floor(j / 8)] >> (7 - (j % 8))) & 1) * 255
        }
    }
    return pic;
}

function load_tessdata(lang, cb){
    fs.readFile(lang + '.traineddata', function (err, data) {
        if(!err) return cb(new Uint8Array(data));
        http.get('http://cdn.rawgit.com/naptha/tessdata/gh-pages/3.02/' + lang + '.traineddata.gz', function(res){
            var gunzip = zlib.createGunzip();
            res.pipe(gunzip).pipe(fs.createWriteStream(lang + '.traineddata'))
            gunzip.on('end', function(){ load_tessdata(lang, cb) })
        })
    });
}