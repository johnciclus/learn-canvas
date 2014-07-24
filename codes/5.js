function teste(){
	var theCanvas = document.getElementById("canvas");
	var context = theCanvas.getContext("2d");
	var imagem = new Image();
	imagem.src = "imagens/exemplo.jpg";
	function drawScreen() 
	{
		//make changes here
		setInterval(rotaciona, 250);			
	}
	function rotaciona()
	{
		context.rotate(0.2 * 3);			
		context.fillRect(10, 0, 150, 50);
		context.drawImage(imagem, 0, 0);
	}
	imagem.addEventListener('load', drawScreen , false);
	
}

teste();
