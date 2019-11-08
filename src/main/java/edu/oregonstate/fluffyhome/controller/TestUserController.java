package edu.oregonstate.fluffyhome.controller;

import edu.oregonstate.fluffyhome.model.User;
import edu.oregonstate.fluffyhome.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * @author: Chendi Zhang
 * @date: 2019-10-17
 * @description:
 **/
@CrossOrigin(origins = "*")
@RestController
public class TestUserController {

    private final UserService testUserService;

    @Autowired
    public TestUserController(UserService testUserService) {
        this.testUserService = testUserService;
    }

    @RequestMapping("list")
    public List<User> list() {
        return testUserService.testGetTenUsers();
    }
}
