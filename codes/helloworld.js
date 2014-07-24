function helloworld(){
	var theCanvas = document.getElementById("canvas");
	var context = theCanvas.getContext("2d");
	context.fillStyle = "#ffffaa";
	context.fillRect(0, 0, 500, 300);
	context.fillStyle = "#000000";
	context.font = "20px Sans-Serif";
	context.textBaseline = "top";
	context.fillText ("Hello World!", 195, 80 );
}

helloworld()
