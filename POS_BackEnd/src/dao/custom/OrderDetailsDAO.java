package dao.custom;

import dao.CrudDAO;
import entity.OrderDetails;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.ArrayList;

public interface OrderDetailsDAO extends CrudDAO<OrderDetails, String, Connection> {
    ArrayList<OrderDetails> searchOrderDetail(String id, Connection connection) throws SQLException, ClassNotFoundException;
}
