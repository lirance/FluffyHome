package edu.oregonstate.fluffyhome.model;

import java.util.Date;


public class OrderRequest extends OrderRequestKey {
    private Integer fuId;

    private String status;

    private Date expire;

    public Integer getFuId() {
        return fuId;
    }

    public void setFuId(Integer fuId) {
        this.fuId = fuId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Date getExpire() {
        return expire;
    }

    public void setExpire(Date expire) {
        this.expire = expire;
    }
}