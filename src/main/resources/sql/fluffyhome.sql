
------------------------------------
DROP TABLE IF EXISTS `order_request`
DROP TABLE IF EXISTS `user_order`;
DROP TABLE IF EXISTS `order`;
DROP TABLE IF EXISTS `user_pet`;
DROP TABLE IF EXISTS `user`;


create table `order`
(
  orderId          int(20) auto_increment
    primary key,
  status           varchar(255)         not null,
  orderType        tinyint(1) default 0 null,
  credits          int(20)              not null,
  address          varchar(255)         not null,
  zip              int(255)             not null,
  latlng           varchar(255)         not null,
  startDate        timestamp            not null,
  endDate          timestamp            not null,
  orderDescription varchar(255)         null
);

create table user
(
  userId           int(20) auto_increment
    primary key,
  userName         varchar(40)  not null,
  password         varchar(255) not null,
  phone            varchar(255) not null,
  credits          int(20)      not null,
  address          varchar(255) not null,
  zip              int(255)     not null,
  latlng           varchar(255) not null,
  email            varchar(255) not null,
  rateNumber       int(20)      not null,
  averageRate      float(7, 2)  not null,
  userType         varchar(255) not null,
  avaliableDate    varchar(255) null,
  avaliableWeekday varchar(255) null,
  constraint phone
    unique (phone)
);

create table user_order
(
  userId    int(20)              not null,
  orderId   int(20)              not null,
  rateFlag  tinyint(1) default 0 null,
  makerType tinyint(1) default 1 null,
  rate      float(7, 2)          null,
  primary key (orderId, userId),
  constraint fk_uoId
    foreign key (orderId) references `order` (orderId),
  constraint fk_uouId
    foreign key (userId) references user (userId)
);

create table user_pet
(
  userId  int(20)      not null,
  petId   int(20) auto_increment
    primary key,
  petType varchar(255) not null,
  petName varchar(255) not null,
  petInfo varchar(255) not null,
  constraint fk_uId
    foreign key (userId) references user (userId)
);

create table order_request
(
  fuId int(20)      not null,
  tuId int(20)      not null,
  orderId int (20)  not null,
  status varchar(255)  not null,
  expire timestamp  not null,
  primary key (tuId, orderId),
  constraint fk_fuId
    foreign key (fuId) references user (userId),
  constraint fk_tuId
    foreign key (tuId) references user (userId),
  constraint fk_roId
    foreign key (orderId) references  `order` (orderId)
)

