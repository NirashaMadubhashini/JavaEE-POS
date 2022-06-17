package dao.custom.impl;

import dao.CrudUtil;
import dao.custom.OrderDAO;
import entity.Orders;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;

public class OrderDAOImpl implements OrderDAO {
    @Override
    public boolean add(Orders orders, Connection connection) throws SQLException, ClassNotFoundException {
        return CrudUtil.executeUpdate(connection,"INSERT INTO Orders VALUES (?,?,?,?,?,?)",orders.getOrderId(),
                orders.getcId(), orders.getOrderDate(), orders.getTotal(), orders.getDiscount(),
                orders.getSubTotal());
    }

    @Override
    public boolean delete(String s, Connection connection) throws SQLException, ClassNotFoundException {
        return false;
    }

    @Override
    public boolean update(Orders orders, Connection connection) throws SQLException, ClassNotFoundException {
        return false;
    }

    @Override
    public Orders search(String s, Connection connection) throws SQLException, ClassNotFoundException {
        return null;
    }

    @Override
    public ObservableList<Orders> getAll(Connection connection) throws SQLException, ClassNotFoundException {
        ResultSet resultSet = CrudUtil.executeQuery(connection, "SELECT * FROM Orders");

        ObservableList<Orders> obList = FXCollections.observableArrayList();

        while (resultSet.next()) {
            Orders orders = new Orders(
                    resultSet.getString(1),
                    resultSet.getString(2),
                    resultSet.getDate(3),
                    resultSet.getDouble(4),
                    resultSet.getDouble(5),
                    resultSet.getDouble(6)
            );

            obList.add(orders);
        }

        return obList;
    }

    @Override
    public boolean ifOrderExist(String oid, Connection connection) throws SQLException, ClassNotFoundException {
        return false;
    }

    @Override
    public String generateNewOrderId(Connection connection) throws SQLException, ClassNotFoundException {
        ResultSet resultSet = CrudUtil.executeQuery(connection, "SELECT orderId FROM orders ORDER BY orderId DESC LIMIT 1");

        if (resultSet.next()){
            return resultSet.getString(1);
        }else {
            return null;
        }
    }

}
