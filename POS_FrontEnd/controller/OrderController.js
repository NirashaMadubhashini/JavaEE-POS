function generateOrderID() {
    $("#txtOrderId").val("O00-0001");
    $.ajax({
        url: "http://localhost:8080/backEnd/order",
        method: "GET",
        success: function (resp) {
            for (const orders of resp.data){
                let orderId = orders.orderId;
                let tempId = parseInt(orderId.split("-")[1]);
                tempId = tempId+1;
                if (tempId <= 9){
                    $("#txtOrderId").val("O00-000"+tempId);
                }else if (tempId <= 99) {
                    $("#txtOrderId").val("O00-00" + tempId);
                }else if (tempId <= 999){
                    $("#txtOrderId").val("O00-0" + tempId);
                }else {
                    $("#txtOrderId").val("O00-"+tempId);
                }

            }

        }
    });
}

generateOrderID();

function setCurrentDate() {
    let orderDate = $('#txtOrderDate');
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;
    orderDate.val(today);
}

setCurrentDate();

function loadItemComboBoxData() {
    $("#selectItemCode").empty();
    $("#selectItemCode").append($("<option></option>").attr("value", 0).text("Select Item"));
    console.log("Enter")
    let count = 0;
    $.ajax({
        url: "http://localhost:8080/backEnd/item?option=GETALL",
        method: "GET",
        success: function (res) {
            console.log(res);
            for (const item of res.data) {
                $("#selectItemCode").append($("<option></option>").attr("value", count).text(item.itemCode));
                count++;
            }
        },
        error: function (ob, textStatus, error) {
            alert(textStatus);
        }
    });

}

function loadCustomerComboBoxData() {
    $("#selectCusID").empty();
    $("#selectCusID").append($("<option></option>").attr("value", 0).text("Select Customer"));
    console.log("Enter")
    let count = 0;
    $.ajax({
        url: "http://localhost:8080/backEnd/customer?option=GETALL",
        method: "GET",
        success: function (res) {
            console.log(res);
            for (const customer of res.data) {
                $("#selectCusID").append($("<option></option>").attr("value", count).text(customer.id));
                count++;
            }
        },
        error: function (ob, textStatus, error) {
            alert(textStatus);
        }
    });
}

$("#selectCusID").click(function () {

    let id = $("#selectCusID option:selected").text();
    let name = $("#txtCusName").val();
    let address = $("#txtAddress").val();
    let contact = $("#txtContact").val();


    $.ajax({
        url: "http://localhost:8080/backEnd/customer?option=GETALL",
        method: "GET",
        success: function (resp) {
            for (const customer of resp.data) {

                if (customer.id == id) {

                    name = customer.name;
                    address = customer.address;
                    contact = customer.contact;

                    $("#txtCusName").val(name);
                    $("#txtAddress").val(address);
                    $("#txtContact").val(contact);
                }

            }
        }
    });


});


$("#selectItemCode").click(function () {

    let id = $("#selectItemCode option:selected").text();
    let name = $("#txtItemName").val();
    let qtyOnHand = $("#txt-qtyOnHand").val();
    let price = $("#txtUnitPrice").val();

    $.ajax({
        url: "http://localhost:8080/backEnd/item?option=GETALL",
        method: "GET",
        success: function (resp) {
            for (const item of resp.data) {
                if (item.itemCode == id) {

                    name = item.name;
                    qtyOnHand = item.qtyOnHand;
                    price = item.price;

                    $("#txtItemName").val(name);
                    $("#txt-qtyOnHand").val(qtyOnHand);
                    $("#txtUnitPrice").val(price);
                }
            }
        }
    });

});

var tableRow;

