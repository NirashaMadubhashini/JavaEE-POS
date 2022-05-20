package dto;

public class OrderDetailsDTO {

    private String oId;
    private String iCode;
    private double oQty;
    private double price;

    public OrderDetailsDTO() {
    }

    public OrderDetailsDTO(String oId, String iCode, double oQty, double price) {
        this.oId = oId;
        this.iCode = iCode;
        this.oQty = oQty;
        this.price = price;
    }

    public String getoId() {
        return oId;
    }

    public void setoId(String oId) {
        this.oId = oId;
    }

    public String getiCode() {
        return iCode;
    }

    public void setiCode(String iCode) {
        this.iCode = iCode;
    }

    public double getoQty() {
        return oQty;
    }

    public void setoQty(double oQty) {
        this.oQty = oQty;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    @Override
    public String toString() {
        return "OrderDetailsDTO{" +
                "oId='" + oId + '\'' +
                ", iCode='" + iCode + '\'' +
                ", oQty=" + oQty +
                ", price=" + price +
                '}';
    }
}
