package edu.oregonstate.fluffyhome.controller;

import edu.oregonstate.fluffyhome.model.*;
import edu.oregonstate.fluffyhome.service.OrderService;
import edu.oregonstate.fluffyhome.service.UserOrderService;
import edu.oregonstate.fluffyhome.service.UserService;
import edu.oregonstate.fluffyhome.utils.StaticParams;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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

    @Autowired
    public PersonalOrderController(UserOrderService userOrderService, OrderService orderService, UserService userService) {
        this.userOrderService = userOrderService;
        this.orderService = orderService;
        this.userService = userService;
    }

    @RequestMapping("/create")
    public String createOrder(Date startDate, Date endDate, String orderDescription, boolean orderType, int userid) {

        // check if the user already setup available time
        UserOrder userOrder = new UserOrder();
        Order order = new Order();

        userOrder.setUserid(userid);

        order.setStatus(Status.ORDERED.toString());
        order.setStartdate(startDate);
        order.setEnddate(endDate);
        order.setorderDescription(orderDescription);
        // false means normal order.
        order.setOrdertype(orderType);

        int days = (int) ((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24));
        int credits = StaticParams.CREDITS_PER_DAY * days;
        order.setCredits(StaticParams.CREDITS_PER_DAY * days);

        try {
            User user = userService.selectByPrimaryKey(userid);
            order.setZip(user.getZip());
            order.setAddress(user.getAddress());

            if (credits > user.getCredits() && !orderType) {
                return "credit is not enough";
            }

            // insert into the order table


            if (orderService.insert(order) == 1) {
                userOrder.setMakerType(true);
                userOrder.setOrderid(order.getOrderid());
                if (userOrderService.insert(userOrder) == 1) {
                    //new credits.
                    user.setCredits(user.getCredits() - credits);
                    return userService.updateByPrimaryKey(user) == 1 ? "true" : "somthing went wrong";
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

            UserOrderKey userOrderKey = new UserOrderKey();
            userOrderKey.setUserid(userId);
            userOrderKey.setOrderid(orderId);

            UserOrder userOrder = userOrderService.selectByPrimaryKey(userOrderKey);
            if (userOrder == null || !userOrder.getMakerType()) {
                return false;
            }

            // delete user order
            if (userOrderService.deleteByPrimaryKey(userOrderKey) != 1) {
                return false;
            }
            //delete order
            return orderService.deleteByPrimaryKey(orderId) == 1;
        } catch (Exception e) {
            return false;
        }

    }


    @RequestMapping("/accept")
    public boolean AcceptOrder(int orderId, int userId) {

        UserOrder userOrder = new UserOrder();
        userOrder.setOrderid(orderId);
        userOrder.setUserid(userId);
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
            return orderService.updateByPrimaryKey(order) == 1;


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
            userOrderKey.setOrderid(orderId);
            userOrderKey.setUserid(userId);
            if (userOrderService.deleteByPrimaryKey(userOrderKey) != 1) {
                return false;
            }
            order.setStatus(Status.ORDERED.toString());
            return (orderService.updateByPrimaryKey(order) == 1);

        } catch (Exception e) {
            return false;
        }

    }

    @RequestMapping("/complete")
    public boolean completeOrder(int orderId, int userId) {
        UserOrderKey userOrderKey = new UserOrderKey();
        userOrderKey.setUserid(userId);
        userOrderKey.setOrderid(orderId);

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
            orderService.updateByPrimaryKey(order);
            return true;

        } catch (Exception e) {
            return false;
        }

    }

    @RequestMapping("/rate")
    public boolean RateOrder(int orderId, int userId, float rate) {
        UserOrderKey userOrderKey = new UserOrderKey();
        userOrderKey.setUserid(userId);
        userOrderKey.setOrderid(orderId);

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
                int rateUserId = userOrderService.getRateUser(userOrderKey).getUserid();
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
}
