<%--
  Created by IntelliJ IDEA.
  User: Арсений
  Date: 03.10.2020
  Time: 14:33
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>

<head>
    <title>400</title>
    <link rel="stylesheet" href="assets/400-error.css">
    <link rel="stylesheet" href="assets/reset.css">
</head>
<body>
<div class="mainbox">
    <div class="err">4</div>
    <div class="err1">0</div>
    <div class="err2">0</div>
    <div class="msg"><h2>Bad Request :(</h2>The server did not understand the request. Мay be you sent a request with incorrect parameters.<p>Let's go <a href="${pageContext.request.contextPath}/home">home</a> and try again.</p></div>
</div>
</body>
</html>
