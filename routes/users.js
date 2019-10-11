const User = require('../models/user');
import { responseClient, md5 } from '../util/util.js';

exports.login = (req, res) => {
  const { phone, password } = req.body;
  const reg =/^1[34578]\d{9}$/
  if (!phone) {
    responseClient(res, 200, 400, 'email cannot be empty');
    return;
  }else if(!reg.test(phone)){
    responseClient(res, 200, 400, 'please enter right phone number');
    return;
  }
  if (!password) {
    responseClient(res, 200, 400, 'password cannot be empty');
    return;
  }
  User.findOne({
    phone,
    password: md5(password),
  })
      .then(userInfo => {
        console.log(userInfo._id)
        if (userInfo) {
          //setting the session after login successfully
          req.session.userInfo = userInfo;
          responseClient(res, 200, 200, 'login success', null);
        } else {
          responseClient(res, 200, 402, 'username or password wrong');
        }
      })
      .catch(err => {
        responseClient(res);
      });
};

//verify user information (get user info)
exports.userInfo = (req, res) => {
  if (req.session.userInfo) {
    responseClient(res, 200, 200, '', req.session.userInfo);
  } else {
    responseClient(res, 200, 403, 'please login again', req.session.userInfo);
  }
};

exports.logout = (req, res) => {
  console.log(req.session)
  if (req.session.userInfo) {
    req.session.userInfo = null; // delete session
    responseClient(res, 200, 200, 'log out success！！');
  } else {
    responseClient(res, 200, 402, 'you have not login yet ！！！');
  }
};

exports.register = (req, res) => {
  const { name, password, phone, type,email } = req.body;
  const regPhone =/^1[34578]\d{9}$/
  const regEmail = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
  if (!phone) {
    responseClient(res, 200, 400, 'user phone number can not be empty');
    return;
  }else if(!regPhone.test(phone)){
    responseClient(res, 200, 400, 'please enter the right phone number');
    return;
  }
  if (!name) {
    responseClient(res, 200, 400, 'user name cannot be empty');
    return;
  }
  if (!email) {
    responseClient(res, 200, 400, 'email cannot be empty');
    return;
  }else if(!regEmail.test(email)){
    responseClient(res, 200, 400, 'please enter the right email format');
    return;
  }
  if (!password) {
    responseClient(res, 200, 400, 'password cannot be empty');
    return;
  }
  //verify if the user already in the database
  User.findOne({ phone })
      .then(data => {
        if (data) {
          responseClient(res, 200, 402, 'phone number already exist');
          return;
        }
        //save to the database
        let user = new User({
          name,
          password: md5(password),
          phone,
          type,
          email
        });
        user.save().then(data => {
          responseClient(res, 200, 200, 'singe up success', data);
        });
      })
      .catch(err => {
        responseClient(res);
        return;
      });
};

exports.delUser = (req, res) => {
  let { id } = req.body;
  User.deleteMany({ _id: id })
      .then(result => {
        if (result.n === 1) {
          responseClient(res, 200, 0, 'successfully delete account!');
        } else {
          responseClient(res, 200, 1, 'user does not exist');
        }
      })
      .catch(err => {
        responseClient(res);
      });
};