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
    <link rel="stylesheet" href="assets/reset.css">
    <title>Shot result</title>
    <style>
        body {
            background-color: #00246a;
        }

        .main {
            position: absolute;
            top: 30%;
            /*width: 800px;*/
            left: 10%;
            right: 10%;
            line-height: 1.5;
        }



        .result_table {
            table-layout: fixed;
            font-family: sans-serif;
            font-size: 15px;
            background: white;
            width: 100%;
            border-collapse: collapse;
            text-align: left;
        }

        .result_table th {
            font-weight: bold;
            color: #039;
            border-bottom: 2px solid #6678b1;
            padding: 10px 8px;
        }

        .result_table td {
            overflow-wrap: break-word;
            border-bottom: 1px solid #ccc;
            color: #669;
            padding: 9px 8px;
            transition: .3s linear;
        }

        .result_table .true:hover td {
            background-color: #87ff8b;
        }

        .result_table .false:hover td {
            background-color: #ff5f5b;
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
    </style>
</head>
<body>
<div class="main">
    <table class="result_table">
        <tr>
            <th><b>X</b></th>
            <th><b>Y</b></th>
            <th><b>R</b></th>
            <th><b>Result</b></th>
            <th><b>Current Time</b></th>
        </tr>
        <tr class="${shotResult.result}">
            <jsp:useBean id="shotResult" class="ru.itmo.web.lab2.beans.ShotData" scope="request"/>
            <td>${shotResult.x}</td>
            <td>${shotResult.y}</td>
            <td>${shotResult.r}</td>
            <td>${shotResult.result}</td>
            <td>${shotResult.currentTime}</td>
        </tr>
    </table>
    <p class="msg">Let's go <a href="/web-app/home">home</a> and try from there.</p>
</div>


</body>
</html>
