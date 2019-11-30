package edu.oregonstate.fluffyhome.mapper;

import edu.oregonstate.fluffyhome.model.UserPet;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface UserPetMapper {
    int deleteByPrimaryKey(Integer petid);

    int insert(UserPet record);

    int insertSelective(UserPet record);

    UserPet selectByPrimaryKey(Integer petid);

    int updateByPrimaryKeySelective(UserPet record);

    int updateByPrimaryKey(UserPet record);

    List<UserPet> getUserPets(int userid);
}