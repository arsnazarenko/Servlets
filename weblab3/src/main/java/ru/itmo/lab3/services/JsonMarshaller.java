package ru.itmo.lab3.services;

import com.google.gson.Gson;

public class JsonMarshaller {
    private final static Gson gson = new Gson();

    public static String toJsonMarshal(Object obj) {
        return gson.toJson(obj);
    }

}
