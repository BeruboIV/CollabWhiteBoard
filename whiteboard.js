document.addEventListener("DOMContentLoaded", function () {
  var canvas = document.getElementById("myCanvas");
  var context = canvas.getContext("2d");
  const option = document.querySelectorAll(".btn");
  var canvasWrapper = document.getElementById("canvas-wrapper").getBoundingClientRect();
  const cursor = document.querySelector(".cursor");
  var current_mode = "pencil";

  canvas.width = canvasWrapper.width;
  canvas.height = canvasWrapper.height;
  /* This causes the canvas to refresh but it will work for now.*/
  // window.onresize = function () {
  //   canvas.width = canvasWrapper.width;
  //   canvas.height = canvasWrapper.height;
  // };
  var dragging = false;
  var radius = 5;

  var putPoint = function (canvas_point) {
    if (dragging == false) return;
    context.lineWidth = 2 * radius;
    const X = canvas_point.offsetX;
    const Y = canvas_point.offsetY;
    context.lineTo(X, Y);
    context.stroke();
    context.beginPath();
    //   context.arc(e.clientX, e.clientY, 5, 0, 2 * Math.PI); // Was giving a lot of issues
    context.arc(X, Y, radius, 0, 2 * Math.PI);
    context.fill();
    context.beginPath();
    context.moveTo(X, Y);
  };

  var engage = function (canvas_point) {
    dragging = true;
    putPoint(canvas_point);
  };

  var disengage = function () {
    dragging = false;
    context.beginPath();
  };

  canvas.addEventListener("mousedown", engage);
  canvas.addEventListener("mousemove", putPoint);
  canvas.addEventListener("mouseup", disengage);

  ///////////////////////////////////////////////Event Listener for Pallete/////////////////////////////////////////////
  for (let i = 0; i < 10; i++) {
    option[i].addEventListener("click", function () {
      if (option[i].classList.contains("eraser")) {
        // The existing content is kept where it doesn't overlap the new shape.
        context.globalCompositeOperation = "destination-out";
        document.body.style.cursor = "auto";
        current_mode = "erase";
      }
      else{
        current_mode = "pencil";
      }
      if (option[i].classList.contains("pencil")) {
      }
      else if (option[i].classList.contains("red")) {
        context.fillStyle = "red";
        context.strokeStyle = "red";
        context.globalCompositeOperation = "source-over";
      }
      else if (option[i].classList.contains("blue")) {
        context.fillStyle = "blue";
        context.strokeStyle = "blue";
        context.globalCompositeOperation = "source-over";
      }
      else if (option[i].classList.contains("green")) {
        context.fillStyle = "green";
        context.strokeStyle = "green";
        context.globalCompositeOperation = "source-over";
      }
      else if (option[i].classList.contains("black")) {
        context.fillStyle = "black";
        context.strokeStyle = "black";
        context.globalCompositeOperation = "source-over";
      }
    });
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////

  document.addEventListener("mousemove", e => {
    cursor.setAttribute("style", "top: " + (e.pageY - scrollY) + "px; left: " + (e.pageX) + "px;");
    if(current_mode == "erase")
      cursor.style.backgroundColor = "black";
    else
      cursor.style.opacity = 0;
  })

});
