<%--
  Created by IntelliJ IDEA.
  User: Арсений
  Date: 03.10.2020
  Time: 20:12
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>404</title>
    <link rel="stylesheet" href="assets/reset.css">
    <link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@600;900&display=swap" rel="stylesheet">
    <script src="https://kit.fontawesome.com/4b9ba14b0f.js" crossorigin="anonymous"></script>
    <style>
        body {
            background-color: #00246a;
        }

        .mainbox {
            margin: auto;
            height: 600px;
            width: 600px;
            position: relative;
            line-height: 1.5;
        }

        .err {
            color: #ffffff;
            font-family: 'Nunito Sans', sans-serif;
            font-size: 11rem;
            position:absolute;
            left: 24%;
            top: 8%;
        }

        .err2 {
            color: #ffffff;
            font-family: 'Nunito Sans', sans-serif;
            font-size: 11rem;
            position:absolute;
            left: 64%;
            top: 8%;
        }

        .msg {
            text-align: center;
            color: white;
            font-family: 'Nunito Sans', sans-serif;
            font-size: 1.5rem;
            position: relative;
            left: 16%;
            top: 45%;
            width: 75%;
        }

        a {
            text-decoration: none;
            color: #AAF3AC;
            font-size: 1.7rem;

        }
        h2 {
            color: #FF8D8E;
        }

        a:hover {
            font-size: 1.8rem;
            text-decoration: underline;
            color: green;
        }

        .far {
            position: absolute;
            font-size: 8.5rem;
            left: 42%;
            top: 17%;
            color: #ffffff;
        }
    </style>
</head>
<body>
<div class="mainbox">
    <div class="err">4</div>
    <i class="far fa-question-circle fa-spin"></i>
    <div class="err2">4</div>
    <div class="msg">Maybe this page moved? Got deleted? Is hiding out in quarantine? Never existed in the first place?<p>Let's go <a href="${pageContext.request.contextPath}/home">home</a> and try from there.</p></div>
</div>
</body>
</html>
