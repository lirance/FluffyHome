package edu.oregonstate.fluffyhome.model;

/**
 * @author: Chendi Zhang
 * @date: 2019-10-28
 * @description:
 **/

public class OrderShow extends Order {

    private User maker;


    private User recipient;

    public OrderShow(Order order) {
        this.setOrderid(order.getOrderid());
    }

    public OrderShow() {
    }

    public User getMaker() {
        return maker;
    }

    public void setMaker(User maker) {
        this.maker = maker;
    }


    public User getRecipient() {
        return recipient;
    }

    public void setRecipient(User recipient) {
        this.recipient = recipient;
    }
}
