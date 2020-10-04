<%--
  Created by IntelliJ IDEA.
  User: Арсений
  Date: 30.09.2020
  Time: 1:11
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Shot result</title>
    <link rel="stylesheet" href="assets/homepage-style.css">
    <script>

        var canvas = document.getElementById("myCanvas");
        canvas.addEventListener('click', function(e) {
            getCursorPosition(canvas, e)
        });



        function getCursorPosition(canvas, event) {
            const rect = canvas.getBoundingClientRect()
            const ctx  = canvas.getContext("2d");
            const x = event.clientX - rect.left
            const y = event.clientY - rect.top
            printPoint(ctx, x, y)

        }

        function printPoint(canvasCtx, x, y) {
            canvasCtx.beginPath();
            canvasCtx.arc(x, y, 5, 0, Math.PI*2, false);
            canvasCtx.fillStyle = "green";
            canvasCtx.fill();
            canvasCtx.closePath();
        }




    </script>
</head>
<body>

</body>
</html>
