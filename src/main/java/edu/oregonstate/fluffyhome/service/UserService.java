package edu.oregonstate.fluffyhome.service;

import edu.oregonstate.fluffyhome.model.User;

import java.util.List;

/**
 * @author: Chendi Zhang
 * @date: 2019-10-24
 * @description:
 **/

public interface UserService extends BaseObjectService<User, Integer> {

    List<User> testGetTenUsers();

    User getUserByPhone(String phone);

    String getLatlng(String address);

    List<User> getSitters(int userId, boolean isSitter);

}
