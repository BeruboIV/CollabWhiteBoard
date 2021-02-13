document.addEventListener("DOMContentLoaded", function () {
  var canvas = document.getElementById("myCanvas");
  var context = canvas.getContext("2d");
  const option = document.querySelectorAll(".btn");

  canvas.width = 1000;
  canvas.height = 800;
  var dragging = false;
  var radius = 5;

  var putPoint = function (canvas_point) {
    if (dragging == false) return;
    context.lineWidth = 2 * radius;

    context.lineTo(canvas_point.offsetX, canvas_point.offsetY);
    context.stroke();
    context.beginPath();
    //   context.arc(e.clientX, e.clientY, 5, 0, 2 * Math.PI); // Was giving a lot of issues
    context.arc(
      canvas_point.offsetX,
      canvas_point.offsetY,
      radius,
      0,
      2 * Math.PI
    );
    context.fill();
    context.beginPath();
    context.moveTo(canvas_point.offsetX, canvas_point.offsetY);
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

  for (let i = 0; i < 10; i++) {
    option[i].addEventListener("click", function () {
      if (option[i].classList.contains("eraser")) {
        context.globalCompositeOperation = "destination-out";
      }
      if (option[i].classList.contains("pencil")) {
        context.globalCompositeOperation = "source-over";
      }
      if (option[i].classList.contains("red")) {
        context.fillStyle = "red";
        context.strokeStyle = "red";
        context.globalCompositeOperation = "destination-over";
      }
      if (option[i].classList.contains("blue")) {
        context.fillStyle = "blue";
        context.strokeStyle = "blue";
        context.globalCompositeOperation = "source-over";
      }
      if (option[i].classList.contains("green")) {
        context.fillStyle = "green";
        context.strokeStyle = "green";
        context.globalCompositeOperation = "source-over";
      }
      if (option[i].classList.contains("black")) {
        context.fillStyle = "black";
        context.strokeStyle = "black";
        context.globalCompositeOperation = "source-over";
      }
    });
  }
});
