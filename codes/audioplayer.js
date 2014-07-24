var loadCount = 0;
var itemsToLoad = 2;
var buttonSheet;
var audioElement;
var buttonWait = 5;
var timeWaited = buttonWait;

function init() {
  audioElement = document.createElement("audio");
  document.body.appendChild(audioElement);
  var audioType = supportedAudioFormat(audioElement);
  if (audioType == "") {
  alert("no audio support");
  return;
  }
  audioElement.addEventListener("canplaythrough",itemLoaded,false);
  audioElement.setAttribute("src", "../sounds/song." + audioType);

  buttonSheet = new Image();
  buttonSheet.onload = itemLoaded;
  buttonSheet.src = "../images/audiocontrols.png";
}

function supportedAudioFormat(audio) {
  var returnExtension = "";
  if (audio.canPlayType("audio/ogg") =="probably" ||
  audio.canPlayType("audio/ogg") == "maybe") {
  returnExtension = "ogg";
  } else if(audio.canPlayType("audio/wav") =="probably" ||
  audio.canPlayType("audio/wav") == "maybe") {
  returnExtension = "wav";
  } else if(audio.canPlayType("audio/mp3") == "probably" ||
  audio.canPlayType("audio/mp3") == "maybe") {
  returnExtension = "mp3";
  }
  return returnExtension;
}

function canvasSupport () {
  return Modernizr.canvas;
}

function itemLoaded(event) {
  loadCount++;
  if (loadCount >= itemsToLoad) {
    canvasApp();
  }
}

