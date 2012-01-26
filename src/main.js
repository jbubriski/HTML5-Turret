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
		var turret = { x: 300, y: 300 };
		
		$canvas.on('click', function (e) {
			lasers[lasers.length] = addLaser(turret, { x: e.offsetX, y: e.offsetY });
		});
		
		$canvas.on('mousemove', function (e) {
			turret.targetX = e.offsetX;
			turret.targetY = e.offsetY;
		});
		
		$canvas.on('onselectstart', function () { return false; });
		
		draw(lasers, turret);
	});
})(jQuery);

function draw(lasers, turret) {
	var canvas = document.getElementById("uxCanvas");
	var context = canvas.getContext("2d");
	
    context.clearRect(0, 0, canvas.width, canvas.height);
	
	drawTurret(context, turret);
	
	for(var i = 0; i < lasers.length; i++)
	{
		var laser = lasers[i];
		
		drawLaser(context, laser, 10);
		
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
        draw(lasers, turret);
    });
}

function addLaser(center, target) {
	var slope = pointsToSlope(center, target);
	
	return { 
		x: center.x, 
		y: center.y, 
		run: slope.run,
		rise: slope.rise,
	};
}

function drawTurret (context, turret) {
	var target = { x: turret.targetX, y: turret.targetY };
	var slope = pointsToSlope(turret, target);
	
	turret.run = slope.run;
	turret.rise = slope.rise;
	
	drawCircle(context, turret, 3);
	drawLine(context, turret, 10);
}

function drawLaser (context, laser, length) {
	drawLine (context, laser, length);
}

function drawCircle (context, location, radius) {
	context.beginPath();
    context.arc(location.x, location.y, radius, 0, 2 * Math.PI, false);
    context.fillStyle = "#8ED6FF";
    context.fill();
    context.lineWidth = 5;
    context.strokeStyle = "black";
    context.stroke();
}

function drawLine (context, vector, length) {
    context.lineWidth = 1;
	context.moveTo(vector.x, vector.y);
	
	var to = {};
	to.x = vector.x + vector.run * length;
	to.y = vector.y + vector.rise * length;
	
	context.lineTo(to.x, to.y);
	context.stroke();
}

/////////////////////////////////////////////////
// Math Functions
/////////////////////////////////////////////////
function pointsToSlope (pointA, pointB)
{
	var angle = deltaToAngle(pointB.y - pointA.y, pointB.x - pointA.x);
	
	var slope = {};
	
	slope.run = Math.cos(angle * Math.PI / 180);
	slope.rise = Math.sin(angle * Math.PI / 180);
	
	if (pointA.x > pointB.x)
		slope.run *= -1;
	
	if (pointA.x > pointB.x)
		slope.rise *= -1;
	
	return slope;
}

function deltaToAngle (yDelta, xDelta) {
	return Math.atan(yDelta / xDelta) * 180 / Math.PI;
}

function toSlope (angle) {
	return Math.sin(angle);
}