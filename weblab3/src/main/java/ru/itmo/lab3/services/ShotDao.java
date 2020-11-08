package ru.itmo.lab3.services;

import org.hibernate.Session;
import org.hibernate.Transaction;
import ru.itmo.lab3.entities.ShotEntity;

import java.util.List;

public class ShotDao {
    public boolean saveShot(ShotEntity shot) {
        Transaction transaction = null;

        try(Session session = HibernateUtil.getSessionFactory().openSession()) {
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
        try(Session session = HibernateUtil.getSessionFactory().openSession()) {
            return session.createQuery("from ShotEntity", ShotEntity.class).list();
        }
    }

}