function canvasApp() {
  if (!canvasSupport()) {
    return;
  }

  function drawScreen () {
    //Background
    context.fillStyle = "#ffffaa";
    context.fillRect(0, 0, theCanvas.width, theCanvas.height);
    //Box
  
    context.strokeStyle = "#000000";
    context.strokeRect(5, 5, theCanvas.width-10, theCanvas.height-10);
    
    // Text
    context.fillStyle = "#000000";
    context.fillText("Duration:" + audioElement.duration, 20 ,20);
    context.fillText("Current time:" + audioElement.currentTime, 250 ,20);
    context.fillText("Loop: " + audioElement.loop, 20 ,40);
    context.fillText("Autoplay: " +audioElement.autoplay, 250 ,40);
    context.fillText("Muted: " + audioElement.muted, 20 ,60);
    context.fillText("Controls: " + audioElement.controls, 250 ,60);
    context.fillText("Volume: " + audioElement.volume, 20 ,80);
    context.fillText("Paused: " + audioElement.paused, 250 ,80);
    context.fillText("Ended: " + audioElement.ended, 20 ,100);
    context.fillText("Can Play OGG: " + audioElement.canPlayType("audio/ogg"), 250 ,100); 
    context.fillText("Can Play WAV: " + audioElement.canPlayType("audio/wav"), 20 ,120);
    context.fillText("Can Play MP3: " + audioElement.canPlayType("audio/mp3"), 250 ,120);
    context.fillText("Source: " + audioElement.currentSrc, 20 ,140);
    context.fillText("volumeSliderDrag: " + volumeSliderDrag, 20 ,160);
    
    //Draw Controls
    //play or pause
    if (audioElement.paused) {
      context.drawImage(buttonSheet, 0,0,bW,bH,playX,playY,bW,bH);//show play
    } else {
      context.drawImage(buttonSheet, 0,32,bW,bH,playX,playY,bW,bH); //show pause
    }
    
    //loop
    if (audioElement.loop) {
      context.drawImage(buttonSheet, 114,32,bW,bH,loopX,loopY,bW,bH);//show loop
    } else {
      context.drawImage(buttonSheet, 82,32,bW,bH,loopX,loopY,bW,bH); //show no loop
    }
    
    //play background
    context.drawImage(buttonSheet, 32,0,playBackW,bH,playBackX,playBackY, playBackW,bH);
    
    //vol Background
    context.drawImage(buttonSheet, 32,32,volBackW,bH,volBackX,volBackY,volBackW,bH);
    
    //play slider
    var slideIncrement = playBackW/audioElement.duration;
  
    var sliderX = (controlStartX+bW) + (slideIncrement*audioElement.currentTime);
    
    context.drawImage(buttonSheet, 238,0,sliderW,bH,sliderX, controlStartY,sliderW,bH);
    
    //Go back to start
    if (audioElement.ended && !audioElement.loop) {
      audioElement.currentTime = 0;
      audioElement.pause();
    }
    
    //Volume slider
    //Test Volume Drag
    if (volumeSliderDrag) {
      volumeSliderX = mouseX;
      if (volumeSliderX > volumeSliderEnd) {
        volumeSliderX = volumeSliderEnd;
      }
      if (volumeSliderX < volumeSliderStart) {
        volumeSliderX = volumeSliderStart;
      }
    } else {
      volumeSliderX = volumeSliderStart + (audioElement.volume*(volBackW -sliderW));
    }
    context.drawImage(buttonSheet, 238,0,sliderW,bH,volumeSliderX,volumeSliderY, sliderW,bH);
    audioElement.volume = (volumeSliderX-volumeSliderStart) * volumeIncrement;
    timeWaited++;
  }
    
  function eventMouseDown(event) {
    //Hit Volume Slider
    if ( (mouseY >= volumeSliderY) && (mouseY <=volumeSliderY+sliderH) && (mouseX >= volumeSliderX) && (mouseX <= volumeSliderX+sliderW) ) {
      volumeSliderDrag = true;
    }
  }

  function eventMouseMove(event) {
    var x;
    var y;
    if (event.pageX || event.pageY) {
    x = event.pageX;
    y = event.pageY;
    } else {
    
      x = e.clientX + document.body.scrollLeft +
      document.documentElement.scrollLeft;
      y = e.clientY + document.body.scrollTop +
      document.documentElement.scrollTop;
    }
    x -= theCanvas.offsetLeft;
    y -= theCanvas.offsetTop;
    
    mouseX=x;
    mouseY=y;
  }

  function eventMouseUp(event) {
    if (timeWaited >= buttonWait) {
      timeWaited = 0;
      //Hit Play
      if ( (mouseY >= playY) && (mouseY <= playY+bH) && (mouseX >= playX) && (mouseX <= playX+bW) ) {
        if (audioElement.paused) {
          audioElement.play();
        } else {
        audioElement.pause();
      }
      
      }
      //Hit loop
      if ( (mouseY >=loopY) && (mouseY <= loopY+bH) && (mouseX >= loopX) && (mouseX <= loopX+bW) ) {
        if (audioElement.loop) {
          audioElement.loop=false;
        } else {
          audioElement.loop = true;
        }
      }
    }
  
  if (volumeSliderDrag) {
    volumeSliderDrag = false;
  }
}

var theCanvas = document.getElementById("canvas");
var context = theCanvas.getContext("2d");
var bW = 32;
  
var bH = 32;
var playBackW = 206;
var volBackW = 50;
var sliderW = 10;
var sliderH = 32;
var controlStartX = 25;
var controlStartY =200;
var playX = controlStartX;
var playY = controlStartY;
var playBackX = controlStartX+bW;
var playBackY = controlStartY;
var volBackX = controlStartX+bW+playBackW;
var volBackY = controlStartY;
var loopX = controlStartX+bW+playBackW+volBackW;
var loopY = controlStartY;
var mouseX;
var mouseY;

theCanvas.addEventListener("mouseup",eventMouseUp, false);
theCanvas.addEventListener("mousedown",eventMouseDown, false);
theCanvas.addEventListener("mousemove",eventMouseMove, false);

audioElement.play();
audioElement.loop = false;
audioElement.volume = .5;

var volumeSliderStart = volBackX;
var volumeSliderEnd = volumeSliderStart + volBackW -sliderW;
var volumeSliderX = volumeSliderStart + (audioElement.volume*(volBackW -sliderW));
var volumeSliderY = controlStartY;
var volumeSliderDrag = false;
var volumeIncrement = 1/(volBackW -sliderW);

function gameLoop() {
  window.setTimeout(gameLoop, 20);
  drawScreen();
}

gameLoop();
}

init();