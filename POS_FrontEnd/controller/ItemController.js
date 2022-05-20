//
// /*Item Form Text Field Validations*/
//
// let regItemCode = /^(I00-)[0-9]{4}$/;
// let regItemName = /^[A-z 0-9.]{3,}$/;
// let regItemUnitPrice = /^[0-9]{1,}([.][0-9]{2})?$/;
// let regItemQty = /^[0-9]{1,}$/;
//
// let searchItemCode;
//
// loadAllItems();
//
// // Add Item Form Validations
// $('#itemCode,#itemName,#itemPrice,#itemQuantity').on('keydown', function (event) {
//     if (event.key == "Tab") {
//         event.preventDefault();
//     }
// });
//
// $('#itemCode,#itemName,#itemPrice,#itemQuantity').on('blur', function () {
//     addItemFormValidation();
// });
//
// $("#itemCode").on('keyup', function (event) {
//     setAddItemButtonDisableOrNot();
//     if (event.key == "Enter") {
//         checkIfAddItemFormValid();
//     }
// });
//
// $("#itemName").on('keyup', function (event) {
//     setAddItemButtonDisableOrNot();
//     if (event.key == "Enter") {
//         checkIfAddItemFormValid();
//     }
// });
//
// $("#itemPrice").on('keyup', function (event) {
//     setAddItemButtonDisableOrNot();
//     if (event.key == "Enter") {
//         checkIfAddItemFormValid();
//     }
// });
//
// $("#itemQuantity").on('keyup', function (event) {
//     setAddItemButtonDisableOrNot();
//     if (event.key == "Enter") {
//         checkIfAddItemFormValid();
//     }
// });
//
// function addItemFormValidation() {
//     var itemCode = $("#itemCode").val();
//     $("#itemCode").css('border', '2px solid green');
//     $("#lblitemcode").text("");
//     if (regItemCode.test(itemCode)) {
//         var itemName = $("#itemName").val();
//         if (regItemName.test(itemName)) {
//             $("#itemName").css('border', '2px solid green');
//             $("#lblitemname").text("");
//             var itemUnitPrice = $("#itemPrice").val();
//             if (regItemUnitPrice.test(itemUnitPrice)) {
//                 var itemQty = $("#itemQuantity").val();
//                 var response = regItemQty.test(itemQty);
//                 $("#itemPrice").css('border', '2px solid green');
//                 $("#lblitemprice").text("");
//                 if (response) {
//                     $("#itemQuantity").css('border', '2px solid green');
//                     $("#lblitemquantity").text("");
//                     return true;
//                 } else {
//                     $("#itemQuantity").css('border', '2px solid red');
//                     $("#lblitemquantity").text("Item Qty is a required field.Pattern : 100");
//                     return false;
//                 }
//             } else {
//                 $("#itemPrice").css('border', '2px solid red');
//                 $("#lblitemprice").text("Unit Price is a required field.Pattern : 100.00 or 100");
//                 return false;
//             }
//         } else {
//             $("#itemName").css('border', '2px solid red');
//             $("#lblitemname").text("Item name is a required field.");
//             return false;
//         }
//     } else {
//         $("#itemCode").css('border', '2px solid red');
//         $("#lblitemcode").text("Item Code is a required field.Pattern : I00-0001");
//         return false;
//     }
// }
//
// function setAddItemButtonDisableOrNot() {
//     let check = addItemFormValidation();
//     if (check) {
//         $("#btnAddItem").attr('disabled', false);
//     } else {
//         $("#btnAddItem").attr('disabled', true);
//     }
// }
//
// function checkIfAddItemFormValid() {
//     var itemCode = $("#itemCode").val();
//     if (regItemCode.test(itemCode)) {
//         $("#itemName").focus();
//         var itemName = $("#itemName").val();
//         if (regItemName.test(itemName)) {
//             $("#itemPrice").focus();
//             var itemUnitPrice = $("#itemPrice").val();
//             if (regItemUnitPrice.test(itemUnitPrice)) {
//                 $("#itemQuantity").focus();
//                 var itemQty = $("#itemQuantity").val();
//                 var response = regItemQty.test(itemQty);
//                 if (response) {
//                     let res = confirm("Do you want to add this Item..?");
//                     if (res) {
//                         addItem();
//                     }
//                 } else {
//                     $("#itemQuantity").focus();
//                 }
//             } else {
//                 $("#itemPrice").focus();
//             }
//         } else {
//             $("#itemName").focus();
//         }
//     } else {
//         $("#itemCode").focus();
//     }
// }
//
// // Delete Item Form Validations
//
// $("#txtSearchItemCode").keyup(function (event) {
//     searchItemCode = $("#txtSearchItemCode").val();
//     if (regItemCode.test(searchItemCode)) {
//         $("#txtSearchItemCode").css('border', '2px solid green');
//         if (event.key == "Enter") {
//             searchDeleteItem(searchItemCode);
//         }
//     } else {
//         $("#txtSearchItemCode").css('border', '2px solid red');
//         $("#btnDeleteItem").prop('disabled', true);
//     }
// });
//
// /*End Of Item Form Validations*/
//
// /*CRUD Operations Of Item Form*/
//
// // Add Item
//
// function addItem() {
//     var data = $("#item").serialize();
//     $.ajax({
//         url: "http://localhost:8080/backEnd/item",
//         method: "POST",
//         data: data,
//         success: function (res) {
//             if (res.status == 200) {
//                 console.log(res.data);
//                 loadAllItems();
//                 clearItemFields();
//             } else {
//                 alert(res.data);
//             }
//         },
//         error: function (ob, textStatus, error) {
//             console.log(ob);
//             console.log(textStatus);
//             console.log(error);
//         }
//     })
//
// }
//
// // Search Item
//
// function searchDeleteItem(searchId){
//     $.ajax({
//         url: "http://localhost:8080/backEnd/item?option=SEARCH&ItemCode=" + searchId,
//         method: "GET",
//         success: function (res) {
//             if (res.status == 200) {
//                 $("#itemName").val(res.name);
//                 $("#itemPrice").val(res.unitPrice);
//                 $("#itemQuantity").val(res.qty);
//                 $("#btnDeleteItem").prop('disabled', false);
//                 $("#btnDeleteItem").focus();
//             } else {
//                 $("#itemName").val("");
//                 $("#itemPrice").val("");
//                 $("#itemQuantity").val("");
//                 $("#btnDeleteItem").prop('disabled', true);
//                 alert("Error!"+"Item Not Found.")
//             }
//         },
//     })
// }
//
// // Update Item
//
// function updateItem() {
//     var itemObj = {
//         code: $("#itemCode").val(),
//         name: $("#itemName").val(),
//         unitPrice: $("#itemPrice").val(),
//         qty: $("#itemQuantity").val()
//     }
//
//     $.ajax({
//         url: "http://localhost:8080/backEnd/item",
//         method: "PUT",
//         contentType: "application/json",
//         data: JSON.stringify(itemObj),
//         success: function (res) {
//             if (res.status == 200) {
//                 console.log(res.message)
//                 loadAllItems();
//                 clearUpdateItemFields();
//                 $("#btnUpdateItem").prop('disabled', true);
//             } else if (res.status == 400) {
//                 console.log(res.message);
//             } else {
//                 console.log(res.data);
//             }
//         },
//         error: function (ob, errorStus) {
//             console.log(ob);
//         }
//     })
// }
//
// // Delete Item
//
// function deleteItem() {
//     let searchIcode = $("#txtSearchItemCode").val();
//     $.ajax({
//         url:"http://localhost:8080/backEnd/item?itemCode=" + searchIcode,
//         method:"DELETE",
//         success:function (res) {
//             console.log(res);
//             if (res.status == 200) {
//                 clearDeleteItemFields();
//                 loadAllItems();
//                 $("#btnDeleteItem").prop('disabled', true);
//             } else if (res.status == 400) {
//                 alert(res.data);
//             } else {
//                 alert(res.data);
//             }
//         }
//     })
// }
//
// // Load All Items
//
// function loadAllItems() {
//     $("#itemTable").empty();
//     $.ajax({
//         url: "http://localhost:8080/backEnd/item?option=GETALL",
//         method: "GET",
//         success: function (resp) {
//             for (const item of resp) {
//                 let row = `<tr><td>${item.code}</td><td>${item.name}</td><td>${item.unitPrice}</td><td>${item.qty}</td></tr>`;
//                 $("#itemTable").append(row);
//             }
//         }
//     });
// }
//
// /*End Of CRUD Operations Of Item Form*/
//
// /*Other Functions*/
//
// // Search Item By Table
//
// function searchItemByTable(searchCode) {
//     $.ajax({
//         url: "http://localhost:8080/backEnd/item?option=SEARCH&ItemCode=" + searchCode,
//         method: "GET",
//         success: function (res) {
//             if (res.status == 200) {
//                 $("#itemTable").empty();
//                 let tableRow = `<tr><td>${res.code}</td><td>${res.name}</td><td>${res.unitPrice}</td><td>${res.qty}</td></tr>`;
//                 $("#itemTable").append(tableRow);
//             } else {
//                 loadAllItems();
//                 alert("Error!"+"Item Not Found.")
//             }
//         },
//     });
// }
//
// /*Controller Functions*/
// // Add Item Form
//
// $("#btnAddItem").prop('disabled', true);
//
// $("#btnAddItem").click(function () {
//     let res = confirm("Do you want to add this item?");
//     if (res) {
//         addItem();
//     }
// });
//
//
// function clearItemFields() {
//     $("#itemCode").focus();
//
//     $("#itemCode").val("");
//     $("#itemName").val("");
//     $("#itemPrice").val("");
//     $("#itemQuantity").val("");
//
//     $("#lblitemcode").text("");
//     $("#lblitemname").text("");
//     $("#lblitemprice").text("");
//     $("#lblitemquantity").text("");
//
//     $("#itemCode").css('border', '1px solid #ced4da');
//     $("#itemName").css('border', '1px solid #ced4da');
//     $("#itemPrice").css('border', '1px solid #ced4da');
//     $("#itemQuantity").css('border', '1px solid #ced4da');
//
//     $("#btnAddItem").prop('disabled', true);
// }
//
// // Update Item Form
//
// $("#btnUpdateItem").prop('disabled', true);
//
// $("#btnUpdateItem").click(function () {
//     let res = confirm("Do you want to update this item?");
//     if (res) {
//         updateItem();
//     }
// });
//
// function clearUpdateItemFields() {
//     $("#txtSearchItemCode").focus();
//
//     $("#txtSearchItemCode").val("");
//     $("#itemName").val("");
//     $("#itemPrice").val("");
//     $("#itemQuantity").val("");
//
//     $("#lblitemname").text("");
//     $("#lblitemprice").text("");
//     $("#lblitemquantity").text("");
//
//     $("#txtSearchItemCode").css('border', '1px solid #ced4da');
//     $("#itemName").css('border', '1px solid #ced4da');
//     $("#itemPrice").css('border', '1px solid #ced4da');
//     $("#itemQuantity").css('border', '1px solid #ced4da');
// }
//
// // Delete Item Form
//
// $("#btnDeleteItem").prop('disabled', true);
//
// $("#btnDeleteItem").click(function () {
//     let res = confirm("Do you want to delete this item?");
//     if (res) {
//         deleteItem();
//     }
// });
//
//
// function clearDeleteItemFields() {
//     $("#txtSearchItemCode").focus();
//
//     $("#txtSearchItemCode").val("");
//     $("#itemName").val("");
//     $("#itemPrice").val("");
//     $("#itemQuantity").val("");
// }
//
// //Other
//
// $("#txtSearchItemCode").on('keyup', function (event) {
//     var itemCode = $("#txtSearchItemCode").val();
//     if (regItemCode.test(itemCode)) {
//         $("#txtSearchItemCode").css('border','2px solid green');
//         if (event.key == "Enter") {
//             searchItemByTable(itemCode);
//         }
//     }else{
//         $("#txtSearchItemCode").css('border','2px solid red');
//     }
// });
//
// $("#btnSearchItem").click(function () {
//     var itemCode = $("#txtSearchItemCode").val();
//     searchItemByTable(itemCode);
// });
//

