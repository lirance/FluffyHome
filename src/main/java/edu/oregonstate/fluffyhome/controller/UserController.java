package edu.oregonstate.fluffyhome.controller;

import com.alibaba.fastjson.JSON;
import edu.oregonstate.fluffyhome.model.User;
import edu.oregonstate.fluffyhome.model.UserType;
import edu.oregonstate.fluffyhome.model.WeekDayAva;
import edu.oregonstate.fluffyhome.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * @author: Chendi Zhang
 * @date: 2019-10-24
 * @description:
 **/

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "*")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @RequestMapping("/login")
    public boolean logIn(String phone, String password) {

        try {
            User user = userService.getUserByPhone(phone);
            password = String.valueOf(password.hashCode());
            return password.equals(user.getPassword());

        } catch (Exception e) {
            return false;
        }
    }

    @RequestMapping("/login/getId")
    public User logInGetId(String phone, String password) {

        try {
            User user = userService.getUserByPhone(phone);
            // hash password
            password = String.valueOf(password.hashCode());
            return password.equals(user.getPassword()) ? user : null;
        } catch (Exception e) {
            return null;
        }
    }

    @RequestMapping("/register")
    public boolean register(String username, String password, String phone, String address, int zip, String email, Boolean userType) {

        User user = new User();
        user.setUsername(username);
        // hash password
        user.setPassword(String.valueOf(password.hashCode()));
        user.setPhone(phone);
        user.setAddress(address);
        user.setZip(zip);
        user.setEmail(email);
        String ut = UserType.NORMAL.toString();
        if (userType) {
            ut = UserType.SITTER.toString();
        }
        user.setUserType(ut);
        user.setAverageRate((float) 0);
        user.setLatlng(userService.getLatlng(address));

        try {
            return userService.insert(user) == 1;
        } catch (Exception e) {
            return false;
        }

    }

    @RequestMapping("/registerU")
    public boolean register1(User user) {

        try {
            return userService.insert(user) == 1;
        } catch (Exception e) {
            return false;
        }

    }

    @RequestMapping("/getUserById")
    public User getUserById(int userid) {
        return userService.selectByPrimaryKey(userid);
    }

    @RequestMapping("/editProfile")
    public boolean editProfile(String username, String phone, String address, int userid, int zip, String email, String avaliableWeekday) {
        try {
            User user = userService.selectByPrimaryKey(userid);

            user.setUsername(username);
            user.setAddress(address);
            user.setPhone(phone);
            user.setAvaliableWeekday(JSON.parseObject(avaliableWeekday, WeekDayAva.class));
            user.setZip(zip);
            user.setLatlng(userService.getLatlng(address));
            user.setEmail(email);

            return userService.updateByPrimaryKey(user) == 1;
        } catch (Exception e) {
            return false;
        }
    }

    @RequestMapping("/getUserByPhone")
    public User getUserByPhone(String phone) {
        return userService.getUserByPhone(phone);
    }

    @RequestMapping("/getP2PSitters")
    public List<User> getp2pSitters(int userid) {
        return userService.getSitters(userid, false);
    }

    @RequestMapping("/getSitters")
    public List<User> getSitters() {
        return userService.getSitters(-1, true);
    }
}
