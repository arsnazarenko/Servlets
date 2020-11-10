package ru.itmo.lab3.services;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;
import org.hibernate.cfg.Configuration;
import org.hibernate.service.ServiceRegistry;
import ru.itmo.lab3.entities.ShotEntity;

import javax.annotation.PostConstruct;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.SessionScoped;
import java.util.List;

@ManagedBean
@SessionScoped
public class HistoryService {

    private SessionFactory sessionFactory;

    @PostConstruct
    private void init() {
        try {
            Configuration configuration = new Configuration().configure();
            configuration.addAnnotatedClass(ShotEntity.class);

            ServiceRegistry serviceRegistry = new StandardServiceRegistryBuilder().
                    applySettings(configuration.getProperties()).build();

            sessionFactory = configuration.buildSessionFactory(serviceRegistry);

        } catch (Exception e) {
            e.printStackTrace();
            throw new ExceptionInInitializerError(e);
        }
    }

    public SessionFactory getSessionFactory() {
        return sessionFactory;
    }

    public void setSessionFactory(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

    public boolean saveShot(ShotEntity shot) {
        Transaction transaction = null;


        try(Session session = sessionFactory.openSession()) {
            transaction = session.beginTransaction();
            session.save(shot);
            transaction.commit();
            return true;
        } catch (Exception e) {
            if (transaction != null) {
                transaction.rollback();
            }
            e.printStackTrace();
        }
        return false;
    }


    public List<ShotEntity> getShotHistory () {
        try(Session session = sessionFactory.openSession()) {
            return session.createQuery("from ShotEntity", ShotEntity.class).list();
        }
    }

}

