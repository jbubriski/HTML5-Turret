window.requestAnimFrame = (function(callback){
    return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(callback){
        window.setTimeout(callback, 1000 / 60);
    };
})();

(function($) {
	$(function() {
		var $canvas = $('#uxCanvas');
		var lasers = [];
		var center = { x: 300, y: 300 };
		
		$canvas.on('click', function(e) {
			lasers[lasers.length] = addLaser(center, { x: e.offsetX, y: e.offsetY });
		});
		
		draw(lasers, center);
	});
})(jQuery);

function draw(lasers, center) {
	var canvas = document.getElementById("uxCanvas");
	var context = canvas.getContext("2d");
	
    context.clearRect(0, 0, canvas.width, canvas.height);
	
	drawCircle(context, center, 3);
	
	for(var i = 0; i < lasers.length; i++)
	{
		var laser = lasers[i];
		
		drawLaser(context, laser, 1);
		
		lasers[i].x += laser.run;
		lasers[i].y += laser.rise;
		
		if(lasers[i].x >= canvas.width || lasers[i].x <= 0)
		{
		}
		
		if(lasers[i].y >= canvas.height || lasers[i].y <= 0)
		{
		}
	}
	
	requestAnimFrame(function(){
        draw(lasers, center);
    });
}

function addLaser(center, target) {
	var angle;
	
	var angle = toAngle(target.y - center.y, target.x - center.x);
	
	var run = Math.cos(angle * Math.PI / 180);
	var rise = Math.sin(angle * Math.PI / 180);
	
	if (center.x > target.x)
		run *= -1;
	
	if (center.x > target.x)
		rise *= -1;
	
	console.log(angle);
	console.log(rise + ' / ' + run);
	
	return { 
		x: center.x, 
		y: center.y, 
		run: run,
		rise: rise,
	};
}

function drawCircle(context, location, radius) {
	context.beginPath();
    context.arc(location.x, location.y, radius, 0, 2 * Math.PI, false);
    context.fillStyle = "#8ED6FF";
    context.fill();
    context.lineWidth = 5;
    context.strokeStyle = "black";
    context.stroke();
}

function drawLaser(context, laser, length) {
	// The code below draws a circle at the starting point of the laser.
	// context.beginPath();
    // context.arc(laser.x, laser.y, 1, 0, 2 * Math.PI, false);
    // context.fillStyle = "#8ED6FF";
    // context.fill();
    // context.lineWidth = 5;
    // context.strokeStyle = "black";
    // context.stroke();

    context.lineWidth = 1;
	context.moveTo(laser.x, laser.y);
	
	var to = {};
	to.x = laser.x + laser.run * 10;
	to.y = laser.y + laser.rise * 10;
	
	context.lineTo(to.x, to.y);
	context.stroke();
}

function toAngle(yDelta, xDelta) {
	return Math.atan(yDelta / xDelta) * 180 / Math.PI;
}

function toSlope(angle) {
	return Math.sin(angle);
}