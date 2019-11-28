package edu.oregonstate.fluffyhome.handler;

import com.alibaba.fastjson.JSON;
import edu.oregonstate.fluffyhome.model.WeekDayAva;
import org.apache.ibatis.type.JdbcType;
import org.apache.ibatis.type.MappedJdbcTypes;
import org.apache.ibatis.type.MappedTypes;
import org.apache.ibatis.type.TypeHandler;

import java.sql.*;

/**
 * @author: Chendi Zhang
 * @date: 2019-11-27
 * @description:
 **/

@MappedJdbcTypes({JdbcType.VARCHAR})
@MappedTypes({edu.oregonstate.fluffyhome.model.WeekDayAva.class})
public class WeekDayAvaHandler implements TypeHandler {


    @Override
    public void setParameter(PreparedStatement ps, int i, Object parameter, JdbcType jdbcType) throws SQLException {
        if (parameter == null) {
            ps.setNull(i, Types.VARCHAR);

        } else {
            ps.setString(i, JSON.toJSONString(parameter));
        }

    }

    @Override
    public Object getResult(ResultSet rs, String columnName) throws SQLException {
        String value = rs.getString(columnName);
        return JSON.parseObject(value, WeekDayAva.class);
    }

    @Override
    public Object getResult(ResultSet rs, int columnIndex) throws SQLException {
        String value = rs.getString(columnIndex);
        return JSON.parseObject(value, WeekDayAva.class);
    }

    @Override
    public Object getResult(CallableStatement cs, int columnIndex) throws SQLException {
        String value = cs.getString(columnIndex);
        return JSON.parseObject(value, WeekDayAva.class);
    }
}
