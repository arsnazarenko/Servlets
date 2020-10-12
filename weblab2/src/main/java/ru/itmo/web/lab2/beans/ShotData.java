package ru.itmo.web.lab2.beans;


import java.io.Serializable;
import java.util.Date;
import java.util.Objects;

public class ShotData implements Serializable {
    private double x;
    private double y;
    private double r;
    private boolean result;
    private Date currentTime;

    public ShotData(double x, double y, double r, boolean result, Date currentTime) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.result = result;
        this.currentTime = currentTime;
    }

    public ShotData() {

    }

    public double getX() {
        return x;
    }

    public void setX(double x) {
        this.x = x;
    }

    public double getY() {
        return y;
    }

    public void setY(double y) {
        this.y = y;
    }

    public double getR() {
        return r;
    }

    public void setR(double r) {
        this.r = r;
    }

    public boolean isResult() {
        return result;
    }

    public void setResult(boolean result) {
        this.result = result;
    }

    public Date getCurrentTime() {
        return currentTime;
    }

    public void setCurrentTime(Date currentTime) {
        this.currentTime = currentTime;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ShotData shotData = (ShotData) o;
        return Double.compare(shotData.x, x) == 0 &&
                Double.compare(shotData.y, y) == 0 &&
                Double.compare(shotData.r, r) == 0 &&
                result == shotData.result &&
                Objects.equals(currentTime, shotData.currentTime);
    }

    @Override
    public int hashCode() {
        return Objects.hash(x, y, r, result, currentTime);
    }

    @Override
    public String toString() {
        return "ShotData{" +
                "x=" + x +
                ", y=" + y +
                ", r=" + r +
                ", result=" + result +
                ", currentTime=" + currentTime +
                '}';
    }
}
