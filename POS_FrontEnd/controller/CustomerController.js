$("#btnGetAllCustomer").click(function () {
    resetCustomer();
    loadAllCustomer();

});

loadAllCustomer();


$("#btnAddCustomer").click(function () {

    let data = $("#customerForm").serialize();
    console.log(data);
    $.ajax({
        url: "http://localhost:8085/backEnd/customer",
        method: "POST",
        data: data,
        success: function (res) {
            console.log(res);
            if (res.status == 200) {
                loadAllCustomer();
                alert(res.message);
                resetCustomer();
            } else {
                console.log(res)
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


function resetCustomer() {
    $("#customerId").val("");
    $("#customerName").val("");
    $("#customerAddress").val("");
    $("#customerTp").val("");
    $("#txtSearchCusID").val("");
}

function loadAllCustomer() {
    $("#customerTable").empty();
    $.ajax({
        url: "http://localhost:8085/backEnd/customer?option=GETALL",
        method: "GET",
        success: function (resp) {
            for (const customer of resp.data) {
                let row = `<tr><td>${customer.id}</td><td>${customer.name}</td><td>${customer.address}</td><td>${customer.contact}</td></tr>`;
                $("#customerTable").append(row);

            }
            bindClickEvents();

        }
    });
}


$("#btnDelete").click(function () {
    let customerID = $("#customerId").val();

    $.ajax({
        url: "http://localhost:8085/backEnd/customer?customerID=" + customerID,
        method: "DELETE",

        success: function (res) {
            console.log(res);
            if (res.status == 200) {
                alert(res.message);
                resetCustomer();
                loadAllCustomer();
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

$("#btnUpdateCustomer").click(function () {
    let cusOb = {
        id: $("#customerId").val(),
        name: $("#customerName").val(),
        address: $("#customerAddress").val(),
        contact: $("#customerTp").val()
    };
    $.ajax({
        url: "http://localhost:8085/backEnd/customer",
        method: "PUT",
        contentType: "application/json",
        data: JSON.stringify(cusOb),
        success: function (res) {
            if (res.status == 200) {
                alert(res.message);
                resetCustomer();
                loadAllCustomer()
            } else if (res.status == 400) {
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

$("#btnSearch").click(function () {
    let customerID = $("#txtSearchCusID").val();
    $("#customerTable").empty();
    $.ajax({
        url: "http://localhost:8085/backEnd/customer?option=SEARCH&customerID=" + customerID,
        method: "GET",
        success: function (resp) {
            let row = `<tr><td>${resp.id}</td><td>${resp.name}</td><td>${resp.address}</td><td>${resp.contact}</td></tr>`;
            $("#customerTable").append(row);

            bindClickEvents();
        }

    });
});

function bindClickEvents() {
    $("#customerTable>tr").click(function () {

        let id = $(this).children().eq(0).text();
        let name = $(this).children().eq(1).text();
        let address = $(this).children().eq(2).text();
        let contact = $(this).children().eq(3).text();

        $("#customerId").val(id);
        $("#customerName").val(name);
        $("#customerAddress").val(address);
        $("#customerTp").val(contact);
    });
}