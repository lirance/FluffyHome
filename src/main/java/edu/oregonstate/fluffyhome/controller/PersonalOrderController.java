package edu.oregonstate.fluffyhome.controller;

import edu.oregonstate.fluffyhome.model.*;
import edu.oregonstate.fluffyhome.service.OrderRequestService;
import edu.oregonstate.fluffyhome.service.OrderService;
import edu.oregonstate.fluffyhome.service.UserOrderService;
import edu.oregonstate.fluffyhome.service.UserService;
import edu.oregonstate.fluffyhome.utils.StaticParams;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.List;

/**
 * @author: Chendi Zhang
 * @date: 2019-10-24
 * @description:
 **/

@RestController
@RequestMapping("/order")
@CrossOrigin(origins = "*")
public class PersonalOrderController {

    private final UserOrderService userOrderService;
    private final OrderService orderService;
    private final UserService userService;
    private final OrderRequestService orderRequestService;

    @Autowired
    public PersonalOrderController(UserOrderService userOrderService, OrderService orderService, UserService userService, OrderRequestService orderRequestService) {
        this.userOrderService = userOrderService;
        this.orderService = orderService;
        this.userService = userService;
        this.orderRequestService = orderRequestService;
    }

    @RequestMapping("/create")
    public String createOrder(Date startDate, Date endDate, String orderDescription, boolean orderType, int userId) {

        try {

            // check if the user already setup available time
            UserOrder userOrder = new UserOrder();
            Order order = new Order();

            userOrder.setUserId(userId);

            order.setStatus(Status.ORDERED.toString());
            order.setStartDate(startDate);
            order.setEndDate(endDate);
            order.setorderDescription(orderDescription);
            int days = (int) ((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24));
            int credits = StaticParams.CREDITS_PER_DAY * days;
            // false means normal order.
            order.setOrderType(orderType);

            User user = userService.selectByPrimaryKey(userId);

            if (orderType) {
                credits = 0;
            } else if (credits > user.getCredits()) {
                return "credit is not enough";
            }
            order.setCredits(credits);

            order.setZip(user.getZip());
            order.setAddress(user.getAddress());


            // insert into the order table


            if (orderService.insert(order) == 1) {
                userOrder.setMakerType(true);
                userOrder.setOrderId(order.getOrderId());
                if (userOrderService.insert(userOrder) == 1) {
                    //new credits.
                    user.setCredits(user.getCredits() - credits);
                    return userService.updateByPrimaryKey(user) == 1 ? "true" : "something went wrong";
                }

            }

        } catch (Exception e) {

            return "something wrong";
        }

        return "something wrong";

    }

    @RequestMapping("/delete")
    public boolean deleteOrder(int orderId, int userId) {

        try {
            Order order = orderService.selectByPrimaryKey(orderId);
            if (!order.getStatus().equals(Status.ORDERED.toString())) {
                return false;
            }
            User u = userService.selectByPrimaryKey(userId);
            u.setCredits(order.getCredits() + u.getCredits());

            UserOrderKey userOrderKey = new UserOrderKey();
            userOrderKey.setUserId(userId);
            userOrderKey.setOrderId(orderId);

            UserOrder userOrder = userOrderService.selectByPrimaryKey(userOrderKey);
            if (userOrder == null || !userOrder.getMakerType()) {
                return false;
            }

            if (orderRequestService.deleteByOrderId(orderId) != 1) {
                return false;
            }

            // delete user order
            if (userOrderService.deleteByPrimaryKey(userOrderKey) != 1) {
                return false;
            }
            //delete order & update user credits.
            return orderService.deleteByPrimaryKey(orderId) == 1 && userService.updateByPrimaryKey(u) == 1;
        } catch (Exception e) {
            return false;
        }

    }


    @RequestMapping("/accept")
    public boolean acceptOrder(int orderId, int userId) {

        UserOrder userOrder = new UserOrder();
        userOrder.setOrderId(orderId);
        userOrder.setUserId(userId);
        // not order maker, order accepter
        userOrder.setMakerType(false);

        try {
            Order order = orderService.selectByPrimaryKey(orderId);

            if (!order.getStatus().equals(Status.ORDERED.toString())) {
                return false;
            }

            // insert the user order
            if (userOrderService.insert(userOrder) != 1) {
                return false;
            }

            // update order state
            order.setStatus(Status.ACCEPTED.toString());
            return orderService.updateByPrimaryKey(order) == 1 && disableOrderRequest(orderId, true);


        } catch (Exception e) {
            return false;
        }


    }

    @RequestMapping("/cancel")
    public boolean cancelOrder(int orderId, int userId) {

        try {
            Order order = orderService.selectByPrimaryKey(orderId);

            if (!order.getStatus().equals(Status.ACCEPTED.toString())) {
                return false;
            }

            UserOrderKey userOrderKey = new UserOrderKey();
            userOrderKey.setOrderId(orderId);
            userOrderKey.setUserId(userId);
            if (userOrderService.deleteByPrimaryKey(userOrderKey) != 1) {
                return false;
            }
            order.setStatus(Status.ORDERED.toString());
            return (orderService.updateByPrimaryKey(order) == 1) && disableOrderRequest(orderId, false);

        } catch (Exception e) {
            return false;
        }

    }

