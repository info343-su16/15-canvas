'use strict';

//wait for document to load
window.onload = function() {

  navigator.getUserMedia = navigator.getUserMedia || 
                          navigator.webkitGetUserMedia ||
                          navigator.mozGetUserMedia ||
                          navigator.msGetUserMedia;


  var localMediaStream;
  var video = document.querySelector('video');
  var canvas = document.querySelector('canvas');
  var brush = canvas.getContext('2d');

  document.querySelector('#record').addEventListener('click', function(){
    navigator.getUserMedia({video:{mandatory:{maxWidth:300, maxHeight:300}}}, function(mediaStream) {
      localMediaStream = mediaStream;

      video.src = window.URL.createObjectURL(mediaStream);

    }, function(err) {
      console.log(err);
    }); //will use whichever available!
  })

  document.querySelector('#stop').addEventListener('click', function() {
    video.pause();

    //get all tracks from the stream
    var tracks = localMediaStream.getTracks();
    tracks.forEach(function(track){
      track.stop(); //stop each track
    });
  })

  document.querySelector('#selfie').addEventListener('click', function() {
    canvas.width = video.clientWidth;
    canvas.height = video.clientHeight;

    brush.drawImage(video, 0,0);

    mouseDrawing();

  });

  document.querySelector('#save').addEventListener('click', function() {
    var snapshot = canvas.toDataURL('image/png');

    var link = document.createElement('a');
    link.href = snapshot;
    link.download = 'selfie.png';

    link.click();

  });

 function mouseDrawing() {
    brush.fillStyle = "#39275B";
    brush.strokeStyle = "#C79900"

    var lastPoint = undefined;
    canvas.addEventListener('mousedown', function(event){
      //select an input color
      var input = document.querySelector('#picker');
      brush.strokeStyle = input.value;
      brush.lineWidth = 3;

      lastPoint = {x: event.offsetX, y: event.offsetY}

      brush.beginPath();
      brush.moveTo(event.offsetX,event.offsetY);
      //      brush.arc(x,y,5,0,2*Math.PI);
      brush.stroke();
    });

    canvas.addEventListener('mousemove', function(event){
      if(lastPoint){ //if we have a last point
        // brush.beginPath();
        // brush.arc(event.offsetX,event.offsetY,5,0,2*Math.PI);
        // brush.fill();
        brush.lineTo(event.offsetX, event.offsetY);
        brush.stroke();
        lastPoint.x = event.offsetX;
        lastPoint.y = event.offsetY;
      }
    });

    canvas.addEventListener('mouseup',function(event){
      lastPoint = undefined;
    })

  };

};