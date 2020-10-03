var StarmapDATA = {
	EMdistance: 0,
	au2lightsec: 499,

	//By Kepler Law w^2 * R^3 = const
	mars:{
		obj: 0,
		x: 0,
		y: 0,
		r: 1.524,
		angvel: 0.5315,
		theta: 0,
		spinRate:355.23,
		angoffset:0,
	},
	sun:{
		obj: 0,
		x: 0,
		y: 0,
		r: 0,
		spinRate:14.9,
		angoffset:0,
	},
	earth:{
		obj: 0,
		x: 0,
		y: 0,
		r: 1,
		angvel: 1,
		theta: 0,
		spinRate:365,
		angoffset:0,
	},

	base:{
		obj: 0,
		x: 0,
		y: 0,
		r: 0.1,
		angvel: 355.23,
		theta: 0,
		spinRate:355.23,
		angoffset:70,
		// spinRate:355.23,
	},

	epochStart:1600000000000,
	epochdt: 2, //ms
	planet_timescale: 0.00007,
	// planet_timescale: 0.007,
	au2screen: 200,
	deg2rad: 0.017444,

	timeString: 0,
	timeText: 0,
	distanceText:0
};

var CalcRemainTime = () => {  
	var time = new Date();
	var epochms = Math.round(time.getTime());
	// StarmapDATA
	StarmapDATA.earth.x = StarmapDATA.sun.x + StarmapDATA.earth.r * StarmapDATA.au2screen * Math.cos(epoch2rad(epochms,StarmapDATA.earth.angvel));
   	StarmapDATA.earth.y = StarmapDATA.sun.y + StarmapDATA.earth.r * StarmapDATA.au2screen * Math.sin(epoch2rad(epochms,StarmapDATA.earth.angvel));

   	//StarmapDATA.earth.obj.angle -= StarmapDATA.earth.spinRate;
   	StarmapDATA.earth.obj.angle = (-1)*(epochms - StarmapDATA.epochStart) * StarmapDATA.earth.spinRate * StarmapDATA.planet_timescale; //counter clock wise

   	StarmapDATA.mars.x = StarmapDATA.sun.x + StarmapDATA.mars.r * StarmapDATA.au2screen * Math.cos(epoch2rad(epochms,StarmapDATA.mars.angvel));
   	StarmapDATA.mars.y = StarmapDATA.sun.y + StarmapDATA.mars.r * StarmapDATA.au2screen * Math.sin(epoch2rad(epochms,StarmapDATA.mars.angvel));

   	StarmapDATA.mars.obj.angle = (-1)*(epochms - StarmapDATA.epochStart) * StarmapDATA.mars.spinRate * StarmapDATA.planet_timescale; //counter clock wise


   	StarmapDATA.base.x = StarmapDATA.mars.x + StarmapDATA.base.r * StarmapDATA.au2screen * Math.cos(epoch2rad(epochms,StarmapDATA.base.angvel));
   	StarmapDATA.base.y = StarmapDATA.mars.y + StarmapDATA.base.r * StarmapDATA.au2screen * Math.sin(epoch2rad(epochms,StarmapDATA.base.angvel));

   	StarmapDATA.base.obj.angle = (-1)*(epochms - StarmapDATA.epochStart) * StarmapDATA.base.spinRate * StarmapDATA.planet_timescale - StarmapDATA.base.angoffset; //counter clock wise

   	StarmapDATA.sun.obj.angle = (-1)*(epochms - StarmapDATA.epochStart) * StarmapDATA.sun.spinRate * StarmapDATA.planet_timescale; //counter clock wise

   	StarmapDATA.EMdistance = distanceofpoints(StarmapDATA.earth,StarmapDATA.mars);
   	StarmapDATA.EMdistance = Math.round(StarmapDATA.EMdistance*100 / StarmapDATA.au2screen)/100;

   	if(angleofpoints(StarmapDATA.sun,StarmapDATA.mars,StarmapDATA.earth) <= 150 && angleofpoints(StarmapDATA.mars,StarmapDATA.earth,StarmapDATA.base) <= 150)
		return 2*StarmapDATA.EMdistance * StarmapDATA.au2lightsec;
	else
		return 0;
};

var angleofpoints = (objA,objB,objC) => {
	var v1x = objB.x-objA.x;
	var v1y = objB.y-objA.y;
	var v2x = objC.x-objA.x;
	var v2y = objC.y-objA.y;
	var cosx = (v1x*v2x+v1y*v2y)/Math.sqrt(v1x*v1x+v1y*v1y)/Math.sqrt(v2x*v2x+v2y*v2y);

	return Math.round(100*Math.acos(cosx)*180/3.14)/100;
};

var distanceofpoints2line = (objA,objB,objC) => {
	var a = (objA.x-objB.x)/(objB.y-objA.y);
	var b = -a*objA.y-objB.x;
	var d = Math.abs(objC.x+a*objC.y+b)/Math.sqrt(a*a+b*b);

	return Math.sqrt((objA.x-objB.x)*(objA.x-objB.x)+(objA.y-objB.y)*(objA.y-objB.y))
};

