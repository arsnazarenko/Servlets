package ru.itmo.lab3.models;

import java.io.Serializable;
import java.util.Date;
import java.util.Objects;

public class ShotData implements Serializable {
    private Double x;
    private Double y;
    private Double r;
    private Boolean result;
    private Date currentTime;
    public ShotData() {

    }

    public ShotData(Double x, Double y, Double r, Boolean result, Date currentTime) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.result = result;
        this.currentTime = currentTime;
    }

    public Double getX() {
        return x;
    }

    public void setX(Double x) {
        this.x = x;
    }

    public Double getY() {
        return y;
    }

    public void setY(Double y) {
        this.y = y;
    }

    public Double getR() {
        return r;
    }

    public void setR(Double r) {
        this.r = r;
    }

    public Boolean getResult() {
        return result;
    }

    public void setResult(Boolean result) {
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
        return Objects.equals(x, shotData.x) &&
                Objects.equals(y, shotData.y) &&
                Objects.equals(r, shotData.r) &&
                Objects.equals(result, shotData.result) &&
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
