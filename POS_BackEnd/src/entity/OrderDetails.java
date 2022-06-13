package entity;


public class OrderDetails {

    private String iCode;
    private String oId;
    private int qty;
    private double price;

    public OrderDetails() {
    }

    public OrderDetails(String iCode, String oId, int qty, double price) {
        this.iCode = iCode;
        this.oId = oId;
        this.qty = qty;
        this.price = price;
    }

    public String getiCode() {
        return iCode;
    }

    public void setiCode(String iCode) {
        this.iCode = iCode;
    }

    public String getoId() {
        return oId;
    }

    public void setoId(String oId) {
        this.oId = oId;
    }

    public int getQty() {
        return qty;
    }

    public void setQty(int qty) {
        this.qty = qty;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }
}