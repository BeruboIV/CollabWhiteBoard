document.addEventListener("DOMContentLoaded", function () {
    const socket = io();

    var canvas = document.getElementById("myCanvas");
    var context = canvas.getContext("2d");
    const option = document.querySelectorAll(".btn");
    const num_tags = 8; // Number of tags on the pallete
    const cursor = document.querySelector(".cursor");
    var canvasWrapper = document
        .getElementById("canvas-wrapper")
        .getBoundingClientRect();
    var current_mode = "pencil";
    var stroke_style = "black";
    var fill_style = "black";

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
        // const X = canvas_point.offSetX;
        // const Y = canvas_point.offSetY;
        const { X, Y } = canvas_point;
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
        // console.log(canvas_point.offsetX);
        socket.emit("client-engage", {
            X: canvas_point.offsetX,
            Y: canvas_point.offsetY,
        });
    };
    socket.on("server-engage", (coors) => {
        // console.log(coors.X, coors.Y);
        dragging = true;
        putPoint(coors);
    });

    var disengage = function () {
        socket.emit("client-disengage");
    };
    socket.on("server-disengage", () => {
        dragging = false;
        context.beginPath();
    });

    canvas.addEventListener("mousedown", engage);
    canvas.addEventListener("mousemove", putPoint);
    canvas.addEventListener("mouseup", disengage);

    ///////////////////////////////////////////////Event Listener for Pallete/////////////////////////////////////////////
    for (let i = 0; i < num_tags; i++) {
        option[i].addEventListener("click", function () {
            if (option[i].classList.contains("eraser")) {
                // The existing content is kept where it doesn't overlap the new shape.
                context.globalCompositeOperation = "destination-out";
                document.body.style.cursor = "auto";
                current_mode = "erase";
            } else {
                current_mode = "pencil";
            }
            if (option[i].classList.contains("pencil")) {
                context.fillStyle = fill_style;
                context.strokeStyle = stroke_style;
                context.globalCompositeOperation = "source-over";
            } else if (option[i].classList.contains("red")) {
                fill_style = "red";
                stroke_style = "red";
                context.fillStyle = "red";
                context.strokeStyle = "red";
                context.globalCompositeOperation = "source-over";
            } else if (option[i].classList.contains("blue")) {
                fill_style = "blue";
                stroke_style = "blue";
                context.fillStyle = "blue";
                context.strokeStyle = "blue";
                context.globalCompositeOperation = "source-over";
            } else if (option[i].classList.contains("green")) {
                fill_style = "green";
                stroke_style = "green";
                context.fillStyle = "green";
                context.strokeStyle = "green";
                context.globalCompositeOperation = "source-over";
            } else if (option[i].classList.contains("black")) {
                fill_style = "black";
                stroke_style = "black";
                context.fillStyle = "black";
                context.strokeStyle = "black";
                context.globalCompositeOperation = "source-over";
            }
        });
    }
    // Eraser animation

    document.addEventListener("mousemove", (e) => {
        cursor.setAttribute(
            "style",
            "top: " + (e.pageY - scrollY) + "px; left: " + e.pageX + "px;"
        );
        if (current_mode == "erase") cursor.style.backgroundColor = "black";
        else cursor.style.opacity = 0;
    });
});
