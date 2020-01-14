package edu.oregonstate.fluffyhome.mapper;

import edu.oregonstate.fluffyhome.model.OrderRequest;
import edu.oregonstate.fluffyhome.model.OrderRequestKey;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface OrderRequestMapper {
    int deleteByPrimaryKey(OrderRequestKey key);

    int insert(OrderRequest record);

    int insertSelective(OrderRequest record);

    OrderRequest selectByPrimaryKey(OrderRequestKey key);

    int updateByPrimaryKeySelective(OrderRequest record);

    int updateByPrimaryKey(OrderRequest record);
}