loadAllItem();

$("#btnItemSave").click(function (){
    let data = $("#itemForm").serialize();

    if ($("#txtItemCode").val() == '') {
        alert("Can not be Item Code empty");
    } else if ($("#txtItemName").val() == '') {
        alert("Can not be Item Name empty");
    }else if ($("#txtItemQuantity").val() == '') {
        alert("Can not be Item Quantity empty");
    }else if ($("#txtItemUnitPrice").val() == '') {
        alert("Can not be Item Price empty");
    }else{
        $.ajax({
            url:"item",
            method:"POST",
            data:data,
            success: function (res){
                if (res.status == 200){
                    loadAllItem();
                    alert(res.message);
                    resetItem();
                }else{
                    alert(res.data);
                }
            },
            error: function (ob, textStatus, error) {
                console.log(ob);
                console.log(textStatus);
                console.log(error);
            }
        });
    }

});

$("#btnGetAllItem").click(function (){
    resetItem();
    loadAllItem();
});


function resetItem(){
    $("#txtItemCode").val("");
    $("#txtItemName").val("");
    $("#txtItemUnitPrice").val("");
    $("#txtItemQuantity").val("");
}

function bindClickEvent() {

    $("#itemToTable>tr").click(function () {

        let id = $(this).children().eq(0).text();
        let name = $(this).children().eq(1).text();
        let qtyOnHand = $(this).children().eq(2).text();
        let price = $(this).children().eq(3).text();

        $("#txtItemCode").val(id);
        $("#txtItemName").val(name);
        $("#txtItemQuantity").val(qtyOnHand);
        $("#txtItemUnitPrice").val(price);

    });
}

