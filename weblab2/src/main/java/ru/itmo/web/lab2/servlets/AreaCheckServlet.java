package ru.itmo.web.lab2.servlets;


import ru.itmo.web.lab2.beans.ShotData;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.*;

@WebServlet(urlPatterns = {"/check"})
public class AreaCheckServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        try {
            double x = Double.parseDouble(req.getParameter("x_coord"));
            double y = Double.parseDouble(req.getParameter("y_coord"));
            double r = Double.parseDouble(req.getParameter("r_coord"));
            if (xIsValid(x) && yIsValid(y) && rIsValid(r)) {
                boolean result = checkInArea(x, y, r);
                String currentTime = SimpleDateFormat.getTimeInstance().format(new Date());
                ShotData shot = new ShotData(x, y, r, result, currentTime);
                List<ShotData> historyBean = (List<ShotData>) req.getSession().getAttribute("shotHistory");
                if (historyBean == null) {
                    historyBean = new ArrayList<>();
                }
                historyBean.add(shot);
                req.getSession().setAttribute("shotHistory", historyBean);
                req.setAttribute("result", shot);
                req.getRequestDispatcher("/home").forward(req, resp);
                //fixme: сделать перенаправление н страничку с уведомлением об незультате выстрела и там прикрепить ссылку обратно на форму
            } else {
                log("Invalid request data");
                resp.sendError(HttpServletResponse.SC_BAD_REQUEST);
            }

        } catch (NumberFormatException | NullPointerException e) {
            //fixme: сделать перенаправление н страничку с уведомлением об ошибке и там прикрепить ссылку обратно форму
            log("request data can't parse to a number ");
            resp.sendError(HttpServletResponse.SC_BAD_REQUEST);
        }
    }

    private boolean checkInArea(double x, double y, double r) {
        return  ((x >= -r && x <= 0 && y >= -r && y <= 0) ||
                (x >= 0 && y <= 0 && (x - (y + r/2)) <= 0) ||
                (y >= 0 && x <= 0 && (x * x + y * y <= (r/ 2) * (r/2)))
        );
    }

    private boolean xIsValid(double x) {
        final List<Double> availableValues = Arrays.asList(-3d, -2d, -1d, 0d, 1d, 2d, 3d, 4d, 5d);
        if (availableValues.contains(x)) {
            return true;
        }
        return false;
    }
    private String paramLog(Map<String, String[]> parameters) {
        StringBuilder sb = new StringBuilder("Your parameters:\n");
        parameters.forEach((key, value) -> {
            sb.append((key + " --> " + Arrays.stream(value).reduce((x, y) -> (x + ", " + y)).get() + " size: " + value.length + "\n"));
        });
        return sb.toString();
    }

    private boolean rIsValid(double r) {
        return (r >= 2 && r <= 5);
    }

    private boolean yIsValid(double y) {
        return (y >= -3 && y <= 5);
    }

}
