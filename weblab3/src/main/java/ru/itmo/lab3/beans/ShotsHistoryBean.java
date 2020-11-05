package ru.itmo.lab3.beans;

import com.google.gson.Gson;
import ru.itmo.lab3.models.ShotData;
import ru.itmo.lab3.services.AreaChecker;
import ru.itmo.lab3.services.JsonMarshaller;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.SessionScoped;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;


@ManagedBean
@SessionScoped
public class ShotsHistoryBean implements Serializable {

    private ShotData newShot = new ShotData();

    private List<ShotData> shots = new ArrayList<>();

    public void addShot() {
        newShot.setCurrentTime(new Date());
        newShot.setResult(AreaChecker.checkInArea(newShot.getX(), newShot.getY(), newShot.getR()));
        shots.add(newShot);
        this.newShot = new ShotData();
    }

    public ShotsHistoryBean() {
    }

    public ShotData getNewShot() {
        return newShot;
    }

    public void setNewShot(ShotData newShot) {
        this.newShot = newShot;
    }

    public List<ShotData> getShots() {
        return shots;
    }

    public void setShots(List<ShotData> shots) {
        this.shots = shots;
    }

    public String getJsonShotsHistory() {
        return JsonMarshaller.toJsonMarshal(shots);
    }


}
