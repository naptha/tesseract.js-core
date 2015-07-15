var lang = 'eng'; 

var http = require("http"),
    zlib = require("zlib"),
    fs   = require("fs")

var Canvas = require('canvas')
  , Image = Canvas.Image;

var TesseractCore = require('../../')
var Module = TesseractCore({
    TOTAL_MEMORY: 90e6,
    TesseractProgress: function(percent){
        console.log("progress:", percent)
    }
});

// load the tesseract language data
load_tessdata('eng', function(data){
    Module.FS_createPath("/", "tessdata", true, true)
    Module.FS_createDataFile('tessdata', lang + '.traineddata', data, true, false);
    run_ocr()
})

function run_ocr(){
    var im = load_image('tyger.jpg');
    var width = im.width,
        height = im.height;
    var pic = new Uint8Array(width * height);
    for(var i = 0; i < height; i++){
        for(var j = 0; j < width; j++){
            var b = 4 * (i * width + j),
                luma = (im.data[b] + im.data[b + 1] + im.data[b + 2]) / 3,
                alpha = im.data[b + 3] / 255;
            pic[i * width + j] = luma * alpha + (1 - alpha) * 128;
        }
    }

    console.log('image size', width, 'x', height)

    var picptr = Module.allocate(pic, 'i8', Module.ALLOC_NORMAL);

    // initialize C++ API
    var base = new Module.TessBaseAPI()
    base.Init(null, 'eng')
    // stick the picture in memory
    
    base.SetImage(Module.wrapPointer(picptr), width, height, 1, width)
    base.SetRectangle(0, 0, width, height)

    // recognize the text on the image
    var text = base.GetUTF8Text()
    console.log(text)

    // clean up memory and allocated objects
    base.End();
    Module.destroy(base)
    Module._free(picptr);
}



function load_image(fileName){
    var data = fs.readFileSync(fileName)
    var img = new Image();
    img.src = data;
    var canvas = new Canvas(img.width, img.height),
        ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    var data = ctx.getImageData(0, 0, img.width, img.height);
    return data;
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