function teste(){
	var numBalls = 100 ;
	var maxSize = 8;
	var minSize = 5;
	var maxSpeed = maxSize+5;
	var balls = new Array();
	var tempBall;
	var tempX;
	var tempY;
	var tempSpeed;
	var tempAngle;
	var tempRadius;
	var tempRadians;
	var tempXunits;
	var tempYunits;
	var theCanvas = document.getElementById("canvas");
	var context = theCanvas.getContext("2d");
	
	var imagem = new Image();
	imagem.src = "imagens/exemplo.jpg";

	function drawScreen() 
	{
		//make changes here
		context.fillStyle = '#EEEEEE';
		context.fillRect(0, 0, theCanvas.width, theCanvas.height);
		//Box
		context.strokeStyle = '#000000';
		context.strokeRect(1, 1, theCanvas.width-2, theCanvas.height-2);
		//Place balls
		context.fillStyle = "#000000";
		var ball;
		for (var i = 0; i <balls.length; i++) {
			ball = balls[i];
			ball.x += ball.xunits;
			ball.y += ball.yunits;
			context.beginPath();
			context.arc(ball.x,ball.y,ball.radius,0,Math.PI*2,true);
			context.closePath();
			context.fill();
			if (ball.x > theCanvas.width || ball.x < 0 ) {
				ball.angle = 180 - ball.angle;
				updateBall(ball);
			} else if (ball.y > theCanvas.height || ball.y < 0) {
				ball.angle = 360 - ball.angle;
				updateBall(ball);
			}
		}
	}
	
	function updateBall(ball) {
		ball.radians = ball.angle * Math.PI/ 180;
		ball.xunits = Math.cos(ball.radians) * ball.speed;
		ball.yunits = Math.sin(ball.radians) * ball.speed;
	}
	
	for (var i = 0; i < numBalls; i++) {
		tempRadius = Math.floor(Math.random()*maxSize)+minSize;
		tempX = tempRadius*2 + (Math.floor(Math.random()*theCanvas.width)-tempRadius*2);
		tempY = tempRadius*2 + (Math.floor(Math.random()*theCanvas.height)-tempRadius*2);
		tempSpeed = maxSpeed-tempRadius;
		tempAngle = Math.floor(Math.random()*360);
		tempRadians = tempAngle * Math.PI/ 180;
		tempXunits = Math.cos(tempRadians) * tempSpeed;
		tempYunits = Math.sin(tempRadians) * tempSpeed;
		tempBall = {x:tempX,y:tempY,radius:tempRadius, speed:tempSpeed, angle:tempAngle,
		xunits:tempXunits, yunits:tempYunits}
		balls.push(tempBall);
	}
	
	function gameLoop() {
		window.setTimeout(gameLoop, 20);
		drawScreen();
	}
	gameLoop();
	
	
}

teste();
