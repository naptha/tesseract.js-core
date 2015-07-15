// TODO: make this an executable example (i.e. add requisite boilerplate)

function DetectOrientationScript(){
    var stuff = new Uint8Array(canvas.width * canvas.height)
    var dat = ctx.getImageData(0, 0, canvas.width, canvas.height)
    for(var i = 0; i < stuff.length; i++) stuff[i] = dat.data[i * 4 + 3];
    var stuffptr = Module.allocate(stuff, 'i8', Module.ALLOC_NORMAL);
    console.log('allocated image')
    base = new Module.TessBaseAPI()
    base.Init(null, 'osd')
    base.SetPageSegMode(Module.PSM_OSD_ONLY)
    console.log('loaded language')
    
    base.SetImage(Module.wrapPointer(stuffptr), canvas.width, canvas.height, 1, canvas.width)
    base.SetRectangle(0, 0, canvas.width, canvas.height)

    var results = new Module.OSResults();
    var success = base.DetectOS(results);
    console.log('detected os successfully', !!success);
    var charset = results.get_unicharset()
    results.print_scores()

    var best = results.get_best_result()
    var oid = best.get_orientation_id(),
        sid = best.get_script_id();
    console.log('orientation id', oid, [0, 270, 180, 90][oid], best.get_oconfidence())
    console.log('script id', sid, charset.get_script_from_script_id(sid), best.get_sconfidence())

}