function loadAllItem(){
    $("#itemToTable").empty();
    $.ajax({
        url:"item?option=GETALL",
        method:"GET",
        success:function (resp){
            for (const item of resp.data){
                let row = `<tr><td>${item.itemCode}</td><td>${item.name}</td><td>${item.qtyOnHand}</td><td>${item.price}</td></tr>`;
                $("#itemToTable").append(row);

            }
            bindClickEvent();


        }
    });
}

$("#btnItemDelete").click(function (){
    let itemCode = $("#txtItemCode").val();

    $.ajax({
        url: "item?itemCode=" + itemCode,
        method: "DELETE",

        success: function (res) {
            console.log(res);
            if (res.status == 200) {
                alert(res.message);
                resetItem();
                loadAllItem();
            } else if (res.status == 400) {
                alert(res.data);
            } else {
                alert(res.data);
            }

        },
        error: function (ob, status, t) {
            console.log(ob);
            console.log(status);
            console.log(t);
        }
    });
});


$("#btnItemUpdate").click(function (){
    let itemOb = {
        itemCode: $("#txtItemCode").val(),
        itemName: $("#txtItemName").val(),
        itemQty: $("#txtItemQuantity").val(),
        itemPrice: $("#txtItemUnitPrice").val()
    };
    $.ajax({
        url: "item",
        method: "PUT",
        contentType: "application/json",
        data: JSON.stringify(itemOb),
        success: function (res){
            if (res.status == 200){
                alert(res.message);
                resetItem();
                loadAllItem();
            } else if (res.status == 400){
                alert(res.message);
            } else {
                alert(res.data);
            }
        },
        error: function (ob, errorStus) {
            console.log(ob);
            console.log(errorStus);
        }
    });
});

$("#btnItemSearch").click(function (){
    let itemCode = $("#txtSearchItem").val();
    $("#itemToTable").empty();
    $.ajax({
        url:"item?option=SEARCH&itemCode=" + itemCode,
        method:"GET",
        success:function (resp){
            for (const item of resp.data){
                let row = `<tr><td>${item.itemCode}</td><td>${item.name}</td><td>${item.qtyOnHand}</td><td>${item.price}</td></tr>`;
                $("#itemToTable").append(row);
            }
            bindClickEvent();
        }
    });
});