var distanceofpoints = (objA,objB) => {
	return Math.sqrt((objA.x-objB.x)*(objA.x-objB.x)+(objA.y-objB.y)*(objA.y-objB.y))
};

var epoch2rad = (epochtime,angvel) => {
	var theta =  (-1)*(epochtime - StarmapDATA.epochStart) * angvel * StarmapDATA.planet_timescale; //counter clock wise
	return theta * StarmapDATA.deg2rad;
};


var SceneStarmap = new Phaser.Class({


	Extends: Phaser.Scene,

	initialize:

	function SceneStarmap ()
	{
		Phaser.Scene.call(this, { key: 'sceneStarmap' , StarmapDATA});
	},

	preload: function ()
	{
		this.load.image('sun', 'assets/sun.png');
		this.load.image('mars', 'assets/mars.webp');
		this.load.image('earth', 'assets/earth.png');
		this.load.image('base', 'assets/base.png');
		this.load.image('cross', 'assets/cross.png');

	},

	create: function ()
	{
		const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
		const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
		const screenButtomX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
		const screenButtomY = this.cameras.main.worldView.y + 100;
		
		//Setting Update Timer
	    var timer = this.time.addEvent({
		    delay: StarmapDATA.epochdt,                // ms
		    callback: this.updateStarmap,
		    //args: [],
		    callbackScope: this,
		    loop: true
		});

		//Show Time
		var time = new Date();
		var epochms = Math.round(time.getTime());
		var hours = time.getHours();
	    var minutes = time.getMinutes();
	    var seconds = time.getUTCSeconds();
	    
	    if (hours < 10) {
	        hours = "0" + hours;
	    }
	    if (minutes < 10) {
	        minutes = "0" + minutes;
	    }
	    if (seconds < 10) {
	        seconds = "0" + seconds;
	    }
	    
	    var style = { fill : "#FFFFFF" };

	    timeString = hours + ":" + minutes + ":" + seconds;
	    timeText = this.add.text(screenButtomX, screenButtomY, timeString, style).setOrigin(0.5);

	    var distanceString = "E-M Distance: " + StarmapDATA.EMdistance + " AU";
		distanceText = this.add.text(screenButtomX, screenButtomY+50, distanceString, style).setOrigin(0.5);	    

		var btnExit = this.add.image(1200, 100, 'cross');

		//print sun
	    StarmapDATA.sun.x = screenCenterX;
	    StarmapDATA.sun.y = screenCenterY;
	   	StarmapDATA.sun.obj = this.add.sprite(StarmapDATA.sun.x, StarmapDATA.sun.y, 'sun');
	   	StarmapDATA.sun.obj.setScale(0.07,0.07);
	   	//print earth
	   	StarmapDATA.earth.x = StarmapDATA.sun.x + StarmapDATA.earth.r * StarmapDATA.au2screen * Math.cos(epoch2rad(epochms,StarmapDATA.earth.angvel));
	   	StarmapDATA.earth.y = StarmapDATA.sun.y + StarmapDATA.earth.r * StarmapDATA.au2screen * Math.sin(epoch2rad(epochms,StarmapDATA.earth.angvel));
	   	StarmapDATA.earth.obj = this.add.sprite(StarmapDATA.earth.x, StarmapDATA.earth.y, 'earth');
	   	StarmapDATA.earth.obj.setScale(0.05,0.05);
	   	//print mars
	   	StarmapDATA.mars.x = StarmapDATA.sun.x + StarmapDATA.mars.r * StarmapDATA.au2screen * Math.cos(epoch2rad(epochms,StarmapDATA.mars.angvel));
	   	StarmapDATA.mars.y = StarmapDATA.sun.y + StarmapDATA.mars.r * StarmapDATA.au2screen * Math.sin(epoch2rad(epochms,StarmapDATA.mars.angvel));
	   	StarmapDATA.mars.obj = this.add.sprite(StarmapDATA.mars.x, StarmapDATA.mars.y, 'mars');
	   	StarmapDATA.mars.obj.setScale(0.02,0.02);
	   	//print base
	   	StarmapDATA.base.x = StarmapDATA.mars.x + StarmapDATA.base.r * StarmapDATA.au2screen * Math.cos(epoch2rad(epochms,StarmapDATA.base.angvel));
	   	StarmapDATA.base.y = StarmapDATA.mars.y + StarmapDATA.base.r * StarmapDATA.au2screen * Math.sin(epoch2rad(epochms,StarmapDATA.base.angvel));
	   	StarmapDATA.base.obj = this.add.sprite(StarmapDATA.base.x, StarmapDATA.base.y, 'base');
	   	StarmapDATA.base.obj.setScale(0.07,0.07);


		btnExit.on('pointerdown', function (event) {
			this.scene.transition({ target: 'sceneStoryA1', duration: 0});
		}, this);
		btnExit.setInteractive({ cursor: 'pointer' })

	    // var timer = this.time.create();
	    // timer.repeat(1 * Phaser.Timer.SECOND, 7200, updateTime, this);
	    // timer.start();
	},	

	updateStarmap: function () 
	{
		//Update Star maps
	    var time = new Date();
		var epochms = Math.round(time.getTime());
  		// StarmapDATA
  		StarmapDATA.earth.x = StarmapDATA.sun.x + StarmapDATA.earth.r * StarmapDATA.au2screen * Math.cos(epoch2rad(epochms,StarmapDATA.earth.angvel));
	   	StarmapDATA.earth.y = StarmapDATA.sun.y + StarmapDATA.earth.r * StarmapDATA.au2screen * Math.sin(epoch2rad(epochms,StarmapDATA.earth.angvel));

	   	//StarmapDATA.earth.obj.angle -= StarmapDATA.earth.spinRate;
	   	StarmapDATA.earth.obj.angle = (-1)*(epochms - StarmapDATA.epochStart) * StarmapDATA.earth.spinRate * StarmapDATA.planet_timescale; //counter clock wise

	   	StarmapDATA.mars.x = StarmapDATA.sun.x + StarmapDATA.mars.r * StarmapDATA.au2screen * Math.cos(epoch2rad(epochms,StarmapDATA.mars.angvel));
	   	StarmapDATA.mars.y = StarmapDATA.sun.y + StarmapDATA.mars.r * StarmapDATA.au2screen * Math.sin(epoch2rad(epochms,StarmapDATA.mars.angvel));

	   	StarmapDATA.mars.obj.angle = (-1)*(epochms - StarmapDATA.epochStart) * StarmapDATA.mars.spinRate * StarmapDATA.planet_timescale; //counter clock wise


	   	StarmapDATA.base.x = StarmapDATA.mars.x + StarmapDATA.base.r * StarmapDATA.au2screen * Math.cos(epoch2rad(epochms,StarmapDATA.base.angvel));
	   	StarmapDATA.base.y = StarmapDATA.mars.y + StarmapDATA.base.r * StarmapDATA.au2screen * Math.sin(epoch2rad(epochms,StarmapDATA.base.angvel));

	   	StarmapDATA.base.obj.angle = (-1)*(epochms - StarmapDATA.epochStart) * StarmapDATA.base.spinRate * StarmapDATA.planet_timescale - StarmapDATA.base.angoffset; //counter clock wise

	   	StarmapDATA.sun.obj.angle = (-1)*(epochms - StarmapDATA.epochStart) * StarmapDATA.sun.spinRate * StarmapDATA.planet_timescale; //counter clock wise

	   	StarmapDATA.EMdistance = Phaser.Math.Distance.BetweenPoints(StarmapDATA.earth.obj,StarmapDATA.base.obj);
	   	StarmapDATA.EMdistance = Math.round(StarmapDATA.EMdistance*100 / StarmapDATA.au2screen)/100;

	   	//Update Distance
	   	var distanceString = "E-M Distance: " + StarmapDATA.EMdistance + " AU";
		distanceText.setText(distanceString);

	    //Update MTC
	    var hours = time.getHours();
	    var minutes = time.getMinutes();
	    var seconds = time.getUTCSeconds();
	    
	    if (hours < 10) {
	        hours = "0" + hours;
	    }
	    if (minutes < 10) {
	        minutes = "0" + minutes;
	    }
	    if (seconds < 10) {
	        seconds = "0" + seconds;
	    }
	    
	    timeString = hours + ":" + minutes + ":" + seconds;

	    timeText.setText(timeString);
	    // console.log(StarmapDATA.earth.obj.angle);
	    // console.log(callbackcRemainTime());
	    // console.log(angleofpoints(StarmapDATA.sun,StarmapDATA.mars,StarmapDATA.earth));
	    // console.log(angleofpoints(StarmapDATA.mars,StarmapDATA.earth,StarmapDATA.base));
	    // var remainAngle = Math.angle.Between(0,1,1,0);
	    // var sprite = game.add.sprite(0, 1);
     //    var sprite2 = game.add.sprite(1, 0);
 
     //    remainAngle = new Phaser.Point(sprite.x, sprite.y).angle(sprite2) / Math.PI * 180;
	    // console.log(remainAngle);
	    // console.log(epochsec);
	    // console.log(StarmapDATA.sunx);
	},

	update: function() {
    	// this.debug.spriteInfo(earth, StarmapDATA.earth.x,StarmapDATA.earth.y);
    	// this.debug.spriteInfo(mars, StarmapDATA.mars.x,StarmapDATA.mars.y);
    	StarmapDATA.earth.obj.x = StarmapDATA.earth.x;
	   	StarmapDATA.earth.obj.y = StarmapDATA.earth.y;
	   	StarmapDATA.mars.obj.x = StarmapDATA.mars.x;
	   	StarmapDATA.mars.obj.y = StarmapDATA.mars.y;
	   	StarmapDATA.base.obj.x = StarmapDATA.base.x;
	   	StarmapDATA.base.obj.y = StarmapDATA.base.y;
	}

});
