
//for run this code first you should have photoshop.version > cc18
//you should import file *****.asl 
//for debug in vscode simply ,1)install Adobe Script Runner , 2)ExtenedScript Debuger 
var message= "-Tarah -Kheng -Reshte -Music -Comic -Film -Football -Game -Omoomi \n -Comp -Logo "

// var Cnf =confirm("do U whant prepare size ?  \r\r else make moc,cut,chap ");

// if (Cnf==false){
//     value = prompt("type the kind of mockup which you whant to creat \r 1"+message)}

var input_path =Folder.selectDialog("koja bekhoonam")
var dropbox_path="C:/Users/hosse/Dropbox/Geektori";
var Cnf = false;
var value="Film";
var folder_name="abc";


main(value,Cnf,input_path);


function Geesci(cnf,input_path) {

    if(cnf){
        tif_to_png();
        unlockLayer();
        make_same_size(input_path);
        
    }
    else{
        make_mockup(input_path);
    }
}


function make_same_size(input_path) {
    var Name = name_handler(app.activeDocument.name);
    var ratio= 1.431646074133121
    var x=app.activeDocument.width.value;
    var y=app.activeDocument.height.value;
    
    
    if((x/y)<ratio){
        app.activeDocument.resizeCanvas(Math.round(ratio*x),x,AnchorPosition.MIDDLECENTER);
    
    }else if ((x/y)>ratio) {
        app.activeDocument.resizeCanvas(Math.round(ratio*y),y,AnchorPosition.MIDDLECENTER);
    }
    else if ((x/y)==ratio) {
        alert("barabar")

    }
    app.activeDocument.resizeImage(3592,2509,300,ResampleMethod.AUTOMATIC,0);
    save_file_local(Name,input_path,false);
}


function make_mockup(input_path) {
    var Name = app.activeDocument.name;
    app.activeDocument.selection.copy()

    // //active a selective moc
    app.activeDocument=app.documents.getByName("MOC_skin.psd");
    var moc = app.activeDocument.layers.getByName("Place Sticker");
    app.activeDocument.activeLayer=moc;

    //Swithch inside smart OBJ
    var STO = openSmartObject(moc);
    STO.paste();
    STO.layers[1].remove();
    closeSmartObject();
    
    //back to mock
    app.activeDocument=app.documents.getByName("MOC_skin.psd");
    app.activeDocument.save()
    var Name_m = name_handler(Name);
    save_file_local(Name_m,input_path,true);
    //save_png_moc_dropbox(Name_m,dropbox_path,folder_name);
    //back to picture
    app.activeDocument=app.documents.getByName(Name);
}



function main(Seleceted_moc,cnf,input_path) {   
//configuration Editing:
app.preferences.rulerUnits=Units.PIXELS
app.preferences.typeUnits=TypeUnits.PIXELS

//=============Start=========================
close_all();
//============open the mocFile ==============
if(cnf==false){
    var moc_file = File("C:/Geesci/MOC_skin.psd");
    app.open( moc_file );
    Select_moc(Seleceted_moc);
}

//===========open the png prepare Folder ====
var png_Folder = new Folder (input_path);
var png_file=png_Folder.getFiles();

for (var i=0 ; i<png_file.length; i++) {
    var format = format_parser(png_file[i].name)
    if ( (format=="png") || (format=="jpg") || (format=="PNG")|| (format=="tif") ){
        app.open( png_file[i] );
        Geesci(cnf,input_path);
        app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
   }
   //close the png prepare Folder

}
//close the mockup
if(cnf==false){
    app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);}

alert("Finish");
}

///_________________________________________________________________________________________________
// Here are the function intgration
// 
// 
//__________________________________________________________________________________________________
function Select_moc(Seleceted_moc) {
    try {
        app.activeDocument.artLayers.getByName("Colored Background").applyStyle(Seleceted_moc);
        app.activeDocument.artLayers.getByName("Colored Background").opacity=40
    }
     catch (error) {
         alert(error)
        
    }
}

function close_all() {
    while (app.documents.length!=0) {
        app.activeDocument.close()
    }
          
}

function save_png_cut(name){
    var doc_c =app.activeDocument;
    var save_path_c = File(doc_c.path + '/cut/' + name  + '.png');
    var opt = new PNGSaveOptions();
    opt.compression=1;
    opt.interlaced = false
    doc_c.saveAs(save_path_c,opt,true,Extension.NONE);
}
function save_png_chap(name){
    var doc_p =app.activeDocument;

    var save_path_p = File(doc_p.path + '/chap/' + name  + '.png');
    var opt = new PNGSaveOptions();
    opt.compression=1;
    opt.interlaced = false
    doc_p.saveAs(save_path_p,opt,true,Extension.NONE);
}

function save_png_moc(name){
    var doc_p =app.activeDocument;
    var save_path_p = File(doc_p.path + '/png/moc/' + name  + '.png');
    var opt = new PNGSaveOptions();
    opt.compression=5;
    opt.interlaced = false
    doc_p.saveAs(save_path_p,opt,true,Extension.NONE);
}


function openSmartObject (theLayer) {
    if (theLayer.kind == "LayerKind.SMARTOBJECT") {
        var idplacedLayerEditContents = stringIDToTypeID( "placedLayerEditContents" );
        var desc2 = new ActionDescriptor();
        executeAction( idplacedLayerEditContents, desc2, DialogModes.NO );
    };
    return app.activeDocument
}
function closeSmartObject() {
    app.activeDocument.save();
    app.activeDocument.close();    
}

