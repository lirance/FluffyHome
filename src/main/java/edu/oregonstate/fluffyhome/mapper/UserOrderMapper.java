package edu.oregonstate.fluffyhome.mapper;

import edu.oregonstate.fluffyhome.model.UserOrder;
import edu.oregonstate.fluffyhome.model.UserOrderKey;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface UserOrderMapper {
    int deleteByPrimaryKey(UserOrderKey key);

    int insert(UserOrder record);

    int insertSelective(UserOrder record);

    UserOrder selectByPrimaryKey(UserOrderKey key);

    int updateByPrimaryKeySelective(UserOrder record);

    int updateByPrimaryKey(UserOrder record);

    int rate(UserOrder record);

    int setRateFlag(UserOrder record);

    UserOrder selectRate(UserOrderKey key);

    List<UserOrder> getAllOrderMakers();

    List<UserOrder> getUsersByOrder(int orderid);

    List<UserOrder> getOrdersByUser(int userid, boolean orderMaker);
}