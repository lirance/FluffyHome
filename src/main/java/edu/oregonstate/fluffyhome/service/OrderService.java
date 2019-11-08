package edu.oregonstate.fluffyhome.service;

import edu.oregonstate.fluffyhome.model.Order;

import java.util.List;

/**
 * @author: Chendi Zhang
 * @date: 2019-10-24
 * @description:
 **/

public interface OrderService extends BaseObjectService<Order, Integer> {

    List<Order> getAllNotAcceptedOrders();
}
