package edu.oregonstate.fluffyhome.service.impl;

import edu.oregonstate.fluffyhome.mapper.UserMapper;
import edu.oregonstate.fluffyhome.model.User;
import edu.oregonstate.fluffyhome.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * @author: Chendi Zhang
 * @date: 2019-10-24
 * @description:
 **/

@Service
public class UserServiceImpl implements UserService {


    private final UserMapper userMapper;

    @Autowired
    public UserServiceImpl(UserMapper userMapper) {
        this.userMapper = userMapper;
    }

    @Override
    public int insert(User record) {
        return userMapper.insert(record);
    }

    @Override
    public User selectByPrimaryKey(Integer integer) {
        return userMapper.selectByPrimaryKey(integer);
    }

    @Override
    public int updateByPrimaryKey(User object) {
        return userMapper.updateByPrimaryKey(object);
    }

    @Override
    public int deleteByPrimaryKey(Integer integer) {
        return userMapper.deleteByPrimaryKey(integer);
    }

    @Override
    public List<User> testGetTenUsers() {
        List<User> testResult = new ArrayList<>();
        for (int i = 1; i < 10; i++) {
            testResult.add(userMapper.selectByPrimaryKey(i));
        }

        return testResult;
    }

    @Override
    public User getUserByPhone(String phone) {
        return userMapper.selectByPhone(phone);
    }

    @Override
    public String getLatlng(String address) {
        return address;
    }
}