    @RequestMapping("/complete")
    public boolean completeOrder(int orderId, int userId, int recipientId) {
        UserOrderKey userOrderKey = new UserOrderKey();
        userOrderKey.setUserId(userId);
        userOrderKey.setOrderId(orderId);

        try {
            if (userOrderService.selectByPrimaryKey(userOrderKey) == null) {
                return false;
            }

            Order order = orderService.selectByPrimaryKey(orderId);

            // the order is already been accepted
            if (!Status.ACCEPTED.toString().equals(order.getStatus())) {
                return false;
            }

            order.setStatus(Status.COMPLETED.toString());

            User recipient = userService.selectByPrimaryKey(recipientId);
            recipient.setCredits(recipient.getCredits() + order.getCredits());

            return orderService.updateByPrimaryKey(order) == 1 && userService.updateByPrimaryKey(recipient) == 1;
//            return true;

        } catch (Exception e) {
            return false;
        }

    }

    @RequestMapping("/rate")
    public boolean RateOrder(int orderId, int userId, float rate) {
        UserOrderKey userOrderKey = new UserOrderKey();
        userOrderKey.setUserId(userId);
        userOrderKey.setOrderId(orderId);

        try {
            // the order status is not completed.
            if (!(Status.COMPLETED.toString()).equals(orderService.selectByPrimaryKey(orderId).getStatus())) {
                return false;
            }

            // the user is already rate the order
            if (userOrderService.getRateFlag(userOrderKey)) {
                return false;
            }

            if (userOrderService.setRate(orderId, userId, rate)) {
                int rateUserId = userOrderService.getRateUser(userOrderKey).getUserId();
                User user = userService.selectByPrimaryKey(rateUserId);


                if (user.getAverageRate() == null) {
                    user.setAverageRate(rate);
                    user.setRateNumber(1);
                } else {
                    float avgRate = user.getAverageRate();
                    int rateNum = user.getRateNumber();
                    user.setRateNumber(rateNum + 1);
                    user.setAverageRate((avgRate * rateNum + rate) / (rateNum + 1));
                }
                return userService.updateByPrimaryKey(user) == 1;


            }
        } catch (Exception e) {
            return false;
        }

        return false;
    }

    /**
     * this function let user can change their credits order to none-credits order, this cannot be undo.
     *
     * @return
     */
    @RequestMapping("/changeOrderType")
    public boolean changeOrderType(int orderId, int userId) {
        try {
            Order order = orderService.selectByPrimaryKey(orderId);

            if (order.getStatus().equals(Status.ORDERED.toString()) && !order.getOrderType()) {

                User u = userService.selectByPrimaryKey(userId);
                u.setCredits(order.getCredits() + u.getCredits());

                order.setCredits(0);
                order.setOrderType(true);
                //delete order & update user credits.
                return orderService.updateByPrimaryKey(order) == 1 && userService.updateByPrimaryKey(u) == 1 && disableOrderRequest(orderId, true);
            }
        } catch (Exception e) {
            return false;
        }
        return false;

    }


    @RequestMapping("request/create")
    public boolean createRequest(int orderId, Date startDate, int fuId, int tuId) {
        try {

            OrderRequest orderRequest = new OrderRequest();
            orderRequest.setExpire(startDate);
            orderRequest.setFuId(fuId);
            orderRequest.setStatus(Status.REQUESTED.toString());
            orderRequest.setTuId(tuId);
            orderRequest.setOrderId(orderId);

            return orderRequestService.insert(orderRequest) == 1;


        } catch (Exception e) {
            return false;
        }
    }

    // get requests I received
    @RequestMapping("request/getUserRequests")
    public List<OrderRequest> getUserRequests(int userId) {
        try {
            return orderRequestService.getUserRequests(userId);
        } catch (Exception e) {
            return null;
        }
    }

    // get requests I sent
    @RequestMapping("request/getMyRequests")
    public List<OrderRequest> getMyRequests(int userId) {
        try {
            return orderRequestService.getMyRequests(userId);
        } catch (Exception e) {
            return null;
        }
    }

    @RequestMapping("request/response")
    public boolean acceptRequest(int orderId, int tuId, boolean accept) {
        try {
            OrderRequestKey orderRequestKey = new OrderRequestKey();
            orderRequestKey.setTuId(tuId);
            orderRequestKey.setOrderId(orderId);

            OrderRequest orderRequest = orderRequestService.selectByPrimaryKey(orderRequestKey);

            if (orderRequest != null) {
                // set request status
                if (accept) {
                    // accept
                    orderRequest.setStatus(Status.ACCEPTED.toString());
                    return this.acceptOrder(orderId, tuId) && orderRequestService.updateByPrimaryKey(orderRequest) == 1;
                } else {
                    // decline
                    orderRequest.setStatus(Status.REFUSED.toString());
                    return orderRequestService.updateByPrimaryKey(orderRequest) == 1;
                }
            }
        } catch (Exception e) {
            return false;
        }
        return false;
    }

    private boolean disableOrderRequest(int orderId, boolean disable) {
        try {
            orderRequestService.disableOrderRequest(orderId, disable);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @RequestMapping("request/delete")
    public boolean delete(int orderId) {

        try {
            return orderRequestService.deleteByOrderId(orderId) == 1;

        } catch (Exception e) {
            return false;
        }

    }

}
