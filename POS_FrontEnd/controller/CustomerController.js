//
// function loadAllCustomers() {
//     $("#customerTable").empty();
//     $.ajax({
//         url: "http://localhost:8080/backEnd/customer?option=GETALL",
//         method: "GET",
//         success: function (resp) {
//             for (const customer of resp) {
//                 let row = `<tr><td>${customer.id}</td><td>${customer.name}</td><td>${customer.address}</td><td>${customer.salary}</td></tr>`;
//                 $("#customerTable").append(row);
//             }
//         }
//     });
// }
//
//
// function saveCustomer() {
//     var data = $("#customerForm").serialize();
//     $.ajax({
//         url: "http://localhost:8080/backEnd/customer",
//         method: "POST",
//         data: data,
//         success: function (res) {
//             if (res.status == 200) {
//                 console.log(res.data);
//                 loadAllCustomers();
//                 clearCustomerFields();
//             } else {
//                 alert(res.data);
//             }
//         },
//         error: function (ob, textStatus, error) {
//             console.log(ob);
//             console.log(textStatus);
//             console.log(error);
//         }
//     });
// }
//
//
//
// function searchDeleteCustomer(searchId) {
//     $.ajax({
//         url: "http://localhost:8080/backEnd/customer?option=SEARCH&CusID=" + searchId,
//         method: "GET",
//         success: function (res) {
//             if (res.status == 200) {
//                 $("#customerName").val(res.name);
//                 $("#customerAddress").val(res.address);
//                 $("#customerSalary").val(res.salary);
//                 $("#btnDelete").prop('disabled', false);
//                 $("#btnDelete").focus();
//             } else {
//                 $("#customerName").val("");
//                 $("#customerAddress").val("");
//                 $("#customerSalary").val("");
//                 $("#btnDelete").prop('disabled', true);
//                 console.error("Customer Not Found.");
//                 alert("Error!" + "Customer Not Found.")
//             }
//         },
//     });
// }
//
// function searchCustomerByTable(searchId) {
//     $.ajax({
//         url: "http://localhost:8080/backEnd/customer?option=SEARCH&CusID=" + searchId,
//         method: "GET",
//         success: function (res) {
//             if (res.status == 200) {
//                 $("#customerTable").empty();
//                 let tableRow = `<tr><td>${res.id}</td><td>${res.name}</td><td>${res.address}</td><td>${res.salary}</td></tr>`;
//                 $("#customerTable").append(tableRow);
//             } else {
//                 loadAllCustomers();
//                 console.error("Customer Not Found.");
//                 alert("Error!" + "Customer Not Found.")
//                 swal({
//                     title: "Error!",
//                     text: "Customer Not Found.",
//                     icon: "warning",
//                     button: "Close",
//                     timer: 2000
//                 });
//             }
//         },
//     });
// }
//
//
// function updateCustomer() {
//     var cusOb = {
//         id: $("#txtSearchCusID").val(),
//         name: $("#customerName").val(),
//         address: $("#customerAddress").val(),
//         salary: $("#customerSalary").val()
//     }
//
//     $.ajax({
//         url: "http://localhost:8080/backEnd/customer",
//         method: "PUT",
//         contentType: "application/json",
//         data: JSON.stringify(cusOb),
//         success: function (res) {
//             if (res.status == 200) {
//                 console.log(res.message)
//                 loadAllCustomers();
//                 clearUpdateCustomerFields();
//                 $("#btnUpdateCustomer").prop('disabled', true);
//             } else if (res.status == 400) {
//                 console.log(res.message);
//             } else {
//                 console.log(res.data);
//             }
//         },
//         error: function (ob, errorStus) {
//             console.log(ob);
//         }
//     });
// }
//
// function deleteCustomer() {
//     let cusId = $("#txtSearchCusID").val();
//     $.ajax({
//         url: "http://localhost:8080/backEnd/customer?CusID=" + cusId,
//         method: "DELETE",
//         success: function (res) {
//             console.log(res);
//             if (res.status == 200) {
//                 clearDeleteCustomerFields();
//                 loadAllCustomers();
//                 $("#btnDelete").prop('disabled', true);
//             } else if (res.status == 400) {
//                 alert(res.data);
//             } else {
//                 alert(res.data);
//             }
//         }
//     })
// }
//
// function clearCustomerFields() {
//     $("#customerId").focus();
//
//     $("#customerId").val("");
//     $("#customerName").val("");
//     $("#customerAddress").val("");
//     $("#customerSalary").val("");
//
//     $("#lblcusid").text("");
//     $("#lblcusname").text("");
//     $("#lblcusaddress").text("");
//     $("#lblcussalary").text("");
//
//     $("#customerId").css('border', '1px solid #ced4da');
//     $("#customerName").css('border', '1px solid #ced4da');
//     $("#customerAddress").css('border', '1px solid #ced4da');
//     $("#customerSalary").css('border', '1px solid #ced4da');
//
//     $("#btnAddCustomer").prop('disabled', true);
// }
//
//
// $("#btnAddCustomer").prop('disabled', true);
//
// $("#btnAddCustomer").click(function () {
//     // let res = confirm("Do you want to add this customer?");
//     // if (res) {
//     //     saveCustomer();
//     // }
//     saveCustomer();
// });
//
// $("#btnUpdateCustomer").prop('disabled', true);
//
// $("#btnUpdateCustomer").click(function () {
//     let res = confirm("Do you want to update this customer?");
//     if (res) {
//         updateCustomer();
//     }
// });
//
//
// $("#btnDelete").prop('disabled', true);
//
// $("#btnDelete").click(function () {
//     let res = confirm("Do you want to delete this customer?");
//     if (res) {
//         deleteCustomer();
//     }
// });
//
// $("#txtSearchCusID").on('keyup', function (event) {
//     var custId = $("#txtSearchCusID").val();
//     if (regCusId.test(custId)) {
//         $("#txtSearchCusID").css('border', '2px solid green');
//         if (event.key == "Enter") {
//             searchCustomerByTable(custId);
//         }
//     } else {
//         $("#txtSearchCusID").css('border', '2px solid red');
//     }
// });
//
// $("#btnSearch").click(function () {
//     var custId = $("#txtSearchCusID").val();
//     searchCustomerByTable(custId);
// });
//
//
//
// let regCusId = /^(C00-)[0-9]{4}$/;
// let regCustName = /^[A-z .]{3,}$/;
// let regCustAddress = /^[A-z ,.0-9]{3,}$/;
// let regCustSalary = /^[1-9][0-9]{3,}(.[0-9]{2})?$/;
//
// let searchCustId;
//
// loadAllCustomers();
//
// $('#customerId,#customerName,#customerAddress,#customerSalary').on('keydown', function (event) {
//     if (event.key == "Tab") {
//         event.preventDefault();
//     }
// });
//
// $('#customerId,#customerName,#customerSalary,#customerSalary').on('blur', function () {
//     addCustomerFormValidation();
// });
//
// $("#customerId").on('keyup', function (event) {
//     setAddCustomerButtonDisableOrNot();
//     if (event.key == "Enter") {
//         checkIfAddCustomerFormValid();
//     }
// });
//
// $("#customerName").on('keyup', function (event) {
//     setAddCustomerButtonDisableOrNot();
//     if (event.key == "Enter") {
//         checkIfAddCustomerFormValid();
//     }
// });
//
// $("#customerAddress").on('keyup', function (event) {
//     setAddCustomerButtonDisableOrNot();
//     if (event.key == "Enter") {
//         checkIfAddCustomerFormValid();
//     }
// });
//
// $("#customerSalary").on('keyup', function (event) {
//     setAddCustomerButtonDisableOrNot();
//     if (event.key == "Enter") {
//         checkIfAddCustomerFormValid();
//     }
// });
//
// function addCustomerFormValidation() {
//     var custId = $("#customerId").val();
//     $("#customerId").css('border', '2px solid green');
//     $("#lblcusid").text("");
//     if (regCusId.test(custId)) {
//         var custName = $("#customerName").val();
//         if (regCustName.test(custName)) {
//             $("#customerName").css('border', '2px solid green');
//             $("#lblcusname").text("");
//             var custAddress = $("#customerAddress").val();
//             if (regCustAddress.test(custAddress)) {
//                 var custSalary = $("#customerSalary").val();
//                 var response = regCustSalary.test(custSalary);
//                 $("#customerAddress").css('border', '2px solid green');
//                 $("#lblcusaddress").text("");
//                 if (response) {
//                     $("#customerSalary").css('border', '2px solid green');
//                     $("#lblcussalary").text("");
//                     return true;
//                 } else {
//                     $("#customerSalary").css('border', '2px solid red');
//                     $("#lblcussalary").text("Customer Salary is a required field.Pattern : 1000.00 or 1000");
//                     return false;
//                 }
//             } else {
//                 $("#customerAddress").css('border', '2px solid red');
//                 $("#lblcusaddress").text("Customer address is a required field.");
//                 return false;
//             }
//         } else {
//             $("#customerName").css('border', '2px solid red');
//             $("#lblcusname").text("Customer name is a required field.");
//             return false;
//         }
//     } else {
//         $("#customerId").css('border', '2px solid red');
//         $("#lblcusid").text("Cust ID is a required field.Pattern : C00-0001");
//         return false;
//     }
// }
//
// function setAddCustomerButtonDisableOrNot() {
//     let check = addCustomerFormValidation();
//     if (check) {
//         $("#btnAddCustomer").attr('disabled', false);
//     } else {
//         $("#btnAddCustomer").attr('disabled', true);
//     }
// }
//
// function checkIfAddCustomerFormValid() {
//     var custID = $("#customerId").val();
//     if (regCusId.test(custID)) {
//         $("#customerName").focus();
//         var custName = $("#customerName").val();
//         if (regCustName.test(custName)) {
//             $("#customerAddress").focus();
//             var custAddress = $("#customerAddress").val();
//             if (regCustAddress.test(custAddress)) {
//                 $("#customerSalary").focus();
//                 var custSalary = $("#customerSalary").val();
//                 var response = regCustSalary.test(custSalary);
//                 if (response) {
//                     let res = confirm("Do you really want to add this Customer..?");
//                     if (res) {
//                         saveCustomer();
//                     }
//                 } else {
//                     $("#customerSalary").focus();
//                 }
//             } else {
//                 $("#customerAddress").focus();
//             }
//         } else {
//             $("#customerName").focus();
//         }
//     } else {
//         $("#customerId").focus();
//     }
// }
//
//
// $("#txtSearchCusID").keyup(function (event) {
//     searchCustId = $("#txtSearchCusID").val();
//     if (regCusId.test(searchCustId)) {
//         $("#txtSearchCusID").css('border', '2px solid green');
//         if (event.key == "Enter") {
//             searchDeleteCustomer(searchCustId);
//         }
//     } else {
//         $("#txtSearchCusID").css('border', '2px solid red');
//         $("#btnDelete").prop('disabled', true);
//     }
// });

