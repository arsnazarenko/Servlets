package ru.itmo.lab3.beans;

import ru.itmo.lab3.entities.ShotEntity;
import ru.itmo.lab3.models.ShotData;
import ru.itmo.lab3.services.AreaChecker;
import ru.itmo.lab3.services.HistoryService;
import ru.itmo.lab3.services.JsonMarshaller;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.ManagedProperty;
import javax.faces.bean.SessionScoped;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;


@ManagedBean
@SessionScoped
public class ShotsHistoryBean implements Serializable {

    @ManagedProperty(value = "#{historyService}")
    private HistoryService historyService;

    private ShotData newShot = new ShotData();

    private List<ShotData> shots = new ArrayList<>();

    public void addShot() {
        newShot.setResult(AreaChecker.checkInArea(newShot.getX(), newShot.getY(), newShot.getR()));
        if (historyService.saveShot(new ShotEntity(newShot.getX(), newShot.getY(), newShot.getR(), newShot.getResult()))) {
            shots.add(newShot);
        }
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

    public HistoryService getHistoryService() {
        return historyService;
    }

    public void setHistoryService(HistoryService historyService) {
        this.historyService = historyService;
    }

    public String getJsonShotsHistory() {
        return JsonMarshaller.toJsonMarshal(shots);
    }


}
