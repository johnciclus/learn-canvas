function drawScreen() {
	var theCanvas = document.getElementById("canvas");
	var context = theCanvas.getContext("2d");
	//draw a big box on the screen
	context.fillStyle = "black"; //
	context.fillRect(10, 10, 200, 200);
	//leave globalCompositeOperation as is
	//now draw a red square
	context.fillStyle = "red";
	context.fillRect(1, 1, 50, 50);

}

function rotacao() {
	var theCanvas = document.getElementById("canvasOne");
	var context = theCanvas.getContext("2d");
	context.setTransform(1,0,0,1,0,0);
	var angleInRadians = 45 * Math.PI / 180;
	var x = 100;
	var y = 100;
	var width = 50;
	var height = 50;
	context.translate(x+.5*width, y+.5*height);
	context.scale(2,2);
	context.rotate(angleInRadians);
	context.fillStyle = "red";
	context.fillRect(-.5*width,-.5*height , width, height);
}

drawScreen();
