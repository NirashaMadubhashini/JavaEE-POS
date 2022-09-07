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

$("#btnGetAllCustomer").click(function () {
    resetCustomer();
    loadAllCustomer();

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
        url: "http://localhost:8085/backEnd/customer?cusId=" + customerID,
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
        url: "http://localhost:8085/backEnd/customer?option=SEARCH&cusId=" + customerID,
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

        let cusId = $(this).children().eq(0).text();
        let name = $(this).children().eq(1).text();
        let address = $(this).children().eq(2).text();
        let contact = $(this).children().eq(3).text();

        $("#customerId").val(cusId);
        $("#customerName").val(name);
        $("#customerAddress").val(address);
        $("#customerTp").val(contact);
    });
}


// ---------------Validation Start-----------
//validation started
// customer regular expressions
const customerIdRegEx = /^(C00-)[0-9]{3}$/;
const customerNameRegEx = /^[A-z ]{2,20}$/;
const customerAddressRegEx = /^[A-z]{2,}$/;
const customerTpRegEx = /^[0-9]{2,}$/;



$('#customerId,#customerName,#customerAddress,#customerTp').on('keydown', function (eventOb) {
    if (eventOb.key == "Tab") {
        eventOb.preventDefault();
    }
    formValidCus();
});

$('#customerId,#customerName,#customerAddress,#customerTp').on('blur', function () {
    formValidCus();
});

$("#customerId").on('keyup', function (eventOb) {
    setButtonCus();
    if (eventOb.key == "Enter") {
        checkIfValidCus();
    }

    if (eventOb.key == "Control") {
        var typedCustomerId = $("#customerId").val();
        var srcCustomer = searchCustomerFromId(typedCustomerId);
        $("#customerId").val(srcCustomer.getCustomerId());
        $("#customerName").val(srcCustomer.getCustomerName());
        $("#customerAddress").val(srcCustomer.getCustomerAddress());
        $("#customerTp").val(srcCustomer.getCustomerTp());
    }
});

$("#customerName").on('keyup', function (eventOb) {
    setButtonCus();
    if (eventOb.key == "Enter") {
        checkIfValidCus();
    }
});

$("#customerAddress").on('keyup', function (eventOb) {
    setButtonCus();
    if (eventOb.key == "Enter") {
        checkIfValidCus();
    }
});

$("#customerTp").on('keyup', function (eventOb) {
    setButtonCus();
    if (eventOb.key == "Enter") {
        checkIfValidCus();
    }
});


$("#btnAddCustomer").attr('disabled', true);

function clearAll() {
    $('#customerId,#customerName,#customerAddress,#customerTp').val("");
    $('#customerId,#customerName,#customerAddress,#customerTp').css('border', '2px solid #ced4da');
    $('#customerId').focus();
    $("#btnAddCustomer").attr('disabled', true);
    $("#lblcusid,#lblcusname,#lblcusaddress,#lblcusTp").text("");
}

function formValidCus() {
    var customerId = $("#customerId").val();
    $("#customerId").css('border', '2px solid green');
    $("#lblcusid").text("");
    if (customerIdRegEx.test(customerId)) {
        var customerName = $("#customerName").val();
        if (customerNameRegEx.test(customerName)) {
            $("#customerName").css('border', '2px solid green');
            $("#lblcusname").text("");
            var customerAddress = $("#customerAddress").val();
            if (customerAddressRegEx.test(customerAddress)) {
                var customerTp = $("#customerTp").val();
                var resp = customerTpRegEx.test(customerTp);
                $("#customerAddress").css('border', '2px solid green');
                $("#lblcusaddress").text("");
                if (resp) {
                    $("#customerTp").css('border', '2px solid green');
                    $("#lblcusTp").text("");
                    return true;
                } else {
                    $("#customerTp").css('border', '2px solid red');
                    $("#lblcusTp").text("Customer Tp is a required field : 761319259");
                    return false;
                }
            } else {
                $("#customerAddress").css('border', '2px solid red');
                $("#lblcusaddress").text("Customer Address is a required field :  Galle");
                return false;
            }
        } else {
            $("#customerName").css('border', '2px solid red');
            $("#lblcusname").text("Customer Name is a required field : Nirasha");
            return false;
        }
    } else {
        $("#customerId").css('border', '2px solid red');
        $("#lblcusid").text("Customer Id is a required field : Pattern C00-000");
        return false;
    }
}

function checkIfValidCus() {
    var customerId = $("#customerId").val();
    if (customerIdRegEx.test(customerId)) {
        $("#customerName").focus();
        var customerName = $("#customerName").val();
        if (customerNameRegEx.test(customerName)) {
            $("#customerAddress").focus();
            var customerAddress= $("#customerAddress").val();
            if (customerAddressRegEx.test(customerAddress)) {
                $("#customerTp").focus();
                var customerTp = $("#customerTp").val();
                var resp = customerTpRegEx.test(customerTp);
                if (resp) {
                    let res = confirm("Do you really need to add this Customer..?");
                    if (res) {
                        clearAll();
                    }
                } else {
                    $("#customerTp").focus();
                }
            } else {
                $("#customerAddress").focus();
            }
        } else {
            $("#customerName").focus();
        }
    } else {
        $("#customerId").focus();
    }
}

function setButtonCus() {
    let b = formValidCus();
    if (b) {
        $("#btnAddCustomer").attr('disabled', false);
    } else {
        $("#btnAddCustomer").attr('disabled', true);
    }
}

$('#btnAddCustomer').click(function () {
    checkIfValidCus();
});
//validation ended


// ------------------Validation-End-----------
