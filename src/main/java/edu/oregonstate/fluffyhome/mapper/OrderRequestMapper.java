package edu.oregonstate.fluffyhome.mapper;

import edu.oregonstate.fluffyhome.model.OrderRequest;
import edu.oregonstate.fluffyhome.model.OrderRequestKey;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface OrderRequestMapper {
    int deleteByPrimaryKey(OrderRequestKey key);

    int insert(OrderRequest record);

    int insertSelective(OrderRequest record);

    OrderRequest selectByPrimaryKey(OrderRequestKey key);

    int updateByPrimaryKeySelective(OrderRequest record);

    int updateByPrimaryKey(OrderRequest record);

    List<OrderRequest> getUserRequests(int tuId);

    int disableOrderRequest(int orderId);

    List<OrderRequest> getMyRequests(int fuId);

    int deleteByOrderId(int orderId);

    int enableOrderRequest(int orderId);
}