package edu.oregonstate.fluffyhome.controller;

import edu.oregonstate.fluffyhome.model.*;
import edu.oregonstate.fluffyhome.service.OrderRequestService;
import edu.oregonstate.fluffyhome.service.OrderService;
import edu.oregonstate.fluffyhome.service.UserOrderService;
import edu.oregonstate.fluffyhome.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

/**
 * @author: Chendi Zhang
 * @date: 2019-10-28
 * @description:
 **/

@RestController
@RequestMapping("/orders")
@CrossOrigin(origins = "*")
public class OrdersController {

    private final UserOrderService userOrderService;
    private final OrderService orderService;
    private final UserService userService;
    private final OrderRequestService orderRequestService;

    @Autowired
    public OrdersController(UserOrderService userOrderService, OrderService orderService, UserService userService, OrderRequestService orderRequestService) {
        this.userOrderService = userOrderService;
        this.orderService = orderService;
        this.userService = userService;
        this.orderRequestService = orderRequestService;
    }

    @RequestMapping("/getOrders")
    public List<OrderShow> getAllNotAcceptedOrders(boolean isSitter) {

        List<OrderShow> orderShowList = new ArrayList<>();

        try {

            List<Order> orders = orderService.getAllNotAcceptedOrders(!isSitter);
            Map<Integer, Integer> userOrders = userOrderService.getOrderMakers();

            for (Order order : orders) {
                OrderShow os = new OrderShow(order);
                User maker = userService.selectByPrimaryKey(userOrders.get(os.getOrderId()));
                maker.setPassword(null);
                os.setMaker(maker);
                orderShowList.add(os);
            }
        } catch (Exception e) {
            return orderShowList;
        }

        return orderShowList;

    }

    @RequestMapping("/getOrderDetailById")
    public OrderShow getOrderDetail(int orderId) {

        Order order = orderService.selectByPrimaryKey(orderId);
        OrderShow orderShow = new OrderShow(order);
        setOrderUsers(orderId, orderShow);
        return orderShow;

    }


    @RequestMapping("/getCreateOrder")
    public List<PersonOrderShow> getCreateOrderCR(int userId) {
        List<PersonOrderShow> orderShowList = new ArrayList<>();

        try {
            List<UserOrder> userOrders = userOrderService.getOrdersByMaker(userId);

            generateOrderShow(orderShowList, userOrders);


        } catch (Exception e) {
            return null;
        }
        return orderShowList;

    }

    private void generateOrderShow(List<PersonOrderShow> orderShowList, List<UserOrder> userOrders) {
        for (UserOrder uo : userOrders) {
            PersonOrderShow orderShow = new PersonOrderShow(getOrderDetail(uo.getOrderId()));
            orderShow.setRated(uo.getRateflag());
            orderShowList.add(orderShow);
        }

        orderShowList.sort((o1, o2) -> o2.getStartDate().compareTo(o1.getStartDate()));
    }


    @RequestMapping("getRequestOrders")
    public List<PersonOrderShow> getRequestOrders(int userId, boolean sitterType, int tuId) {
        List<PersonOrderShow> orderShowList = getCreateOrderCR(userId);
        List<PersonOrderShow> result = new ArrayList<>();

        for (PersonOrderShow os : orderShowList) {
            if (os.getStatus().equals(Status.ORDERED.toString()) && os.getOrderType() == sitterType) {

                OrderRequest orderRequest = new OrderRequest();
                orderRequest.setOrderId(os.getOrderId());
                orderRequest.setTuId(tuId);
                // order haven't been requested.
                if (orderRequestService.selectByPrimaryKey(orderRequest) == null) {
                    result.add(os);
                }

            }

        }

        return result;


    }

    @RequestMapping("/getAcceptedOrder")
    public List<PersonOrderShow> getAcceptedOrder(int userId) {
        List<PersonOrderShow> orderShowList = new ArrayList<>();

        try {
            List<UserOrder> userOrders = userOrderService.getOrdersByAccepter(userId);

            generateOrderShow(orderShowList, userOrders);


        } catch (Exception e) {
            return null;
        }
        return orderShowList;

    }


    private void setOrderUsers(int orderId, OrderShow orderShow) {
        List<UserOrder> orders = userOrderService.getUsersByOrder(orderId);
        for (UserOrder o : orders) {
            User user = userService.selectByPrimaryKey(o.getUserId());
            if (o.getMakerType()) {
                orderShow.setMaker(user);
            } else {
                orderShow.setRecipient(user);
            }
        }
    }
}
