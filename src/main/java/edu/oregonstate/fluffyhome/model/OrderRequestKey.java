package edu.oregonstate.fluffyhome.model;

public class OrderRequestKey {
    private Integer tuId;

    private Integer orderId;

    public Integer getTuId() {
        return tuId;
    }

    public void setTuId(Integer tuId) {
        this.tuId = tuId;
    }

    public Integer getOrderId() {
        return orderId;
    }

    public void setOrderId(Integer orderId) {
        this.orderId = orderId;
    }
}