function quickSel (x, y, tol){
    var idsetd = charIDToTypeID( "setd" );
        var desc2 = new ActionDescriptor();
        var idnull = charIDToTypeID( "null" );
            var ref1 = new ActionReference();
            var idChnl = charIDToTypeID( "Chnl" );
            var idfsel = charIDToTypeID( "fsel" );
            ref1.putProperty( idChnl, idfsel );
        desc2.putReference( idnull, ref1 );
        var idT = charIDToTypeID( "T   " );
            var desc3 = new ActionDescriptor();
            var idHrzn = charIDToTypeID( "Hrzn" );
            var idPxl = charIDToTypeID( "#Pxl" );
            desc3.putUnitDouble( idHrzn, idPxl, x );
            var idVrtc = charIDToTypeID( "Vrtc" );
            var idPxl = charIDToTypeID( "#Pxl" );
            desc3.putUnitDouble( idVrtc, idPxl, y);
        var idPnt = charIDToTypeID( "Pnt " );
        desc2.putObject( idT, idPnt, desc3 );
        var idTlrn = charIDToTypeID( "Tlrn" );
        desc2.putInteger( idTlrn, tol);
        var idAntA = charIDToTypeID( "AntA" );
        desc2.putBoolean( idAntA, true );
        var idCntg = charIDToTypeID( "Cntg" );
        desc2.putBoolean( idCntg, true );
    executeAction( idsetd, desc2, DialogModes.NO );
};

function tif_to_png(){
    var Name = name_handler(app.activeDocument.name);
    app.activeDocument.changeMode(ChangeMode.RGB);
}

function unlockLayer() {
    if(app.activeDocument.activeLayer.isBackgroundLayer ) app.activeDocument.activeLayer.name = 'From Background';
    if(app.activeDocument.activeLayer.allLocked) app.activeDocument.activeLayer.allLocked = false;
    if(app.activeDocument.activeLayer.pixelsLocked && app.activeDocument.activeLayer.kind != LayerKind.TEXT) app.activeDocument.activeLayer.pixelsLocked = false;
    if(app.activeDocument.activeLayer.positionLocked) app.activeDocument.activeLayer.positionLocked = false;
    if(app.activeDocument.activeLayer.transparentPixelsLocked && app.activeDocument.activeLayer.kind != LayerKind.TEXT) app.activeDocument.activeLayer.transparentPixelsLocked = false;
}

function format_parser(String){
    var format = String.split(".")
    return format[format.length-1]
}

function name_handler(name){
    var format = format_parser(name);
    var outname = name.split('.'+format)[0];
    if(name.search("~")!=-1)
        outname=name.split("~")[0];
    return outname;
}


function save_png_moc_dropbox(name,path_of_dropbox,folder_name){
    var doc_p =app.activeDocument;
    var f =new Folder(path_of_dropbox + '/Geesci/'+ folder_name )
    if (! f.exists)
        f.create()
    var save_path_p = new File(path_of_dropbox + '/Geesci/'+ folder_name +'/' + name + '.png');
    var opt = new PNGSaveOptions();
    opt.compression=5;
    opt.interlaced = false
    doc_p.saveAs(save_path_p,opt,true,Extension.NONE);
}

function save_file_local(name,input_path,moc){
    var doc_p =app.activeDocument;
    if(moc==false){
        var f =new Folder(input_path + '/prints/' );
        var save_path_p = new File(input_path+'/prints/' + name + '.png');
    }
    else{
        var f =new Folder(input_path + '/prints/moc/' );
        var save_path_p = new File(input_path+'/prints/moc/' + name + '.png');
    }
    
    if (! f.exists)
        f.create()

    var opt = new PNGSaveOptions();
    opt.compression=5;
    opt.interlaced = false
    doc_p.saveAs(save_path_p,opt,true,Extension.NONE);
}
function add_dummy_pix(){
    app.activeDocument.selection.select([[0,0],[0,1],[1,0],[1,1]]);
    var White=new RGBColor;White.blue=255;White.green=255;White.red=255;
    app.activeDocument.selection.fill(White,ColorBlendMode.NORMAL,100,true);
    app.activeDocument.selection.deselect();
}

function detect_strok_color(){
    var Strok_Color =new RGBColor;
    var y=0;
    var condition =true
    add_dummy_pix()
    app.activeDocument.colorSamplers.add([0,0]);
    while(condition){
        try{
    
            app.activeDocument.colorSamplers[0].move([600,y])
            Strok_Color.hexValue=app.activeDocument.colorSamplers[0].color.rgb.hexValue
            condition=false;
        }catch(e){
            y=y+5
            condition=true;
        }
    }
    app.activeDocument.colorSamplers.removeAll()
    return Strok_Color
}


function Rotate_by_name(Name){
    if(Name.search("~")!=-1){
        app.activeDocument.artLayers[0].rotate(-45,AnchorPosition.MIDDLECENTER);
    }
    if(Name.search("#~")!=-1){
        app.activeDocument.artLayers[0].rotate(45,AnchorPosition.MIDDLECENTER);
    }
    
}