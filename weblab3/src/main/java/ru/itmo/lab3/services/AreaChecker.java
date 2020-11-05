package ru.itmo.lab3.services;

public class AreaChecker {
    public static Boolean checkInArea(double x, double y, double r) {
        return ((x >= -r && x <= 0 && y >= -r && y <= 0) ||
                (x >= 0 && y >= 0 && (2*x + y - r <= 0) ||
                (y >= 0 && x <= 0 && (x * x + y * y <= r * r)))
        );
    }
}
