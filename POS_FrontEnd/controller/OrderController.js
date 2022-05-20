// var cartTMDB = [];
//
// $('#txtOrderDate').val(new Date().toISOString().slice(0, 10));
// $('#txtTime').val(new ontimeupdate);
// $("#btnAddToCart").prop('disabled', true);
// $("#btnPay").prop('disabled', true);
//
// let regBuyItemQty = /^[0-9]{1,}$/;
//
// generateOId();
// loadOrderTable();
// loadOrderDetailTable();
//
// // Generate Order Id
// function generateOId() {
//     $.ajax({
//         url: "http://localhost:8080/backEnd/order?option=GENERATEORDERID",
//         method: "GET",
//         success: function (res) {
//             $("#txtOrderId").val(res.orderId);
//         }
//     })
// }
//
// // Add Listener method to customer id combo box for search customer details
// $("#selectCusID").change(function () {
//     var id = $("#selectCusID").find('option:selected').text();
//     $.ajax({
//         url: "http://localhost:8080/backEnd/customer?option=SEARCH&CusID=" + id,
//         method: "GET",
//         success: function (res) {
//             if (res.status == 200) {
//                 $("#txtCusName").val(res.name);
//                 $("#txtAddress").val(res.address);
//                 $("#txtSalary").val(res.salary);
//                 var code = $("#selectItemCode").find('option:selected').text();
//                 if (code != "-Select Item-" && $("#txt-qty").val() != '') {
//                     $("#btnAddToCart").prop('disabled', false);
//                 }
//             } else {
//                 $("#txtCusName").val("");
//                 $("#txtAddress").val("");
//                 $("#txtSalary").val("");
//                 $("#btnAddToCart").prop('disabled', true);
//             }
//         }
//     })
// });
//
// // Add Listener method to item code combo box for search item details
// $("#selectItemCode").change(function () {
//     var code = $("#selectItemCode").find('option:selected').text();
//     $.ajax({
//         url: "http://localhost:8080/backEnd/item?option=SEARCH&ItemCode=" + code,
//         method: "GET",
//         success: function (res) {
//             if (res.status == 200) {
//                 $("#txtItemName").val(res.name);
//                 $("#txtUnitPrice").val(res.unitPrice);
//                 let qtyOnHand = parseInt(res.qty);
//
//                 var changedTempQty = false;
//                 for (var j = 0; j < cartTMDB.length; j++) {
//                     if (cartTMDB[j].getICode() == code) {
//                         let cartQty = cartTMDB[j].getBuyQty();
//                         let tempQty = qtyOnHand - cartQty;
//                         $("#txt-qtyOnHand").val(tempQty);
//                         changedTempQty = true;
//                     }
//                 }
//
//                 if (changedTempQty == false) {
//                     $("#txt-qtyOnHand").val(res.qty);
//                 }
//
//                 var id = $("#selectCusID").find('option:selected').text();
//                 if (id != "-Select Customer-" && $("#txt-qty").val() != '') {
//                     $("#btnAddToCart").prop('disabled', false);
//                 }
//             }
//         }
//     })
// });
//
// // Add Validation for buy qty text field
// $("#txt-qty").on('keyup', function () {
//     addValidation();
// });
//
// // Add Validation to buy qty field and check if comboboxes are empty or not.
// function addValidation() {
//     var buyQty = $("#txt-qty").val();
//     if (regBuyItemQty.test(buyQty)) {
//         $("#txt-qty").css('border', '2px solid green');
//         var code = $("#selectItemCode").find('option:selected').text();
//         var id = $("#selectCusID").find('option:selected').text();
//         if (id != "-Select Customer-" && code != "-Select Item-") {
//             $("#btnAddToCart").prop('disabled', false);
//         }
//     } else {
//         $("#txt-qty").css('border', '2px solid red');
//         $("#btnAddToCart").prop('disabled', true);
//     }
// }
//
// // Add items to cart
// $("#btnAddToCart").click(function () {
//     var qtyOnHand = parseInt($("#txt-qtyOnHand").val());
//     var buyQty = parseInt($("#txt-qty").val());
//     if (buyQty <= qtyOnHand) {
//         addItemsToCart();
//         loadCartItemsToTable();
//         clearSelectItemFields();
//         calculateTotalAndNoOfItems();
//         $("#orderTable>tr").on('dblclick', function () {
//             var itemCode = $(this).children(":eq(0)").text();
//             for (var i = 0; i < cartTMDB.length; i++) {
//                 if (cartTMDB[i].getICode() == itemCode) {
//                     cartTMDB.splice(i, 1);
//                 }
//             }
//             loadCartItemsToTable();
//             calculateTotalAndNoOfItems();
//             clearSelectItemFields();
//         });
//
//     } else {
//         alert("Error!"+"Buy qty is incorrect.Please enter low quantity.")
//     }
// });
//
// function addItemsToCart() {
//     var itemCode = $("#cmbitemcode").find('option:selected').text();
//     var itemName = $("#txtpoiName").val();
//     var itemPrice = $("#txtitemPrice").val();
//     var qtyOnHand = parseInt($("#txtqtyOnHand").val());
//     var qty = $("#txtbuyQty").val();
//     var buyQty = parseInt(qty);
//     var unitPrice = parseFloat(itemPrice);
//     var total = buyQty * unitPrice;
//
//     var cart = new CartTM(itemCode, itemName, itemPrice, buyQty, total);
//
//     var found = false;
//
//     for (var i = 0; i < cartTMDB.length; i++) {
//         if (cartTMDB[i].getICode() == itemCode) {
//             var tempQty = parseInt(cartTMDB[i].getBuyQty()) + buyQty;
//             cartTMDB[i].setBuyQty(tempQty);
//             let itemTotal = tempQty * unitPrice;
//             cartTMDB[i].setItemTotal(itemTotal);
//             found = true;
//         }
//     }
//
//     if (found == false) {
//         cartTMDB.push(cart);
//     }
// }
//
// // load cart items to table
// function loadCartItemsToTable() {
//     $("#cartTable").empty();
//     for (var i = 0; i < cartTMDB.length; i++) {
//         let tableRow = `<tr><td>${cartTMDB[i].getICode()}</td><td>${cartTMDB[i].getIName()}</td><td>${cartTMDB[i].getItemPrice()}</td><td>${cartTMDB[i].getBuyQty()}</td><td>${cartTMDB[i].getItemTotal()}</td></tr>`;
//         $("#cartTable").append(tableRow);
//     }
// }
//
// // clear Selected Item Fields
// function clearSelectItemFields() {
//     $("#cmbitemcode").val("");
//     $("#txtpoiName").val("");
//     $("#txtitemPrice").val("");
//     $("#txtqtyOnHand").val("");
//     $("#txtbuyQty").val("");
//     $("#txtbuyQty").css('border', '1px solid #ced4da');
//     $("#btnAddToCart").prop('disabled', true);
// }
//
// // Calculate Total and No Of Items
// function calculateTotalAndNoOfItems() {
//     let ttl = 0;
//     for (var i = 0; i < cartTMDB.length; i++) {
//         ttl = ttl + cartTMDB[i].getItemTotal();
//     }
//     $("#txtTotal").val(ttl + "/=");
//     $("#txtBalance").val(ttl + "/=");
//     $("#txtNoOfItems").val(cartTMDB.length);
// }
//
// // Calculate Balance when Cash paid
// $("#txtCash").keyup(function (event) {
//     if (event.key == "Enter") {
//         let ttl = 0;
//         for (var i = 0; i < cartTMDB.length; i++) {
//             ttl = ttl + cartTMDB[i].getItemTotal();
//         }
//         let cash = parseInt($("#txtCash").val());
//         let balance = ttl - cash;
//         $("#txtBalance").val(balance + "/=");
//
//         var code = $("#cmbitemcode").find('option:selected').text();
//         var id = $("#cmbSelectCustomerId").find('option:selected').text();
//         if (id != "-Select Customer-" && cartTMDB.length != 0) {
//             $("#btnPlaceOrder").prop('disabled', false);
//         }
//     }
// });
//
// // Clear Selected item details fields
// $("#btnClearItemFields").click(function () {
//     clearSelectItemFields();
// });
//
// // Cancel Order
// $("#btnCancelOrder").click(function () {
//     clearPlaceOrderForm();
//     loadCartItemsToTable();
// });
//
// // Clear Place order form
// function clearPlaceOrderForm() {
//     $("#cmbSelectCustomerId").val("");
//     $("#txtpocName").val("");
//     $("#txtpocaddress").val("");
//     $("#txtpocsalary").val("");
//
//     $("#cmbitemcode").val("");
//     $("#txtpoiName").val("");
//     $("#txtitemPrice").val("");
//     $("#txtqtyOnHand").val("");
//     $("#txtbuyQty").val("");
//     $("#txtbuyQty").css('border', '1px solid #ced4da');
//
//     $("#txtTotal").val("");
//     $("#txtNoOfItems").val("");
//     $("#txtCash").val("");
//     $("#txtBalance").val("");
//
//     cartTMDB.splice(0, cartTMDB.length);
//
//     $("#btnAddToCart").prop('disabled', true);
//
//     $("#btnPlaceOrder").prop('disabled', true);
// }
//
// // Place Order
// $("#btnPlaceOrder").click(function () {
//     var orderDetails = [];
//     for (let i = 0; i < cartTMDB.length; i++) {
//         var od = {
//             itemCode: cartTMDB[i].getICode(),
//             itemName: cartTMDB[i].getIName(),
//             unitPrice: cartTMDB[i].getItemPrice(),
//             buyQty: cartTMDB[i].getBuyQty(),
//             total: cartTMDB[i].getItemTotal()
//         }
//         orderDetails.push(od);
//     }
//
//     var order = {
//         orderId: $("#txtOrderId").val(),
//         orderDate: $("#txtOrderDate").val(),
//         customerId: $("#cmbSelectCustomerId").find('option:selected').text(),
//         orderTotal: $("#txtTotal").val().split("/")[0],
//         orderDetails: orderDetails
//     }
//     $.ajax({
//         url: "http://localhost:8080/backEnd/order",
//         method: "POST",
//         data: JSON.stringify(order),
//         success: function (res) {
//             if (res.boolean==true){
//                 for (let i = 0; i < cartTMDB.length; i++) {
//                     manageItemQtyOnHand(cartTMDB[i].getICode(), cartTMDB[i].getBuyQty());
//                     cartTMDB.splice(i, 1);
//                 }
//                 clearPlaceOrderForm();
//                 loadCartItemsToTable();
//                 loadOrderTable();
//                 loadOrderDetailTable();
//                 generateOId();
//
//                 swal({
//                     title: "Success!",
//                     text: "Place Order Successfully",
//                     icon: "success",
//                     button: "Ok",
//                     timer: 2000
//                 });
//             }
//         }
//     })
//
// });
//
// // Manage Item Quantity
// function manageItemQtyOnHand(itemCode, buyQty) {
//     var data = {
//         code: itemCode,
//         qty: buyQty
//     }
//     $.ajax({
//         url: "http://localhost:8080/backEnd/order",
//         method: "PUT",
//         data: JSON.stringify(data),
//         success: function (res) {
//             console.log("Updated");
//         }
//     })
// }
//
// // Load Order Table
// function loadOrderTable() {
//
//     $("#orderTable").empty();
//     $.ajax({
//         url: "http://localhost:8080/backEnd/order?option=GETALLORDERS",
//         method: "GET",
//         success: function (res) {
//             for (let order of res) {
//                 let tableRow = `<tr><td>${order.orderId}</td><td>${order.orderDate}</td><td>${order.custId}</td><td>${order.total}</td></tr>`;
//                 $("#orderTable").append(tableRow);
//             }
//         }
//     })
// }
//
// // Load Order Details Table
// function loadOrderDetailTable() {
//     $("#orderDetailsTable").empty();
//     $.ajax({
//         url: "http://localhost:8080/backEnd/order?option=GETALLORDERDETAILS",
//         method: "GET",
//         success: function (res) {
//             console.log(res.data);
//             for (let orderDetail of res) {
//                 let tableRow = `<tr><td>${orderDetail.orderId}</td><td>${orderDetail.itemCode}</td><td>${orderDetail.itemName}</td><td>${orderDetail.unitPrice}</td><td>${orderDetail.qty}</td><td>${orderDetail.total}</td></tr>`;
//                 $("#orderDetailsTable").append(tableRow);
//             }
//         }
//     })
// }
//
// // Search Order details from Order Table and Order Detail Table
// function searchOrderByOrderTable(orderId) {
//
//     $.ajax({
//         url: "http://localhost:8080/backEnd/order?option=SEARCHORDER&orderId=" + orderId,
//         method: "GET",
//         success: function (res) {
//             if (res.status == 200) {
//                 $("#orderTable").empty();
//                 let tableRow = `<tr><td>${res.orderId}</td><td>${res.orderDate}</td><td>${res.customerId}</td><td>${res.total}</td></tr>`;
//                 $("#orderTable").append(tableRow);
//             } else {
//                 loadOrderTable();
//                 loadOrderDetailTable();
//                 swal({
//                     title: "Error!",
//                     text: "Order Not Found",
//                     icon: "warning",
//                     button: "Close",
//                     timer: 2000
//                 });
//             }
//         }
//     });
// }
//
// function searchOrderByOrderDetailTable(orderId) {
//     $("#orderDetailsTable").empty();
//     $.ajax({
//         url: "http://localhost:8080/backEnd/order?option=SEARCHORDERDETAIL&orderId=" + orderId,
//         method: "GET",
//         success: function (res) {
//             for (let orderDetail of res) {
//                 let tableRow = `<tr><td>${orderDetail.orderId}</td><td>${orderDetail.itemCode}</td><td>${orderDetail.itemName}</td><td>${orderDetail.unitPrice}</td><td>${orderDetail.qty}</td><td>${orderDetail.total}</td></tr>`;
//                 $("#orderDetailsTable").append(tableRow);
//             }
//         }
//     });
// }
//
// // Search Order
// let regOrderId = /^(O-)[0-9]{4}$/;
//
// $("#searchOrder").on('shown.bs.modal', function () {
//     $(this).find("#txtSearchOrderId").focus();
// });
//
// // btn search order function
// $("#btnSearchOrder").click(function () {
//     let searchOid = $("#txtSearchOrderId").val();
//     searchOrderByOrderDetailTable(searchOid);
//     searchOrderByOrderTable(searchOid);
// });
//
// // btn clear search field function
// $("#btnClearSearchOrderField").click(function () {
//     $("#txtSearchOrderId").val("");
//     $("#txtSearchOrderId").css('border', '1px solid #ced4da');
//     $("#txtSearchOrderId").focus();
//     loadOrderTable();
//     loadOrderDetailTable();
// });
//
// // add validation to search order text field
// $("#txtSearchOrderId").keyup(function (event) {
//     let searchOid = $("#txtSearchOrderId").val();
//     if (regOrderId.test(searchOid)) {
//         $("#txtSearchOrderId").css('border', '2px solid green');
//         if (event.key == "Enter") {
//             searchOrderByOrderDetailTable(searchOid);
//             searchOrderByOrderTable(searchOid);
//         }
//     } else {
//         $("#txtSearchOrderId").css('border', '2px solid red');
//     }
// });


