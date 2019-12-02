package edu.oregonstate.fluffyhome.controller;

import edu.oregonstate.fluffyhome.model.UserPet;
import edu.oregonstate.fluffyhome.service.UserPetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * @author: Chendi Zhang
 * @date: 2019-11-29
 * @description:
 **/

@RestController
@RequestMapping("/userPet")
@CrossOrigin(origins = "*")
public class UserPetController {
    private final UserPetService userPetService;

    @Autowired
    public UserPetController(UserPetService userPetService) {
        this.userPetService = userPetService;
    }

    @RequestMapping("/addPet")
    public boolean addPet(int userid, String petType, String petName, String petInfo) {
        UserPet userPet = new UserPet();
        userPet.setPetname(petName);
        userPet.setUserid(userid);
        userPet.setPetinfo(petInfo);
        userPet.setPettype(petType);

        try {

            return userPetService.insert(userPet) == 1;
        } catch (Exception e) {
            return false;
        }
    }

    @RequestMapping("/editPetInfo")
    public boolean editPetInfo(int petid, String petType, String petName, String petInfo) {
        UserPet userPet = new UserPet();
        userPet.setPetid(petid);
        userPet.setPetname(petName);
        userPet.setPetinfo(petInfo);
        userPet.setPettype(petType);

        try {

            return userPetService.updateByPrimaryKey(userPet) == 1;
        } catch (Exception e) {
            return false;
        }
    }

    @RequestMapping("/getPetInfoById")
    public UserPet getPetById(int petid) {
        try {
            return userPetService.selectByPrimaryKey(petid);
        } catch (Exception e) {
            return null;
        }
    }


    @RequestMapping("/getUserPets")
    public List<UserPet> getUserPets(int userid) {
        try {
            return userPetService.getUserPets(userid);
        } catch (Exception e) {
            return null;
        }
    }

}
