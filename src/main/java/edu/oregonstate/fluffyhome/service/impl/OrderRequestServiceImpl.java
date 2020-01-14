package edu.oregonstate.fluffyhome.service.impl;

import edu.oregonstate.fluffyhome.mapper.OrderRequestMapper;
import edu.oregonstate.fluffyhome.model.OrderRequest;
import edu.oregonstate.fluffyhome.model.OrderRequestKey;
import edu.oregonstate.fluffyhome.service.OrderRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @author: Chendi Zhang
 * @date: 2020-01-09
 * @description:
 **/

@Service
public class OrderRequestServiceImpl implements OrderRequestService {

    private final OrderRequestMapper orderRequestMapper;

    @Autowired
    public OrderRequestServiceImpl(OrderRequestMapper orderRequestMapper) {
        this.orderRequestMapper = orderRequestMapper;
    }

    @Override
    public int insert(OrderRequest record) {
        return orderRequestMapper.insert(record);
    }

    @Override
    public OrderRequest selectByPrimaryKey(OrderRequestKey orderRequestKey) {
        return orderRequestMapper.selectByPrimaryKey(orderRequestKey);
    }

    @Override
    public int updateByPrimaryKey(OrderRequest object) {
        return orderRequestMapper.updateByPrimaryKey(object);
    }

    @Override
    public int deleteByPrimaryKey(OrderRequestKey orderRequestKey) {
        return orderRequestMapper.deleteByPrimaryKey(orderRequestKey);
    }
}
