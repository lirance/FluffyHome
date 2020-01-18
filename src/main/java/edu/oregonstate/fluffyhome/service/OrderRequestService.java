package edu.oregonstate.fluffyhome.service;

import edu.oregonstate.fluffyhome.model.OrderRequest;
import edu.oregonstate.fluffyhome.model.OrderRequestKey;

import java.util.List;

public interface OrderRequestService extends BaseObjectService<OrderRequest, OrderRequestKey> {
    List<OrderRequest> getUserRequests(int userId);

    int disableOrderRequest(int orderId, boolean disable);

    List<OrderRequest> getMyRequests(int userId);

    int deleteByOrderId(int orderId);
}
