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

	var timeString;
	var timeText;

	create: function ()
	{
		var style = { fill : "#FFFFFF" };
	    timeText = game.add.text(200, 200, timeString, style);

	    var timer = game.time.create();
	    timer.repeat(1 * Phaser.Timer.SECOND, 7200, updateTime, this);
	    timer.start();)
	}

	function updateTime() {
	    var time = new Date();
	    
	    var hours = time.getHours();
	    var minutes = time.getMinutes();
	    var seconds = time.getSeconds();
	    
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
	    timeText.text = timeString;
	}

});
