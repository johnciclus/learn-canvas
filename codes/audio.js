function init(){
  $("#canvas_div").append("<div id='loadingStatus'>0%</div>");
  $("#canvas_div").append(
    "<audio id='TheAudio' controls >"+
     "<source src='../sounds/song.mp3' type='audio/mp3'>"+
      "<source src='../sounds/song.ogg' type='audio/ogg'>"+
      "<source src='../sounds/song.wav' type='audio/wav'>"+
      "Your browser does not support the audio element."+
    "</audio>");
  
   eventWindowLoaded();
}

function eventWindowLoaded() {
  var audioElement = document.getElementById("TheAudio");
  audioElement.addEventListener("canplaythrough",audioLoaded,false);
  //audioElement.addEventListener("progress",updateLoadingStatus,false);
  audioElement.load();
}

function canvasSupport () {
  return Modernizr.canvas;
}

function updateLoadingStatus() {
  var loadingStatus = document.getElementById("loadingStatus");
  var audioElement = document.getElementById("TheAudio");
  var percentLoaded = parseInt(((audioElement.buffered.end(0) / audioElement.duration) * 100));
  document.getElementById("loadingStatus").innerHTML = 'loaded ' + percentLoaded + '%';
}

function audioLoaded() {
  canvasApp();
}

function canvasApp() {
  if (!canvasSupport()) {
    return;
  }
  function drawScreen () { //Background
    context.fillStyle = "#ffffaa";
    context.fillRect(0, 0, theCanvas.width, theCanvas.height);
    
    //Box
    context.strokeStyle = "#000000";
    context.strokeRect(5, 5, theCanvas.width-10, theCanvas.height-10);
    
    // Text
    context.fillStyle = "#000000";
    context.fillText("Duration:" + audioElement.duration, 20 ,20);
    context.fillText("Current time:" + audioElement.currentTime, 20 ,40); 
    context.fillText("Loop: " + audioElement.loop, 20 ,60);
    context.fillText("Autoplay: " +audioElement.autoplay, 20 ,80);
    context.fillText("Muted: " + audioElement.muted, 20 ,100);
    context.fillText("Controls: " + audioElement.controls, 20 ,120);
    context.fillText("Volume: " + audioElement.volume, 20 ,140);
    context.fillText("Paused: " + audioElement.paused, 20 ,160);
    context.fillText("Ended: " + audioElement.ended, 20 ,180);
    context.fillText("Source: " + audioElement.currentSrc, 20 ,200);
    context.fillText("Can Play OGG: " + audioElement.canPlayType("audio/ogg"),20 ,220);
    context.fillText ("Can Play WAV: " + audioElement.canPlayType("audio/wav"), 20 ,240);
    context.fillText ("Can Play MP3: " + audioElement.canPlayType("audio/mp3"), 20 ,260);
  }
  
  var theCanvas = document.getElementById("canvas");
  var context = theCanvas.getContext("2d");
  var audioElement = document.getElementById("TheAudio");
  audioElement.play();
  
  function gameLoop() {
    window.setTimeout(gameLoop, 20);
    drawScreen();
  }
  gameLoop();
}

init();