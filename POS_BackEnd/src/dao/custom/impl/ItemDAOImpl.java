package dao.custom.impl;

import dao.CrudUtil;
import dao.custom.ItemDAO;
import entity.Item;

import javax.json.*;
import java.sql.ResultSet;
import java.sql.SQLException;

public class ItemDAOImpl implements ItemDAO {
    @Override
    public JsonArray getAll() throws SQLException, ClassNotFoundException {
        ResultSet rst = CrudUtil.executeQuery("SELECT * FROM Item");
        JsonArrayBuilder itemArray = Json.createArrayBuilder();

        while (rst.next()) {
            Item item = new Item(rst.getString(1), rst.getString(2), rst.getDouble(3), rst.getInt(4));
            JsonObjectBuilder itemObj = Json.createObjectBuilder();
            itemObj.add("code", item.getCode());
            itemObj.add("name", item.getName());
            itemObj.add("unitPrice", item.getUnitPrice());
            itemObj.add("qty", item.getQty());
            itemArray.add(itemObj.build());
        }
        return itemArray.build();
    }

    @Override
    public boolean add(Item item) throws SQLException, ClassNotFoundException {
        return CrudUtil.executeUpdate("INSERT INTO Item VALUES (?,?,?,?)", item.getCode(), item.getName(), item.getUnitPrice(), item.getQty());
    }

    @Override
    public boolean update(Item item) throws SQLException, ClassNotFoundException {
        return CrudUtil.executeUpdate("UPDATE Item SET name=?,unitPrice=?,qtyOnHand=? WHERE code=?", item.getName(), item.getUnitPrice(), item.getQty(), item.getCode());
    }

    @Override
    public boolean delete(String code) throws SQLException, ClassNotFoundException {
        return CrudUtil.executeUpdate("DELETE FROM Item WHERE code=?", code);
    }

    @Override
    public Item search(String code) throws SQLException, ClassNotFoundException {
        ResultSet rst = CrudUtil.executeQuery("SELECT * FROM Item WHERE code=?", code);
        Item item = null;
        while (rst.next()) {
            item = new Item(rst.getString(1), rst.getString(2), rst.getDouble(3), rst.getInt(4));
        }
        return item;
    }
    @Override
    public boolean updateQty(int qty, String code) throws SQLException, ClassNotFoundException {
        return CrudUtil.executeUpdate("UPDATE Item SET qtyOnHand=(qtyOnHand-" + qty + ") WHERE code='" + code + "'");
    }
}

