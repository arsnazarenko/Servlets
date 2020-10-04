package ru.itmo.web.lab2.servlets;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Map;

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
        if (requestIsValid(parameters)) {
            req.getRequestDispatcher("/check").forward(req, resp);
        } else {
            resp.sendRedirect("/web-app/home");
        }
    }

    /**
     * Метод, проверяющий наличие только трех нужных парамтеров, а также проверяя количество значений каждого параметра (требуется только одно)
     *
     * @param parameters
     * @return
     */
    private boolean requestIsValid(Map<String, String[]> parameters) {

        if (parameters.keySet().equals(new HashSet<>(Arrays.asList("x_coord", "y_coord", "r_coord")))) {
            return parameters.values().stream().map(array -> array.length == 1).reduce((e1, e2) -> e1 && e2).orElse(false);
        }
        return false;
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
