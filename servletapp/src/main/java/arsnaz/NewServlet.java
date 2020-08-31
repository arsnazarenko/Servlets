package arsnaz;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Arrays;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@WebServlet(urlPatterns = {"/start-page"})
public class NewServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        String uri = req.getRequestURI();
        String params = formatParameters(req);
        resp.getWriter().write("Hello!\n" + uri + "\n"
                + req.getMethod() + " method\n" + "Parameters:\n" + params);

    }

    private String formatParameters(HttpServletRequest req) {
        return req.getParameterMap().entrySet()
                .stream()
                .map(entry ->
                {String par = String.join("; " ,entry.getValue());
                return entry.getKey() + " --> " + par;

                })
                .collect(Collectors.joining("\n"));
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String uri = req.getRequestURI();
        String params = req.getParameterMap().entrySet().stream()
                .filter(entry -> !(entry.getKey().equals("file-name")))
                .map(entry -> entry.getKey() + ": " + String.join(" and ", entry.getValue()))
                .collect(Collectors.joining("\n"));
        resp.getWriter().write("Hello!\n" + uri + "\n"
                + req.getMethod() + " method\n" + "Parameters:\n" + params);
    }

    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.getWriter().write("Enter in service\n");
        super.service(req, resp);
    }

    /*
    Освобождение ресурсов севлетов, вызывается при закрытии сенаса пользователем или при окончании времени ожидания сервера
     */
    @Override
    public void destroy() {
        log("destroy new-servlet start page\n");
    }

    /*
    Инициализация сервлета, обязательно вызываем super.init();
    Метод вызывается при первом обращении к сервлету
     */
    @Override
    public void init() throws ServletException {
        log("init new-servlet start page\n");
        super.init();
    }
}
