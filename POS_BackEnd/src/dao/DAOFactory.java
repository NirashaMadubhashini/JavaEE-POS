package dao;


import dao.custom.impl.CustomerDAOImpl;
import dao.custom.impl.ItemDAOImpl;
import dao.custom.impl.OrderDAOImpl;
import dao.custom.impl.OrderDetailsDAOImpl;

public class DAOFactory {

    private static DAOFactory daoFactory;

    private DAOFactory() {

    }

    public static DAOFactory getDaoFactory() {
        if (daoFactory == null) {
            daoFactory = new DAOFactory();
        }
        return daoFactory;
    }

    public SuperDAO getDAO(DAOTypes types){

        switch (types){
            case ITEM:
                return new ItemDAOImpl();
            case CUSTOMER:
                return new CustomerDAOImpl();
            case ORDERS:
                return new OrderDAOImpl();
            case ORDERDETAILS:
                return new OrderDetailsDAOImpl();
            default:
                return null;
        }

    }

    public enum DAOTypes{
        CUSTOMER, ITEM, ORDERS, ORDERDETAILS
    }
}