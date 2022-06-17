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

