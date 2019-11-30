package edu.oregonstate.fluffyhome.service;

import edu.oregonstate.fluffyhome.model.UserPet;

import java.util.List;

/**
 * @author: Chendi Zhang
 * @date: 2019-11-29
 * @description:
 **/

public interface UserPetService extends BaseObjectService<UserPet, Integer> {
    List<UserPet> getUserPets(int userid);
}
