/*CRUD Operations Of Customer Form*/

// Load all customers
function loadAllCustomers() {
    $("customerTable").empty();
    $.ajax({
        url: "http://localhost:8080/javaeepos/customer?option=GETALL",
        method: "GET",
        success: function (resp) {
            for (const customer of resp) {
                let row = `<tr><td>${customer.id}</td><td>${customer.name}</td><td>${customer.address}</td><td>${customer.salary}</td></tr>`;
                $("#customerTable").append(row);
            }
        }
    });

}

// Add Customer
function saveCustomer() {
    var data = $("#customer").serialize();
    $.ajax({
        url: "http://localhost:8080/javaeepos/customer",
        method: "POST",
        data: data,
        success: function (res) {
            if (res.status == 200) {
                console.log(res.data);
                loadAllCustomers();
                clearCustomerFields();
            } else {
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

// Search Update Customer
function searchUpdateCustomer(searchId) {
    $.ajax({
        url: "http://localhost:8080/javaeepos/customer?option=SEARCH&CusID=" + searchId,
        method: "GET",
        success: function (res) {
            if (res.status == 200) {
                $("#customerName").val(res.name);
                $("#customerAddress").val(res.address);
                $("#customerSalary").val(res.salary);
                $("#btnUpdateCustomer").prop('disabled', false);
                $("#btnUpdateCustomer").focus();
            } else {
                $("#customerName").val("");
                $("#customerAddress").val("");
                $("#customerSalary").val("");
                $("#btnUpdateCustomer").prop('disabled', true);
                alert("Customer Not Found.")
                swal({
                    title: "Error!",
                    text: "Customer Not Found.",
                    icon: "warning",
                    button: "Close",
                    timer: 2000
                });
            }
        },
    });
}

// Search Delete Customer
function searchDeleteCustomer(searchId) {
    $.ajax({
        url: "http://localhost:8080/javaeepos/customer?option=SEARCH&CusID=" + searchId,
        method: "GET",
        success: function (res) {
            if (res.status == 200) {
                $("#customerName").val(res.name);
                $("#customerAddress").val(res.address);
                $("#customerSalary").val(res.salary);
                $("#btnDelete").prop('disabled', false);
                $("#btnDelete").focus();
            } else {
                $("#customerName").val("");
                $("#customerAddress").val("");
                $("#customerSalary").val("");
                $("#btnDelete").prop('disabled', true);
                alert("Customer Not Found.")
            }
        },
    });
}

// Update Customer
function updateCustomer() {
    var cusOb = {
        id: $("#customerId").val(),
        name: $("#customerName").val(),
        address: $("#customerAddress").val(),
        salary: $("#customerSalary").val()
    }

    $.ajax({
        url: "http://localhost:8080/javaeepos/customer",
        method: "PUT",
        contentType: "application/json",
        data: JSON.stringify(cusOb),
        success: function (res) {
            if (res.status == 200) {
                console.log(res.message)
                loadAllCustomers();
                clearUpdateCustomerFields();
                $("#btnUpdateCustomer").prop('disabled', true);
            } else if (res.status == 400) {
                console.log(res.message);
            } else {
                console.log(res.data);
            }
        },
        error: function (ob, errorStus) {
            console.log(ob);
        }
    });
}

// Delete Customer
function deleteCustomer() {
    let cusId = $("#txtSearchCusID").val();
    $.ajax({
        url: "http://localhost:8080/javaeepos/customer?CusID=" + cusId,
        method: "DELETE",
        success: function (res) {
            console.log(res);
            if (res.status == 200) {
                clearDeleteCustomerFields();
                loadAllCustomers();
                $("#btnDelete").prop('disabled', true);
            } else if (res.status == 400) {
                alert(res.data);
            } else {
                alert(res.data);
            }
        }
    })
}
/*End Of CRUD Operations*/


/*Other Functions*/

// Search Customer By Table

function searchCustomerByTable(searchId) {
    $.ajax({
        url: "http://localhost:8080/javaeepos/customer?option=SEARCH&CusID=" + searchId,
        method: "GET",
        success: function (res) {
            if (res.status == 200) {
                $("#customerTable").empty();
                let tableRow = `<tr><td>${res.id}</td><td>${res.name}</td><td>${res.address}</td><td>${res.salary}</td></tr>`;
                $("#customerTable").append(tableRow);
            } else {
                loadAllCustomers();
                alert("Customer Not Found.");
            }
        },
    });
}

/*Controller Functions*/
// Add Customer Form

$("#btnAddCustomer").click(function () {
    $(this).find("#customerId").focus();
    generateCustomerId();
});

$("#btnAddCustomer").prop('disabled', true);

$("#btnAddCustomer").click(function () {
    let res = confirm("Do you want to add this customer?");
    if (res) {
        saveCustomer();
    }
});


function clearCustomerFields() {
    $("#customerId").focus();

    $("#customerId").val("");
    $("#customerName").val("");
    $("#customerAddress").val("");
    $("#customerSalary").val("");

    $("#lblcusid").text("");
    $("#lblcusname").text("");
    $("#lblcusaddress").text("");
    $("#customerSalaryr").text("");

    $("#customerId").css('border', '1px solid #ced4da');
    $("#customerName").css('border', '1px solid #ced4da');
    $("#customerAddress").css('border', '1px solid #ced4da');
    $("#customerSalary").css('border', '1px solid #ced4da');

    $("#btnAddCustomer").prop('disabled', true);
}


// Update Customer Form

$("#btnUpdateCustomer").prop('disabled', true);


$("#btnUpdateCustomer").click(function () {
    let res = confirm("Do you want to update this customer?");
    if (res) {
        updateCustomer();
    }
});

function clearUpdateCustomerFields() {
    $("#txtSearchCusID").focus();

    $("#txtSearchCusID").val("");
    $("#customerName").val("");
    $("#customerAddress").val("");
    $("#customerSalary").val("");

    $("#lblcusname").text("");
    $("#lblcusaddress").text("");
    $("#lblcussalary").text("");

    $("#customerName").css('border', '1px solid #ced4da');
    $("#customerAddress").css('border', '1px solid #ced4da');
    $("#customerSalary").css('border', '1px solid #ced4da');
}

// Delete Customer Form

$("#btnDelete").prop('disabled', true);


$("#btnDelete").click(function () {
    let res = confirm("Do you want to delete this customer?");
    if (res) {
        deleteCustomer();
    }
});


function clearDeleteCustomerFields() {
    $("#txtSearchCusID").focus();

    $("#txtSearchCusID").val("");
    $("#customerName").val("");
    $("#customerAddress").val("");
    $("#customerSalary").val("");
}

//Other

// $("#searchCustomerForm").submit(function (e) {
//     e.preventDefault();
// });

$("#txtSearchCusID").on('keyup', function (event) {
    var custId = $("#txtSearchCusID").val();
    if (regCusId.test(custId)) {
        $("#txtSearchCusID").css('border', '2px solid green');
        if (event.key == "Enter") {
            searchCustomerByTable(custId);
        }
    } else {
        $("#txtSearchCusID").css('border', '2px solid red');
    }
});

$("#btnSearch").click(function () {
    var custId = $("#customerId").val();
    searchCustomerByTable(custId);
});



// Validation Part

let regCusId = /^(C00-)[0-9]{4}$/;
let regCustName = /^[A-z .]{3,}$/;
let regCustAddress = /^[A-z ]{3,}$/;
let regCustSalary = /^[1-9][0-9]{3,}(.[0-9]{2})?$/;

let searchCustId;

loadAllCustomers();


$('#customerId,#customerName,#customerAddress,#customerSalary').on('keydown', function (event) {
    if (event.key == "Tab") {
        event.preventDefault();
    }
});

$('#customerId,#customerName,#customerAddress,#customerSalary').on('blur', function () {
    addCustomerFormValidation();
});

$("#customerId").on('keyup', function (event) {
    setAddCustomerButtonDisableOrNot();
    if (event.key == "Enter") {
        checkIfAddCustomerFormValid();
    }
});

$("#customerName").on('keyup', function (event) {
    setAddCustomerButtonDisableOrNot();
    if (event.key == "Enter") {
        checkIfAddCustomerFormValid();
    }
});

$("#customerAddress").on('keyup', function (event) {
    setAddCustomerButtonDisableOrNot();
    if (event.key == "Enter") {
        checkIfAddCustomerFormValid();
    }
});

$("#customerSalary").on('keyup', function (event) {
    setAddCustomerButtonDisableOrNot();
    if (event.key == "Enter") {
        checkIfAddCustomerFormValid();
    }
});

function addCustomerFormValidation() {
    var custId = $("#customerId").val();
    $("#customerId").css('border', '2px solid green');
    $("#lblcusid").text("");
    if (regCusId.test(custId)) {
        var custName = $("#customerName").val();
        if (regCustName.test(custName)) {
            $("#customerName").css('border', '2px solid green');
            $("#lblcusname").text("");
            var custAddress = $("#customerAddress").val();
            if (regCustAddress.test(custAddress)) {
                var custSalary = $("#customerSalary").val();
                var response = regCustSalary.test(custSalary);
                $("#customerAddress").css('border', '2px solid green');
                $("#lblcusaddress").text("");
                if (response) {
                    $("#customerSalary").css('border', '2px solid green');
                    $("#lblcussalary").text("");
                    return true;
                } else {
                    $("#customerSalary").css('border', '2px solid red');
                    $("#lblcussalary").text("Customer Salary is a required field.Pattern : 1000.00 or 1000");
                    return false;
                }
            } else {
                $("#customerAddress").css('border', '2px solid red');
                $("#lblcusaddress").text("Customer address is a required field.");
                return false;
            }
        } else {
            $("#customerName").css('border', '2px solid red');
            $("#lblcusname").text("Customer name is a required field.");
            return false;
        }
    } else {
        $("#customerId").css('border', '2px solid red');
        $("#lblcusid").text("Cust ID is a required field.Pattern : C00-0001");
        return false;
    }
}

function setAddCustomerButtonDisableOrNot() {
    let check = addCustomerFormValidation();
    if (check) {
        $("#btnAddCustomer").attr('disabled', false);
    } else {
        $("#btnAddCustomer").attr('disabled', true);
    }
}

function checkIfAddCustomerFormValid() {
    var custID = $("#customerId").val();
    if (regCusId.test(custID)) {
        $("#customerName").focus();
        var custName = $("#customerName").val();
        if (regCustName.test(custName)) {
            $("#customerAddress").focus();
            var custAddress = $("#customerAddress").val();
            if (regCustAddress.test(custAddress)) {
                $("#customerSalary").focus();
                var custSalary = $("#customerSalary").val();
                var response = regCustSalary.test(custSalary);
                if (response) {
                    let res = confirm("Do you want to add this Customer..?");
                    if (res) {
                        saveCustomer();
                    }
                } else {
                    $("#customerSalary").focus();
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


$("#selectCusID").keyup(function (event) {
    searchCustId = $("#selectCusID").val();
    if (regCusId.test(searchCustId)) {
        $("#selectCusID").css('border', '2px solid green');
        if (event.key == "Enter") {
            searchDeleteCustomer(searchCustId);
        }
    } else {
        $("#selectCusID").css('border', '2px solid red');
        $("#btnDelete").prop('disabled', true);
    }
});

$("#selectCusID").keyup(function (event) {
    searchCustId = $("#selectCusID").val();
    if (regCusId.test(searchCustId)) {
        $("#selectCusID").css('border', '2px solid green');
        if (event.key == "Enter") {
            searchUpdateCustomer(searchCustId);
        }
    } else {
        $("#selectCusID").css('border', '2px solid red');
        $("#btnDelete").prop('disabled', true);
    }
});