function generateOrderID() {
    $("#txtOrderID").val("O00-0001");
    $.ajax({
        url: "order",
        method: "GET",
        success: function (resp) {
            for (const orders of resp.data){
                let orderId = orders.orderId;
                let tempId = parseInt(orderId.split("-")[1]);
                tempId = tempId+1;
                if (tempId <= 9){
                    $("#txtOrderID").val("O00-000"+tempId);
                }else if (tempId <= 99) {
                    $("#txtOrderID").val("O00-00" + tempId);
                }else if (tempId <= 999){
                    $("#txtOrderID").val("O00-0" + tempId);
                }else {
                    $("#txtOrderID").val("O00-"+tempId);
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
    $("#txtOrderItemCode").empty();
    $("#txtOrderItemCode").append($("<option></option>").attr("value", 0).text("Select Item"));
    console.log("Enter")
    let count = 0;
    $.ajax({
        url: "item?option=GETALL",
        method: "GET",
        success: function (res) {
            console.log(res);
            for (const item of res.data) {
                $("#txtOrderItemCode").append($("<option></option>").attr("value", count).text(item.itemCode));
                count++;
            }
        },
        error: function (ob, textStatus, error) {
            alert(textStatus);
        }
    });

}

function loadCustomerComboBoxData() {
    $("#txtOrderCusID").empty();
    $("#txtOrderCusID").append($("<option></option>").attr("value", 0).text("Select Customer"));
    console.log("Enter")
    let count = 0;
    $.ajax({
        url: "customer?option=GETALL",
        method: "GET",
        success: function (res) {
            console.log(res);
            for (const customer of res.data) {
                $("#txtOrderCusID").append($("<option></option>").attr("value", count).text(customer.id));
                count++;
            }
        },
        error: function (ob, textStatus, error) {
            alert(textStatus);
        }
    });
}

$("#txtOrderCusID").click(function () {

    let id = $("#txtOrderCusID option:selected").text();
    let name = $("#txtOrderCusName").val();
    let address = $("#txtOrderCusAddress").val();
    let contact = $("#txtOrderCusContact").val();


    $.ajax({
        url: "customer?option=GETALL",
        method: "GET",
        success: function (resp) {
            for (const customer of resp.data) {

                if (customer.id == id) {

                    name = customer.name;
                    address = customer.address;
                    contact = customer.contact;

                    $("#txtOrderCusName").val(name);
                    $("#txtOrderCusAddress").val(address);
                    $("#txtOrderCusContact").val(contact);
                }

            }
        }
    });


});


$("#txtOrderItemCode").click(function () {

    let id = $("#txtOrderItemCode option:selected").text();
    let name = $("#txtOrderItemName").val();
    let qtyOnHand = $("#txtOrderItemQtyOnHand").val();
    let price = $("#txtOrderItemPrice").val();

    $.ajax({
        url: "item?option=GETALL",
        method: "GET",
        success: function (resp) {
            for (const item of resp.data) {
                if (item.itemCode == id) {

                    name = item.name;
                    qtyOnHand = item.qtyOnHand;
                    price = item.price;

                    $("#txtOrderItemName").val(name);
                    $("#txtOrderItemQtyOnHand").val(qtyOnHand);
                    $("#txtOrderItemPrice").val(price);
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
                url: "item?option=SEARCH&itemCode=" + itemCode,
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



