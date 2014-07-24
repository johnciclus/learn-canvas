function teste(){
	var speed = 5;
	var p1 = {x:20,y:250};
	var p2 = {x:480,y:250};
	var dx = p2.x - p1.x;
	var dy = p2.y - p1.y;
	var distance = Math.sqrt(dx*dx + dy*dy);
	var moves = distance/speed;
	var xunits = (p2.x - p1.x)/moves;
	var yunits = (p2.y - p1.y)/moves;
	var ball = {x:p1.x, y:p1.y};
	var points = new Array();
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
		// Create ball
		if (moves > 0 ) {
			moves--;
			ball.x += xunits;
			ball.y += yunits;
		}
		
		points.push({x:ball.x,y:ball.y});
		for (var i = 0; i< points.length; i++) {
			context.drawImage(imagem, points[i].x, points[i].y,1,1);
		}
		context.fillStyle = "#000000";
		context.beginPath();
		context.arc(ball.x,ball.y,15,0,Math.PI*2,true);
		context.closePath();
		context.fill();
	}
	function gameLoop() {
		window.setTimeout(gameLoop, 20);
		drawScreen();
	}
	gameLoop();
	
	
}

teste();
