'use strict';

//wait for document to load
window.onload = function() {

  var canvas = document.querySelector('#canvas');
  var brush = canvas.getContext('2d');

  //draw the with mouse
  function mouseDrawing() {
    brush.fillStyle = "#39275B";
    brush.strokeStyle = "#C79900"

    var lastPoint = undefined;
    canvas.addEventListener('mousedown', function(event){
      //select an input color
      var input = document.querySelector('#picker');
      brush.strokeStyle = input.value;

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

  function movingRectangle() {
    var rect = {x:20, y:30, width:20, height:70, dy:2};

    var render = function() {

      brush.clearRect(0,0, canvas.width, canvas.height);

      var input = document.querySelector('#picker');
      brush.strokeStyle = input.value;    
      brush.fillRect(rect.x, rect.y, rect.width, rect.height);

    }

    function moveRect(){
      rect.y += rect.dy;
    }

    window.setInterval(moveRect, 20);

    var renderFrame = function(timestamp){
      moveRect();
      render();

      requestAnimationFrame(renderFrame);
    }

    requestAnimationFrame(renderFrame);

    document.addEventListener('keydown', function(event){
      console.log(event.which);
      if(event.which == 38){ //up key
        //move up
        rect.y -= 5;
      }
      else if(event.which == 40){ //down key
        //move down
        rect.y += 5;
      }
      render();

    });

    render();

  }

  //mouseDrawing();
  movingRectangle();



};

Math.toRadians = function(degrees){
  return degrees*Math.PI/180;
};
