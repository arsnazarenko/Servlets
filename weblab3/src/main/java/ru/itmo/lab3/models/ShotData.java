package ru.itmo.lab3.models;

import java.io.Serializable;
import java.util.Objects;

public class ShotData implements Serializable {
    private Double x;
    private Double y;
    private Double r;
    private Boolean result;

    public ShotData() {

    }

    public ShotData(Double x, Double y, Double r, Boolean result) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.result = result;
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ShotData shotData = (ShotData) o;
        return Objects.equals(x, shotData.x) &&
                Objects.equals(y, shotData.y) &&
                Objects.equals(r, shotData.r) &&
                Objects.equals(result, shotData.result);
    }

    @Override
    public int hashCode() {
        return Objects.hash(x, y, r, result);
    }

    @Override
    public String toString() {
        return "ShotData{" +
                "x=" + x +
                ", y=" + y +
                ", r=" + r +
                ", result=" + result +
                '}';
    }
}
