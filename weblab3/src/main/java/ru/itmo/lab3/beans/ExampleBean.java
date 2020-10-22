package ru.itmo.lab3.beans;

import ru.itmo.lab3.models.Student;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.SessionScoped;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@SessionScoped
@ManagedBean
public class ExampleBean implements Serializable {

    private Student newStudent = new Student();

    private List<Student> students = new ArrayList<>();

    public void addStudent() {
        students.add(newStudent);
        newStudent = new Student();
    }

    public Student getNewStudent() {
        return newStudent;
    }

    public void setNewStudent(Student newStudent) {
        this.newStudent = newStudent;
    }

    public List<Student> getStudents() {
        return students;
    }

    public void setStudents(List<Student> students) {
        this.students = students;
    }
}
