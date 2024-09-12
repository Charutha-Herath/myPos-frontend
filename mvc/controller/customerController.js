import {customer_db} from "../db/db.js";
import {CustomerModel} from "../model/customerModel.js";
import {CustomerApi} from "../api/customerApi.js";

let customerApi = new CustomerApi();

let submit = $('#btn-customer-add').eq(0);
let update_btn = $('#btn-customer-update').eq(0);
let delete_btn = $('#btn-customer-delete').eq(0);
let reset = $('#btn-customer-reset').eq(0);

let customer_id = $('#customer_id');
let name = $('#customer_name');
let address = $('#address');
let contact = $('#contact');

let searchBtn=$('#search');
let searchField=$('#searchField');


const namePattern = /^[a-zA-Zà-žÀ-Ž' -]+$/;
const mobilePattern = new RegExp("^(?:0|94|\\+94|0094)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|91)(0|2|3|4|5|7|9)|7(0|1|2|4|5|6|7|8)\\d)\\d{6}$");



$('#nav-customer').on('click', function() {
    customer_id.val(generateCustomerId());
    //generateCustomerId();
    populateCustomerTable();
    delete_btn.prop("disabled", true);
    update_btn.prop("disabled", true);
    //searchField.attr("placeholder", "Search Customer Here");
});

function generateCustomerId() {

    customerApi.generateCustomerId().then((code) => {
        customer_id.val(code);
    }).catch((error) => {
        showError('Fetching Error', 'Error generating item CODE');
        console.error('Error generating item CODE:', error);
    });
    /*let highestCustId = 0;

    for (let i = 0; i < customer_db.length; i++) {
        // Extract the numeric part of the item code
        const numericPart = parseInt(customer_db[i].customer_id.split('-')[1]);

        // Check if the numeric part is greater than the current highest
        if (!isNaN(numericPart) && numericPart > highestCustId) {
            highestCustId = numericPart;
        }
    }

    // Increment the highest numeric part and format as "item-XXX"
    return `cust-${String(highestCustId + 1).padStart(3, '0')}`;*/
}

function resetColumns() {
    reset.click();
    //customer_id.val(generateCustomerId());
    delete_btn.prop("disabled", true);
    update_btn.prop("disabled", true);
    submit.prop("disabled",false);
}

reset.on('click', function(e) {
    e.preventDefault();
    customer_id.val(generateCustomerId());
    name.val('');
    address.val('');
    contact.val('');
    submit.prop("disabled", false);
    delete_btn.prop("disabled", true);
    update_btn.prop("disabled", true);
});

function validation(value,message,test) {
    if(!value){
        showValidationError('Null Input','Input '+message);
        return false;
    }
    if(test===null){
        return true;
    }
    if(!test){
        showValidationError('Invalid Input','Invalid Input '+message);
        return false;
    }
    return true;
}

function showValidationError(title, text) {
    Swal.fire({
        icon: 'error',
        title: title,
        text: text

    });
}

submit.on('click', (e) => {
    e.preventDefault();

    let customerIdValue = customer_id.val();
    let nameValue = name.val().trim();
    let addressValue = address.val().trim();
    let contactValue = contact.val().trim();


    if(
        /*validation(nameValue, "customer name", null) &&*/
        validation(nameValue, "customer name", namePattern.test(nameValue)) &&
        validation(addressValue, "Address", null) &&
        validation(contactValue, "Contact", mobilePattern.test(contactValue))){
        let customer = new CustomerModel(
            customerIdValue,
            nameValue,
            addressValue,
            contactValue

        );

        let v = customerApi.saveCustomer(customer);
        console.log("Response yakoo : ",v)

        Swal.fire(
            'Save Successfully!',
            'Successful',
            'success'
        );
        console.log("Customer array : " ,customer)
        customer_db.push(customer);

        populateCustomerTable();

        resetColumns();
    }

});

function populateCustomerTable(){

    customerApi.getAllCustomer().then((customerDb) => {
        // Log the response to check its structure
        console.log("Response from getAllCustomer:", customerDb);

        // Ensure itemDb is an array
        if (Array.isArray(customerDb)) {
            $('#customer-table-body').eq(0).empty();
            customerDb.forEach((customer) => {
                $('#customer-table-body').eq(0).append(
                    `<tr>
                        <th scope="row">${customer.customerId}</th>
                        <td>${customer.customerName}</td>
                        <td>${customer.contact}</td>
                        <td>${customer.address}</td>
                        
                    </tr>`
                );
            });
        } else {
            console.error("Invalid response format. Expected an array.");
            showError('Invalid Response', 'Unexpected data format from server.');
        }
    }).catch((error) => {
        console.log(error);
        showError('fetch Unsuccessful', error);
    });



/*    $('tbody').eq(3).empty();
    customer_db.map((customer) => {
        $('tbody').eq(3).append(
            `<tr>
                <th scope="row">${customer.customer_id}</th>
                <td>${customer.name}</td>
                <td>${customer.address}</td>
                <td>${customer.contact}</td>
            </tr>`
        );
    });*/
}

$('#customerTable').on('click', 'tbody tr', function() {
    let customerIdValue = $(this).find('th').text();
    let nameValue = $(this).find('td:eq(0)').text();
    let contactValue = $(this).find('td:eq(1)').text();
    let addressValue = $(this).find('td:eq(2)').text();

    console.log("customer table details : ",contactValue," ",nameValue," ",addressValue," ",contactValue);

    customer_id.val(customerIdValue);
    name.val(nameValue);
    address.val(addressValue);
    contact.val(contactValue);


    submit.prop("disabled", true);
    delete_btn.prop("disabled", false);
    update_btn.prop("disabled", false);

});

update_btn.on('click', () => {

    let customerIdValue = customer_id.val();
    let nameValue = name.val().trim();
    let addressValue = address.val().trim();
    let contactValue = contact.val().trim();


    if( validation(nameValue, "customer name", null) &&
        validation(addressValue, "Address", null) &&
        validation(contactValue, "Contact", mobilePattern.test(contactValue))) {

        let customerModel = new CustomerModel(
            customerIdValue,
            nameValue,
            addressValue,
            contactValue
        );

        customerApi.updateCustomer(customerModel).then((responseText)=>{
            Swal.fire({
                icon: 'success',
                title: 'Customer Updated Successful',
                showConfirmButton: false,
                timer: 1500
            });
            populateCustomerTable();
            resetColumns();
        });

        /*customer_db.map((customer) => {
            if (customer.customer_id === customerIdValue) {
                customer.name = nameValue;
                customer.address = addressValue;
                customer.contact = contactValue;
            }
        });*/

       /* Swal.fire(
            'Update Successfully !',
            'Successful',
            'success'
        )*/

       /* populateCustomerTable();

        resetColumns();*/

    }

});

/*btn.on('click', () => {

});*/
delete_btn.on('click', () => {

    //let customerIdValue = parseInt(customer_id.val(), 10);
    let customerIdValue = customer_id.val();

    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Delete'
    }).then((result) => {
        if (result.isConfirmed) {
            customerApi.deleteCustomer(customerIdValue)
                .then((responseText) => {
                    console.log("awaa...");
                    Swal.fire(
                        'Delete Customer',
                        'Successful',
                        'success'
                    );
                    populateCustomerTable();
                    resetColumns();
                })
                .catch((error) => {
                    console.log(error);
                    showError('Student delete Unsuccessful', error);
                });
        }
    });


});