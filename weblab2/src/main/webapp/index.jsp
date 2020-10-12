<%@ page import="ru.itmo.web.lab2.beans.ShotData" %>
<%@ page import="java.util.*" %>
<%@ page import="java.util.stream.Collectors" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<%--
  Created by IntelliJ IDEA.
  User: Арсений
  Date: 27.09.2020
  Time: 18:57
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<html>
<head>
    <meta charset="UTF-8">
    <title>Second Lab</title>
    <link rel="shortcut icon" href="assets/images/favicon.png" type="image/png">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js"></script>
    <script type="text/javascript" src="assets/script.js"></script>
    <script type="text/javascript" src="assets/canvas.js"></script>
    <link rel="stylesheet" href="assets/reset.css">
    <link rel="stylesheet" href="assets/homepage-style.css">

    <script>
        <jsp:useBean id="shotHistory" class="java.util.ArrayList" scope="session" />
        $(document).ready(function() {
            let canvas = document.getElementById("canvasPoint");
            canvas.addEventListener('click', function(e) {
                canvasSubmit(canvas, e)
            });
            drawGraph();
            let r = document.getElementById('r_field').addEventListener('input', function (event) {
                if(choosen_r()) {
                    const canvas = document.getElementById("canvasPoint");
                    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
                    <c:forEach var="elem" items = "${shotHistory}">
                    printPoint(${elem.x}, ${elem.y}, ${elem.r}, ${elem.result});
                    </c:forEach>
                }
            });
            <%if (!shotHistory.isEmpty()) {
                ShotData shot = (ShotData) shotHistory.get(shotHistory.size() -1);%>
                setLastR(<%=shot.getR()%>);
            <%}%>

            <c:forEach var="elem" items = "${shotHistory}">
            printPoint(${elem.x}, ${elem.y}, ${elem.r}, ${elem.result});
            </c:forEach>


        });

    </script>

</head>
<body>
<table class="wrapper">
    <tr>
        <td class="header bottom-rounded_border" colspan="2">
            <table class="header_table">
                <tr>
                    <td class="text">
                        <p>WEB-ПРОГРАММИРОВАНИЕ</p>
                        <p>Вариант 2812</p>
                        <p>Назаренко А. Е. P3232</p>
                    </td>
                    <td class="emblem">
                        <img src="assets/images/areas3.png" alt="ITMO">
                    </td>
                </tr>
            </table>
        </td>
    </tr>
    <tr>
        <td class="form left-rounded_border">
            <table class="form_table">
                <tr>
                    <td colspan="2" class="top">
                        <%--                        <img class="schedule" src="assets/images/areas4.png" alt="schedule">--%>
                            <div class="graph">
                                <canvas id="canvasGraph" width="360" height="360"></canvas>
                                <canvas id="canvasPoint" width="360" height="360"></canvas>
                            </div>
                    </td>
                </tr>
                <tr>
                    <td colspan="2" class="bottom">
                        <form id="form" action="${pageContext.request.contextPath}/controller" method="get">
                            <div class="coordinates">
                                <div class="x_coordinate">
                                    <label for="x_field">X:</label>
                                    <select name="x_coord" id="x_field">
                                        <option value="-5">-5</option>
                                        <option value="-4">-4</option>
                                        <option value="-3">-3</option>
                                        <option value="-2">-2</option>
                                        <option value="-1">-1</option>
                                        <option value="0" selected>0</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                    </select>
                                </div>
                                <div class="y_coordinate">
                                    <label for="y_field">Y:</label>
                                    <input type="text" name="y_coord" id="y_field" oninput="choosen_y()"
                                           placeholder="[-3..5]" autocomplete="off">
                                </div>
                                <div class="r_coordinate">
                                    <label for="r_field">R:</label>
                                    <input type="text" name="r_coord" id="r_field" oninput="choosen_r()"
                                           placeholder="[2..5]" autocomplete="off">
                                </div>
                                <div class="data_submit">
                                    <button type="submit" id="submit_button">GO</button>
                                </div>
                            </div>
                        </form>
                        <form id="hidden_form" action="${pageContext.request.contextPath}/controller" method="get">
                            <input type="text" name="x_coord" id="hidden_x" autocomplete="off">
                            <input type="text" name="y_coord" id="hidden_y" autocomplete="off">
                            <input type="text" name="r_coord" id="hidden_r" autocomplete="off">
                            <input type="text" name="canvas" id="hidden_canvas" value="true" autocomplete="off">
                            <button type="submit" id="hidden_submit">GO</button>
                        </form>
                    </td>
                </tr>
            </table>
        </td>
        <td class="result_area right-rounded_border">
            <table class="result_table">
                <col class="coordinateCol">
                <col class="coordinateCol">
                <col class="coordinateCol">
                <tr>
                    <th><b>X</b></th>
                    <th><b>Y</b></th>
                    <th><b>R</b></th>
                    <th><b>Result</b></th>
                    <th><b>Current Time</b></th>
                </tr>
                <c:forEach var="elem" items="${shotHistory}">
                    <tr class="${elem.result}">
                        <td>${elem.x}</td>
                        <td>${elem.y}</td>
                        <td>${elem.r}</td>
                        <td>${elem.result}</td>
                        <td>${elem.currentTime}</td>
                    </tr>
                </c:forEach>
            </table>
        </td>
    </tr>
    <tr>
        <td class="footer top-rounded_border" colspan="2">Copyright © 2020
        </td>
    </tr>
</table>
</body>
</html>