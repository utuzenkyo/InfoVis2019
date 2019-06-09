function main()
{
    var volume = new KVS.LobsterData();
    var screen = new KVS.THREEScreen();
	var isovalue = 128;
	var reflectionFlag = 0;
	var interpolationFlag = false;
	var cmapFlag = false;

    screen.init( volume, {
        width: window.innerWidth,
        height: window.innerHeight,
        enableAutoResize: false
    });
	
	// create color map
	var cmap1 = [];
	var cmap2 = [];
	for (var i=0; i<256; i++)
	{
		var S = i / 255.0 ;
		var R = Math.max(Math.cos((S-1.0)*Math.PI), 0.0);
		var G = Math.max(Math.cos((S-0.5)*Math.PI), 0.0);
		var B = Math.max(Math.cos(S*Math.PI),0.0);
		var color = new THREE.Color(R,G,B);
		cmap1.push([S, '0x'+color.getHexString()]);
	}
		for (var i=0; i<256; i++)
	{
		var S = i / 255.0 ;
		var R = 1;
		var G = Math.max( Math.cos( ( S / 2.0 ) * Math.PI ), 0.0 );
		var B = Math.max( Math.cos( ( S / 2.0 ) * Math.PI ), 0.0 );
		var color = new THREE.Color(R,G,B);
		cmap2.push([S, '0x'+color.getHexString()]);
	}
	
	
	var cmap = cmap1;

	
	//create GUI
	var guiCtrl = function(){
		this.isovalue = isovalue;
		this.interpolation = interpolationFlag;
		this.reflection = reflectionFlag;
		this.colorMap = cmapFlag;
	};
	
	var gui = new dat.GUI();
	var guiObj = new guiCtrl();
	var isoCtrl = gui.add(guiObj, 'isovalue',0,255);
	var reflecCtrl = gui.add(guiObj, 'reflection',{Lambertian:0, Phong:1, Blinn:2});
	var interpoCtrl = gui.add(guiObj, 'interpolation');
	var cmapCtrl = gui.add(guiObj, 'colorMap',{Rainbow:0, Single:1});
	
	// draw color map
	function getColorbar(cmap){
		var lut = new THREE.Lut('rainbow', cmap.length);
		lut.addColorMap('mycolormap', cmap);
		lut.changeColorMap('mycolormap');
		return lut.setLegendOn({
			'layout':'horizontal',
			'position':{'x':25,'y':5,'z':0},
			'dimensions':{'width':10, 'height':50}
			});
	}
	
	var colorbar = getColorbar(cmap);
	screen.scene.add(colorbar);

    var bounds = Bounds( volume );
    screen.scene.add( bounds );

    var surfaces = Isosurfaces( volume, isovalue, reflectionFlag, interpolationFlag, cmap );
    screen.scene.add( surfaces );

    document.addEventListener( 'mousemove', function() {
        screen.light.position.copy( screen.camera.position );
    });

    window.addEventListener( 'resize', function() {
        screen.resize( [ window.innerWidth, window.innerHeight ] );
    });
	
	isoCtrl.onFinishChange(function(value){
		screen.scene.remove(surfaces);
		isovalue = Math.round(value);
		surfaces = Isosurfaces(volume, isovalue, reflectionFlag, interpolationFlag, cmap);
		screen.scene.add(surfaces);
	});
	
	reflecCtrl.onFinishChange(function(value){
		screen.scene.remove(surfaces);
		reflectionFlag = value;
		surfaces = Isosurfaces(volume, isovalue, reflectionFlag, interpolationFlag, cmap);
		screen.scene.add(surfaces);
	});
	
	interpoCtrl.onFinishChange(function(value){
		screen.scene.remove(surfaces);
		interpolationFlag = value;
		surfaces = Isosurfaces(volume, isovalue, reflectionFlag, interpolationFlag, cmap);
		screen.scene.add(surfaces);
	});
	
	cmapCtrl.onFinishChange(function(value){
		screen.scene.remove(surfaces);
		screen.scene.remove(colorbar);
		cmapFlag = value;
		if(cmapFlag==0){cmap=cmap1;}
		else{cmap=cmap2;}
		surfaces = Isosurfaces(volume, isovalue, reflectionFlag, interpolationFlag, cmap);
		colorbar = getColorbar(cmap);
		screen.scene.add(colorbar);
		screen.scene.add(surfaces);
	});

    screen.loop();
}
