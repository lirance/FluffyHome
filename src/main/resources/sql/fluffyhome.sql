
------------------------------------

DROP TABLE IF EXISTS `user_order`;
DROP TABLE IF EXISTS `order`;
DROP TABLE IF EXISTS `user_pet`;
DROP TABLE IF EXISTS `user`;


------------------------------------
--user table
CREATE TABLE `user` (
  `userId` int(20) NOT NULL AUTO_INCREMENT,
  `userName` varchar(40) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL unique ,
  `credits` int(20) NOT NULL,
  `address` varchar(255) NOT NULL,
  `zip` int(255) NOT NULL ,
  `latlng` varchar (255) NOT NULL,
  `email`  varchar (255) NOT NULL ,
  `rateNumber` int(20) NOT NULL ,
  `averageRate` float (7,2) NOT NULL ,
  `userType` varchar (255) NOT NULL ,
  `avaliableDate` varchar (255),
  `avaliableWeekday` varchar (255),
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--------------------------------------
--user_pet table
CREATE TABLE `user_pet` (
  `userId` int(20) NOT NULL ,
  `petId` int (20) NOT NULL AUTO_INCREMENT,
  `petType` varchar (255) NOT NULL ,
  `petName` varchar (255) NOT NULL ,
  `petInfo` varchar (255) NOT NULL,
  PRIMARY KEY (`petId`),
  FOREIGN KEY fk_uId(userId) REFERENCES `user`(userId)
)ENGINE=InnoDB  DEFAULT CHARSET=utf8;


------------------------------------
--order table

CREATE TABLE `order` (
  `orderId` int(20) NOT NULL AUTO_INCREMENT,
  `petId` int(20) NOT NULL ,
  `destination` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `orderType` boolean DEFAULT 0,
  `credits` int(20) NOT NULL ,
  `address` varchar(255) NOT NULL,
  `zip` int(255) NOT NULL ,
  `latlng` varchar (255) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  PRIMARY KEY (`orderId`),
  FOREIGN KEY fk_pId(petId) REFERENCES `user_pet`(petId)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

-------------------------------------
--user_order table

CREATE TABLE `user_order` (
  `userId` int(20) NOT NULL,
  `orderId` int(20) NOT NULL,
  `rateFlag` boolean DEFAULT 0,
  `makerType` boolean DEFAULT 1,
  `rate`  float (7,2),
  CONSTRAINT PK_UO PRIMARY KEY (`orderId`,`userId`),
  FOREIGN KEY fk_uoId(orderId) REFERENCES `order`(orderId),
  FOREIGN KEY fk_uouId(userId) REFERENCES `user`(userId)
)ENGINE=InnoDB  DEFAULT CHARSET=utf8;