loadAllCustomer();
// $("#btnSaveCustomer").attr('disabled', true);



$("#btnSaveCustomer").click(function () {
    let data = $("#customerForm").serialize();

    if ($("#txtCusId").val() == '') {
        alert("Can not be Customer Id empty");
    } else if ($("#txtCusName").val() == '') {
        alert("Can not be Customer Name empty");
    }else if ($("#txtCusAddress").val() == '') {
        alert("Can not be Customer Address empty");
    }else if ($("#txtCusContact").val() == '') {
        alert("Can not be Customer Contact empty");
    }else{
        console.log(data);
        $.ajax({
            url: "customer",
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

    }

});

$("#btnGetAllCustomer").click(function () {
    resetCustomer();
    loadAllCustomer();

});

function resetCustomer() {
    $("#txtCusId").val("");
    $("#txtCusName").val("");
    $("#txtCusAddress").val("");
    $("#txtCusContact").val("");
    $("#txtSearchCustomer").val("");
}

function loadAllCustomer() {
    $("#customerTable").empty();
    $.ajax({
        url: "customer?option=GETALL",
        method: "GET",
        success: function (resp) {
            for (const customer of resp.data) {
                let row = `<tr><td>${customer.id}</td><td>${customer.name}</td><td>${customer.address}</td><td>${customer.contact}</td></tr>`;
                $("#customerTable").append(row);
                // loadCustomerComboBoxData("<option>"+customer.id+"</option>");
            }
            bindClickEvents();

        }
    });
}


$("#btnDeleteCustomer").click(function () {
    let customerID = $("#txtCusId").val();

    $.ajax({
        url: "customer?customerID=" + customerID,
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
        id: $("#txtCusId").val(),
        name: $("#txtCusName").val(),
        address: $("#txtCusAddress").val(),
        contact: $("#txtCusContact").val()
    };
    $.ajax({
        url: "customer",
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

$("#btnSearchCustomer").click(function () {
    let customerID = $("#txtSearchCustomer").val();
    $("#customerTable").empty();
    $.ajax({
        url: "customer?option=SEARCH&customerID=" + customerID,
        method: "GET",
        success: function (resp) {
            for (const customer of resp.data) {
                let row = `<tr><td>${customer.id}</td><td>${customer.name}</td><td>${customer.address}</td><td>${customer.contact}</td></tr>`;
                $("#customerTable").append(row);
            }

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

        $("#txtCusId").val(id);
        $("#txtCusName").val(name);
        $("#txtCusAddress").val(address);
        $("#txtCusContact").val(contact);
    });
}