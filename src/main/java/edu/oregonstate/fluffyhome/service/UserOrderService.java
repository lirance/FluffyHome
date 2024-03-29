package edu.oregonstate.fluffyhome.service;

import edu.oregonstate.fluffyhome.model.UserOrder;
import edu.oregonstate.fluffyhome.model.UserOrderKey;

import java.util.List;
import java.util.Map;

/**
 * @author: Chendi Zhang
 * @date: 2019-10-24
 * @description:
 **/

public interface UserOrderService extends BaseObjectService<UserOrder, UserOrderKey> {

    boolean getRateFlag(UserOrderKey userOrderKey);

    boolean setRate(int orderId, int userId, float rate);

    UserOrder getRateUser(UserOrderKey userOrderKey);

    /**
     * @return map <OrderId, UserId>
     */
    Map<Integer, Integer> getOrderMakers();

    List<UserOrder> getUsersByOrder(int orderId);

    List<UserOrder> getOrdersByMaker(int userid);

    List<UserOrder> getOrdersByAccepter(int userid);
}
