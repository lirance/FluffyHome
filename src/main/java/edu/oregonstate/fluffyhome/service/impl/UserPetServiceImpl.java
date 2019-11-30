package edu.oregonstate.fluffyhome.service.impl;

import edu.oregonstate.fluffyhome.mapper.UserPetMapper;
import edu.oregonstate.fluffyhome.model.UserPet;
import edu.oregonstate.fluffyhome.service.UserPetService;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author: Chendi Zhang
 * @date: 2019-11-29
 * @description:
 **/

@Service
public class UserPetServiceImpl implements UserPetService {

    private final UserPetMapper userPetMapper;

    public UserPetServiceImpl(UserPetMapper userPetMapper) {
        this.userPetMapper = userPetMapper;
    }

    @Override
    public int insert(UserPet record) {
        return userPetMapper.insert(record);
    }

    @Override
    public UserPet selectByPrimaryKey(Integer integer) {
        return userPetMapper.selectByPrimaryKey(integer);
    }

    @Override
    public int updateByPrimaryKey(UserPet object) {
        return userPetMapper.updateByPrimaryKey(object);
    }

    @Override
    public int deleteByPrimaryKey(Integer integer) {
        return userPetMapper.deleteByPrimaryKey(integer);
    }

    @Override
    public List<UserPet> getUserPets(int userid) {
        return userPetMapper.getUserPets(userid);
    }
}
