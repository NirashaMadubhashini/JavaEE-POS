package bo.custom.impl;

import bo.custom.ItemBO;
import dao.DAOFactory;
import dao.custom.ItemDAO;
import dto.ItemDTO;
import entity.Item;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;

import java.sql.Connection;
import java.sql.SQLException;

public class ItemBOImpl implements ItemBO {
    private final ItemDAO itemDAO = (ItemDAO) DAOFactory.getDaoFactory().getDAO(DAOFactory.DAOTypes.ITEM);

    @Override
    public boolean addItem(Connection connection, ItemDTO itemDTO) throws SQLException, ClassNotFoundException {
        Item item = new Item(
                itemDTO.getItemCode(),itemDTO.getItemName(),itemDTO.getQtyOnHand(),itemDTO.getUnitPrice()

        );
        return itemDAO.add(item,connection);
    }

    @Override
    public ObservableList<ItemDTO> getAllItem(Connection connection) throws SQLException, ClassNotFoundException {
        ObservableList<Item> items = itemDAO.getAll(connection);

        ObservableList<ItemDTO> obList = FXCollections.observableArrayList();

        for (Item temp : items) {
            ItemDTO itemDTO = new ItemDTO(
                    temp.getItemCode(),temp.getName(),temp.getQtyOnHand(),temp.getPrice()
            );

            obList.add(itemDTO);
        }
        return obList;
    }

    @Override
    public ItemDTO searchItem(String itemCode, Connection connection) throws SQLException, ClassNotFoundException {
        Item item = itemDAO.search(itemCode, connection);

        ItemDTO itemDTO = new ItemDTO(
                item.getItemCode(),item.getName(),item.getQtyOnHand(),item.getPrice()
        );
        return itemDTO;
    }

    @Override
    public boolean deleteItem(Connection connection, String itemCode) throws SQLException, ClassNotFoundException {
        return itemDAO.delete(itemCode, connection);
    }

    @Override
    public boolean updateItem(Connection connection, ItemDTO itemDTO) throws SQLException, ClassNotFoundException {
        Item item = new Item(
                itemDTO.getItemCode(),itemDTO.getItemName(),itemDTO.getQtyOnHand(),itemDTO.getUnitPrice()

        );
        return itemDAO.update(item,connection);
    }
}