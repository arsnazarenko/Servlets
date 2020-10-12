package ru.itmo.web.lab2.servlets;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.*;

@WebServlet(urlPatterns = {"/controller"})
public class ControllerServlet extends HttpServlet {

    @Override
    public void init() throws ServletException {
        super.init();
        log("Method init");
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        log("Method doGet");
        Map<String, String[]> parameters = req.getParameterMap();
        if ((parameters.keySet().containsAll(Arrays.asList("x_coord", "y_coord", "r_coord")))) {
            req.getRequestDispatcher("/check").forward(req, resp);
        } else {
            resp.sendRedirect("/web-app/home");
        }
    }





    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        log("Method service enter");
        super.service(req, resp);
        log("Method service exit");
    }

    @Override
    public void destroy() {
        log("Method destroy");
    }


}
