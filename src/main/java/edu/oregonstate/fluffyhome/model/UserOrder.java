package edu.oregonstate.fluffyhome.model;

public class UserOrder extends UserOrderKey {
    private Boolean rateflag = false;

    private Boolean makerType;

    private Float rate;

    public Boolean getRateflag() {
        return rateflag;
    }

    public void setRateflag(Boolean rateflag) {
        this.rateflag = rateflag;
    }

    public Boolean getMakerType() {
        return makerType;
    }

    public void setMakerType(Boolean makerType) {
        this.makerType = makerType;
    }

    public Float getRate() {
        return rate;
    }

    public void setRate(Float rate) {
        this.rate = rate;
    }
}