$("#btnAddToCart").click(function () {


    if ($("#txtOrderCusName").val() == '') {
        alert("Please Select Customer");
    } else if ($("#txtOrderItemName").val() == '') {
        alert("Please Select Item");
    } else if ($("#txtQty").val() == '') {
        alert("Please Enter Quantity");
    } else {

        let duplicate = false;

        for (let i = 0; i < $("#addToCartTable tr").length; i++) {
            if ($("#txtOrderItemCode option:selected").text() == $("#addToCartTable tr").children(':nth-child(1)')[i].innerText) {
                duplicate = true;
            }
        }

        if (duplicate != true) {
            loadOrderDetail();
            minusQty($("#txtQty").val());
            manageTotal($("#txtQty").val() * $("#txtOrderItemPrice").val());
            manageDiscount();
            itemTextFieldClear();
            // setButton();

        } else if (duplicate == true) {
            manageQuantity(tableRow.children(':nth-child(4)').text(), $("#txtQty").val());
            $(tableRow).children(':nth-child(4)').text($("#txtQty").val());

            updateManageTotal(tableRow.children(':nth-child(5)').text(), $("#txtQty").val() * $("#txtOrderItemPrice").val());
            $(tableRow).children(':nth-child(5)').text($("#txtQty").val() * $("#txtOrderItemPrice").val());
        }

        $("#addToCartTable>tr").click('click', function () {

            tableRow = $(this);
            let itemCode = $(this).children(":eq(0)").text();
            let itemName = $(this).children(":eq(1)").text();
            let unitPrice = $(this).children(":eq(2)").text();
            let qty = $(this).children(":eq(3)").text();
            let total = $(this).children(":eq(4)").text();

            $.ajax({
                url: "http://localhost:8080/backEnd/item?option=SEARCH&itemCode=" + itemCode,
                method: "GET",
                success: function (resp) {
                    for (const item of resp.data) {
                        let avQty = item.qtyOnHand;
                        avQty = avQty - qty;
                        $("#txtOrderItemQtyOnHand").val(avQty);
                    }
                }
            });

            $("#txtOrderItemCode option:selected").text(itemCode);
            $("#txtOrderItemName").val(itemName);
            $("#txtOrderItemPrice").val(unitPrice);
            $("#txtQty").val(qty);

        });
    }

});

var itemCode;
var itemName;
var itemPrice;
var itemQtyOnHand;
var itemOrderQty;

$("#addToCartTable").empty();

function loadOrderDetail() {

    itemCode = $("#txtOrderItemCode option:selected").text();
    itemName = $("#txtOrderItemName").val();
    itemPrice = $("#txtOrderItemPrice").val();
    itemQtyOnHand = $("#txtOrderItemQtyOnHand").val();
    itemOrderQty = $("#txtQty").val();

    let total = itemPrice * itemOrderQty;

    $("#addToCartTable").append("<tr>" +
        "<td>" + itemCode + "</td>" +
        "<td>" + itemName + "</td>" +
        "<td>" + itemPrice + "</td>" +
        "<td>" + itemOrderQty + "</td>" +
        "<td>" + total + "</td>" +
        "</tr>");

    manageDiscount();
}

function minusQty(orderQty) {
    var minusQty = parseInt(orderQty);
    var manageQty = parseInt($("#txtOrderItemQtyOnHand").val());

    manageQty = manageQty - minusQty;

    $("#txtOrderItemQtyOnHand").val(manageQty);
}

var total = 0;

function manageTotal(amount) {
    total += amount;
    $("#total").text(total);

    manageDiscount();
}

function updateManageTotal(prvTotal, nowTotal) {
    total -= prvTotal;
    total += nowTotal;

    $("#total").text(total);

    manageDiscount();
}

function manageQuantity(prevQty, nowQty) {
    var prevQty = parseInt(prevQty);
    var nowQty = parseInt(nowQty);
    var availableQty = parseInt($("#txtOrderItemQtyOnHand").val());

    availableQty += prevQty;
    availableQty -= nowQty;

    $("#txtOrderItemQtyOnHand").val(availableQty);
}

function manageDiscount() {
    var net = $("#total").text();
    var discount = 0;

    if (net > 500 && net < 999) {
        discount = 2;
        $("#txtDiscount").val(discount);
    } else if (net > 1000 && net < 2999) {
        discount = 4;
        $("#txtDiscount").val(discount);
    } else if (net > 3000 && net < 4999) {
        discount = 5;
        $("#txtDiscount").val(discount);
    } else if (net > 5000 && net < 9999) {
        discount = 8;
        $("#txtDiscount").val(discount);
    } else if (net > 10000) {
        discount = 10;
        $("#txtDiscount").val(discount);
    }

    var subTotal = (net * discount) / 100;
    subTotal = net - subTotal;
    $("#subtotal").text(subTotal);


}

// $("#btnSubmitOrder").click(function () {
//
//     let data;
//
//     if ($("#txtCash").val() == '') {
//         alert("Please Enter Cash");
//     }else {
//
//         $.ajax({
//             url: "orders",
//             method: "GET",
//             data: data,
//         });
//
//         manageBalance();
//         itemTextFieldClear();
//         customerTextFieldClear();
//         $("#addToCartTable").empty();
//
//     }
// });

function manageBalance() {
    let balance = 0;
    let subtotal = $("#subtotal").text();
    let cash = $("#txtCash").val();

    balance = cash - subtotal;

    $("#txtBalance").val(balance);
}

function itemTextFieldClear() {
    loadItemComboBoxData();
    $("#txtOrderItemQtyOnHand").val("");
    $("#txtOrderItemPrice").val("");
    $("#txtOrderItemName").val("");
    $("#txtQty").val("");
}

function customerTextFieldClear() {
    loadCustomerComboBoxData();
    $("#txtOrderCusName").val("");
    $("#txtOrderCusContact").val("");
    $("#txtOrderCusAddress").val("");
}



