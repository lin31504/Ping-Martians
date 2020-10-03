var StarmapDATA = {
	EMdistance: 0,

	//By Kepler Law w^2 * R^3 = const
	mars:{
		obj: 0,
		x: 0,
		y: 0,
		r: 1.524,
		theta: 0,
		angvel: 0.5315,
	},
	sun:{
		obj: 0,
		x: 0,
		y: 0,
		r: 0
	},
	earth:{
		obj: 0,
		x: 0,
		y: 0,
		r: 1,
		theta: 0,
		angvel:1
	},

	epochStart:1600000000000,
	epochdt: 2, //ms
	planet_timescale: 0.0001,
	au2screen: 200,
	deg2rad: 0.17444,

	timeString: 0,
	timeText: 0,
	distanceText:0
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


	    StarmapDATA.sun.x = screenCenterX;
	    StarmapDATA.sun.y = screenCenterY;
	   	StarmapDATA.sun.obj = this.add.sprite(StarmapDATA.sun.x, StarmapDATA.sun.y, 'sun');
	   	StarmapDATA.sun.obj.setScale(0.05,0.05);

	   	StarmapDATA.earth.x = StarmapDATA.sun.x + StarmapDATA.earth.r * StarmapDATA.au2screen * Math.cos(this.epoch2rad(epochms,StarmapDATA.earth.angvel));
	   	StarmapDATA.earth.y = StarmapDATA.sun.y + StarmapDATA.earth.r * StarmapDATA.au2screen * Math.sin(this.epoch2rad(epochms,StarmapDATA.earth.angvel));
	   	StarmapDATA.earth.obj = this.add.sprite(StarmapDATA.earth.x, StarmapDATA.earth.y, 'earth');
	   	StarmapDATA.earth.obj.setScale(0.05,0.05);

	   	StarmapDATA.mars.x = StarmapDATA.sun.x + StarmapDATA.mars.r * StarmapDATA.au2screen * Math.cos(this.epoch2rad(epochms,StarmapDATA.mars.angvel));
	   	StarmapDATA.mars.y = StarmapDATA.sun.y + StarmapDATA.mars.r * StarmapDATA.au2screen * Math.sin(this.epoch2rad(epochms,StarmapDATA.mars.angvel));
	   	StarmapDATA.mars.obj = this.add.sprite(StarmapDATA.mars.x, StarmapDATA.mars.y, 'mars');
	   	StarmapDATA.mars.obj.setScale(0.02,0.02);

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
  		StarmapDATA.earth.x = StarmapDATA.sun.x + StarmapDATA.earth.r * StarmapDATA.au2screen * Math.cos(this.epoch2rad(epochms,StarmapDATA.earth.angvel));
	   	StarmapDATA.earth.y = StarmapDATA.sun.y + StarmapDATA.earth.r * StarmapDATA.au2screen * Math.sin(this.epoch2rad(epochms,StarmapDATA.earth.angvel));

	   	StarmapDATA.mars.x = StarmapDATA.sun.x + StarmapDATA.mars.r * StarmapDATA.au2screen * Math.cos(this.epoch2rad(epochms,StarmapDATA.mars.angvel));
	   	StarmapDATA.mars.y = StarmapDATA.sun.y + StarmapDATA.mars.r * StarmapDATA.au2screen * Math.sin(this.epoch2rad(epochms,StarmapDATA.mars.angvel));
	   	
	   	StarmapDATA.EMdistance = Phaser.Math.Distance.BetweenPoints(StarmapDATA.earth.obj,StarmapDATA.mars.obj);
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
	    console.log(StarmapDATA.earth.x);
	    // console.log(epochsec);
	    // console.log(StarmapDATA.sunx);
	},

	epoch2rad: function (epochtime,angvel)
	{
		var theta =  (-1)*(epochtime - StarmapDATA.epochStart) * angvel * StarmapDATA.planet_timescale; //counter clock wise
		return theta * StarmapDATA.deg2rad;
	},

	update: function() {
    	// this.debug.spriteInfo(earth, StarmapDATA.earth.x,StarmapDATA.earth.y);
    	// this.debug.spriteInfo(mars, StarmapDATA.mars.x,StarmapDATA.mars.y);
    	StarmapDATA.earth.obj.x = StarmapDATA.earth.x;
	   	StarmapDATA.earth.obj.y = StarmapDATA.earth.y;
	   	StarmapDATA.mars.obj.x = StarmapDATA.mars.x;
	   	StarmapDATA.mars.obj.y = StarmapDATA.mars.y;
	}

});
