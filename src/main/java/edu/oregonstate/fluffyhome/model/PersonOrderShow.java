package edu.oregonstate.fluffyhome.model;

/**
 * @author: Chendi Zhang
 * @date: 2019-10-09
 * @description:
 **/

public class PersonOrderShow extends OrderShow {

    private boolean isRated;

    public boolean isRated() {
        return isRated;
    }

    public void setRated(boolean rated) {
        isRated = rated;
    }


    public PersonOrderShow(Order order) {
        this.setOrderId(order.getOrderId());
        this.setStatus(order.getStatus());
        this.setOrderType(order.getOrderType());
        this.setCredits(order.getCredits());
        this.setAddress(order.getAddress());
        this.setZip(order.getZip());
        this.setStartDate(order.getStartDate());
        this.setEndDate(order.getEndDate());
        this.setorderDescription(order.getorderDescription());
    }

    public PersonOrderShow(OrderShow order) {
        this.setOrderId(order.getOrderId());
        this.setStatus(order.getStatus());
        this.setOrderType(order.getOrderType());
        this.setCredits(order.getCredits());
        this.setAddress(order.getAddress());
        this.setZip(order.getZip());
        this.setStartDate(order.getStartDate());
        this.setEndDate(order.getEndDate());
        this.setorderDescription(order.getorderDescription());

        this.setMaker(order.getMaker());
        this.setRecipient(order.getRecipient());
    }

}
