loadAllItem();

$("#btnAddItem").click(function (){
    let itemOb = {
        "itemCode": $("#itemCode").val(),
        "itemName": $("#itemName").val(),
        "itemQty": $("#itemQuantity").val(),
        "itemPrice": $("#itemPrice").val()
    };
    // let data = $("#itemForm").serialize();
        $.ajax({
            url:"http://localhost:8085/backEnd/item",
            method:"POST",
            contentType: "application/json",
            data: JSON.stringify(itemOb),
            // data: data,
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
});

$("#btnGetAllItem").click(function (){
    resetItem();
    loadAllItem();
});


function resetItem(){
    $("#itemCode").val("");
    $("#itemName").val("");
    $("#itemQuantity").val("");
    $("#itemPrice").val("");
    $("#txtSearchItemCode").val("");
}

function loadAllItem(){
    $("#itemTable").empty();
    $.ajax({
        url:"http://localhost:8085/backEnd/item?option=GETALL",
        method:"GET",
        success:function (resp){
            for (const item of resp.data){
                let row = `<tr><td>${item.itemCode}</td><td>${item.itemName}</td><td>${item.itemQty}</td><td>${item.itemPrice}</td></tr>`;
                $("#itemTable").append(row);

            }
            bindClickEvent();
        }
    });
}

$("#btnDeleteItem").click(function (){
    let itemCode = $("#itemCode").val();

    $.ajax({
        url: "http://localhost:8085/backEnd/item?iCode=" + itemCode,
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

$("#btnUpdateItem").click(function (){
    let itemOb = {
        itemCode: $("#itemCode").val(),
        itemName: $("#itemName").val(),
        itemQty: $("#itemQuantity").val(),
        itemPrice: $("#itemPrice").val()
    };
    $.ajax({
        url: "http://localhost:8085/backEnd/item",
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

$("#btnSearchItem").click(function (){
    let itemCode = $("#txtSearchItemCode").val();
    $("#itemTable").empty();
    $.ajax({
        url:"http://localhost:8085/backEnd/item?option=SEARCH&iCode=" + itemCode,
        method:"GET",
        success:function (resp){
                let row = `<tr><td>${resp.itemCode}</td><td>${resp.name}</td><td>${resp.qtyOnHand}</td><td>${resp.price}</td></tr>`;
                $("#itemTable").append(row);
            bindClickEvent();
        }
    });
});

function bindClickEvent() {
    $("#itemTable>tr").click(function () {

        let id = $(this).children().eq(0).text();
        let name= $(this).children().eq(1).text();
        let qtyOnHand = $(this).children().eq(2).text();
        let price = $(this).children().eq(3).text();

        $("#itemCode").val(id);
        $("#itemName").val(name);
        $("#itemQuantity").val(qtyOnHand);
        $("#itemPrice").val(price);

    });
}


// ---------------Validation Start-----------
//validation started
// item regular expressions
const itemCodeRegEx = /^(I00-)[0-9]{3}$/;
const itemNameRegEx = /^[A-z ]{2,20}$/;
const itemQuantityRegEx = /^[0-9]{2,}$/;
const itemPriceRegEx = /^[0-9]{2,}$/;



$('#itemCode,#itemName,#itemQuantity,#itemPrice').on('keydown', function (eventOb) {
    if (eventOb.key == "Tab") {
        eventOb.preventDefault();
    }
    formValid();
});

$('#itemCode,#itemName,#itemQuantity,#itemPrice').on('blur', function () {
    formValid();
});

$("#itemCode").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfValid();
    }

    if (eventOb.key == "Control") {
        var typedItemCode = $("#itemCode").val();
        var srcItem = searchItemFromCode(typedItemCode);
        $("#itemCode").val(srcItem.getItemCode());
        $("#itemName").val(srcItem.getItemName());
        $("#itemQuantity").val(srcItem.getItemQuantity());
        $("#itemPrice").val(srcItem.getItemPrice());
    }
});

$("#itemName").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfValid();
    }
});

$("#itemQuantity").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfValid();
    }
});

$("#itemPrice").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfValid();
    }
});


$("#btnAddItem").attr('disabled', true);

function clearAll() {
    $('#itemCode,#itemName,#itemQuantity,#itemPrice').val("");
    $('#itemCode,#itemName,#itemQuantity,#itemPrice').css('border', '2px solid #ced4da');
    $('#itemCode').focus();
    $("#btnAddItem").attr('disabled', true);
    $("#lblitemcode,#lblitemname,#lblitemquantity,#lblitemprice").text("");
}

function formValid() {
    var itemCode = $("#itemCode").val();
    $("#itemCode").css('border', '2px solid green');
    $("#lblitemcode").text("");
    if (itemCodeRegEx.test(itemCode)) {
        var itemName = $("#itemName").val();
        if (itemNameRegEx.test(itemName)) {
            $("#itemName").css('border', '2px solid green');
            $("#lblitemname").text("");
            var itemQty = $("#itemQuantity").val();
            if (itemQuantityRegEx.test(itemQty)) {
                var itemPrice = $("#itemPrice").val();
                var resp = itemPriceRegEx.test(itemPrice);
                $("#itemQuantity").css('border', '2px solid green');
                $("#lblitemquantity").text("");
                if (resp) {
                    $("#itemPrice").css('border', '2px solid green');
                    $("#lblitemprice").text("");
                    return true;
                } else {
                    $("#itemPrice").css('border', '2px solid red');
                    $("#lblitemprice").text("Item Price is a required field : Mimum 3");
                    return false;
                }
            } else {
                $("#itemQuantity").css('border', '2px solid red');
                $("#lblitemquantity").text("Item qty is a required field : Pattern 500g or 1kg");
                return false;
            }
        } else {
            $("#itemName").css('border', '2px solid red');
            $("#lblitemname").text("Item Name is a required field : Mimimum 5, Max 20, Spaces Allowed");
            return false;
        }
    } else {
        $("#itemCode").css('border', '2px solid red');
        $("#lblitemcode").text("Item Code is a required field : Pattern I00-000");
        return false;
    }
}

function checkIfValid() {
    var itemCode = $("#itemCode").val();
    if (itemCodeRegEx.test(itemCode)) {
        $("#itemName").focus();
        var itemName = $("#itemName").val();
        if (itemNameRegEx.test(itemName)) {
            $("#itemQuantity").focus();
            var itemQty = $("#itemQuantity").val();
            if (itemQuantityRegEx.test(itemQty)) {
                $("#itemPrice").focus();
                var itemPrice = $("#itemPrice").val();
                var resp = itemPriceRegEx.test(itemPrice);
                if (resp) {
                    let res = confirm("Do you really need to add this Item..?");
                    if (res) {
                        clearAll();
                    }
                } else {
                    $("#itemPrice").focus();
                }
            } else {
                $("#itemQuantity").focus();
            }
        } else {
            $("#itemName").focus();
        }
    } else {
        $("#itemCode").focus();
    }
}

function setButton() {
    let b = formValid();
    if (b) {
        $("#btnAddItem").attr('disabled', false);
    } else {
        $("#btnAddItem").attr('disabled', true);
    }
}

$('#btnAddItem').click(function () {
    checkIfValid();
});
//validation ended


// ------------------Validation-End-----------
