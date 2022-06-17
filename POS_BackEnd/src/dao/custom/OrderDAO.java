package dao.custom;

import dao.CrudDAO;
import entity.Orders;

import java.sql.Connection;
import java.sql.SQLException;

public interface OrderDAO extends CrudDAO<Orders, String, Connection> {
    boolean ifOrderExist(String oid, Connection connection) throws SQLException, ClassNotFoundException;

    String generateNewOrderId(Connection connection) throws SQLException, ClassNotFoundException;
}
