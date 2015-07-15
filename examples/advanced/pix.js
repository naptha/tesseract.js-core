// TODO: make this an executable example (i.e. add requisite boilerplate)

var threshed = base.GetThresholdedImage()
drawBitPix(threshed)


function getContours(){
    var pixapt = Module.wrapPointer(Module._malloc(4), Module.PixaPtr)
    var boxa = base.GetConnectedComponents(pixapt)
    var pixa = Module.wrapPointer(pixapt.get(), Module.Pixa)
    console.assert(pixa.get_n() == boxa.get_n())
    
    var numcc = pixa.get_n();
    ctx.strokeStyle = '#8282E8';
    for(var i = 0; i < numcc; i++){
        var pixxy = Module.wrapPointer(pixa.get_pix().get(i), Module.Pix);
        var boxxy = Module.wrapPointer(boxa.get_box().get(i), Module.Box);
        // console.log('box', boxxy.get_x(), boxxy.get_y(), boxxy.get_w(), boxxy.get_h())
        ctx.strokeRect(boxxy.get_x(), boxxy.get_y(), boxxy.get_w(), boxxy.get_h())
        // console.log('pix', pixxy.get_w(), pixxy.get_h(), pixxy.get_data());
        drawBitPix(pixxy)
    }
    Module._pixaDestroy(Module.getPointer(pixa))
    Module._boxaDestroy(Module.getPointer(boxa))
}


// this draws a bit depth 1 pix from leptonica's internal memory format

function drawBitPix(pix){
    var depth = pix.get_d(),
        wpl = pix.get_wpl(),
        width = pix.get_w(),
        height = pix.get_h();
    
    console.assert(depth == 1)
    console.assert(width > 0)
    console.assert(height > 0)
    console.assert(wpl > 0)

    var data = pix.get_data();
    var imdata = ctx.createImageData(wpl * 4 * 8, height);

    for(var i = 0; i < height; i++){
        for(var j = 0; j < wpl; j++){
            var bs = Module.getValue(data + wpl * 4 * i + j * 4, 'i32');
            for(var k = 0; k < 8 * 4; k++){
                var val = (bs >> k) & 1;
                var x = j * 8 * 4 - k,
                    y = i;
                var offset = 4 * (x + y * imdata.width);
                imdata.data[offset] = imdata.data[offset + 1] = imdata.data[offset + 2] = val ? 0 : 255
                imdata.data[offset + 3] = 255;
            }
        }
    }
    var new_canvas = document.createElement('canvas')
    new_canvas.width = width
    new_canvas.height = height
    var new_ctx = new_canvas.getContext('2d')
    new_ctx.putImageData(imdata, 0, 0)
    document.body.appendChild(new_canvas)
}

