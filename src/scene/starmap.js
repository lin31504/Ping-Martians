var SceneStarmap = new Phaser.Class({

	Extends: Phaser.Scene,

	initialize:

	function SceneStarmap ()
	{
		Phaser.Scene.call(this, { key: 'sceneStarmap' });
	},

	preload: function ()
	{
		
	},

	updateTime: function () {
	    var time = new Date();
	    
	    var ms = time.getTime();
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
	    console.log(ms);
	    //timeText.setText(timeText);
	},

	create: function ()
	{
		var timeString;
		var style = { fill : "#FFFFFF" };
	    var timeText = this.add.text(200, 200, timeString, style);

	    var timer = this.time.addEvent({
		    delay: 1000,                // ms
		    callback: this.updateTime,
		    //args: [],
		    callbackScope: this,
		    loop: true
		});

	    // var timer = this.time.create();
	    // timer.repeat(1 * Phaser.Timer.SECOND, 7200, updateTime, this);
	    // timer.start();
	},	


});
