package edu.oregonstate.fluffyhome.service;

/**
 * @author: Chendi Zhang
 * @date: 9/27/19
 * @description:
 */

public interface BaseObjectService<Object, ObjectKey> {

    int insert(Object record);

    Object selectByPrimaryKey(ObjectKey objectKey);

    int updateByPrimaryKey(Object object);

    int deleteByPrimaryKey(ObjectKey objectKey);
}
