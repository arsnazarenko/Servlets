package arsnaz;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.UUID;

@WebServlet(urlPatterns = {"/handle-servlet"})
@MultipartConfig(location = "D:/Files/Documents/Java/Servlets/servletapp")
public class HandleServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        StringBuilder info = new StringBuilder("\n");
        for (Part part : req.getParts()) {
            if (!part.getName().equals("file-name")) {
                InputStream inputStream = part.getInputStream();
                InputStreamReader isr = new InputStreamReader(inputStream);
                String line = new BufferedReader(isr)
                        .readLine();
                info.append(line + "\n");
            } else {
                part.write(UUID.randomUUID().toString() + part.getSubmittedFileName());
            }
        }
        log(info.toString());
        String registerForm = "/start-page";
        RequestDispatcher dispatcher = req.getRequestDispatcher(registerForm);
        dispatcher.forward(req, resp);
    }
}
