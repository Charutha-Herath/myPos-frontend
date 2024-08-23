import {item_db} from "../db/db.js";
import {ItemModel} from "../model/itemModel.js";

import {customer_db} from "../db/db.js";
import {CustomerModel} from "../model/customerModel.js";

import {order_db} from "../db/db.js";
import {OrderModel} from "../model/placeOrderModel.js";

import {order_details_db} from "../db/db.js";
import {orderModel} from "../model/orderDetailsModel.js";

let customerIdCB = $('#order_customer_id');
let orderId=$('#order_id');
let customerName=$('#order_customer_name');
let total=$('#total');
let discountInput = $('#discount');
let subTotalInput = $('#sub_total');
let cashInput=$('#Cash');
let balanceInput=$('#balance');


let itemIdCB = $('#order_item_code');
let itemName=$('#order_item_name');
let price=$('#order_price');
let qtyOnHand=$('#qty_on_hand');
let qty=$('#getQty');


let submitBtn=$('#purchase_btn');

let add = $('#order_add_btn');
let updateBtn2=$('#order_update_btn');
let removeBtn2=$('#order_delete_btn');
let resetItemDetails=$('#order_reset_btn');


let items = [];




$('#nav-place-order').on('click', function() {
    resetItemDetails.click();
    updateBtn2.prop("disabled",true);
    removeBtn2.prop("disabled",true);
    orderId.val(generateOrderId());
    populateCustomerIDs();
    generateOrderId();
    populateItemIDs();
    generateCurrentDate();
    /*searchField.attr("placeholder", "Search Order Id Here");*/

});
function generateCurrentDate(){
    $("#order_date").val(new Date().toISOString().slice(0, 10));
}


function generateOrderId() {
    let highestOrderId = 0;

    for (let i = 0; i < order_db.length; i++) {
        // Extract the numeric part of the item code
        const numericPart = parseInt(order_db[i].order_id.split('-')[1]);

        // Check if the numeric part is greater than the current highest
        if (!isNaN(numericPart) && numericPart > highestOrderId) {
            highestOrderId = numericPart;
        }
    }

    // Increment the highest numeric part and format as "item-XXX"
    return `order-${String(highestOrderId + 1).padStart(3, '0')}`;
}

function populateItemIDs() {

    // Clear existing options except the default one
    itemIdCB.find("option:not(:first-child)").remove();

    // Iterate through the customerArray and add options to the select element
    for (let i = 0; i < item_db.length; i++) {
        itemIdCB.append($("<option>", {
            value: item_db[i].item_code,
            text: item_db[i].item_code
        }));
    }
}


function populateCustomerIDs() {

    // Clear existing options except the default one
    customerIdCB.find("option:not(:first-child)").remove();

    // Iterate through the customerArray and add options to the select element
    for (let i = 0; i < customer_db.length; i++) {
        customerIdCB.append($("<option>", {
            value: customer_db[i].customer_id,
            text: customer_db[i].customer_id
        }));
    }
}

add.on("click", function () {
    let itemCodeValue = itemIdCB.val();
    let qtyValue = parseInt(qty.val());

    if (qtyOnHand.val() >= qtyValue) {
        let itemNameValue = itemName.val();
        let priceValue = price.val();
        let qtyOnHandValue = qtyOnHand.val();

        /*Add a new item to the items array*/
        items.push({
            itemCode: itemCodeValue,
            itemName: itemNameValue,
            priceValue: priceValue,
            qtyOnHand: qtyOnHandValue,
            getQty: qtyValue
        });

        console.log("Item array : ",items);

        /*Populate the Item table*/
        populateItemTable();

        /*Reset the item details*/
        resetItemDetails.click();
    } else {
        showValidationError('Invalid Input', 'Out of stock');
    }

    total.val(calculateTotal());

    discountInput.onclick;
});

function showValidationError(title, text) {
    Swal.fire({
        icon: 'error',
        title: title,
        text: text
    });
}

function populateItemTable() {
    $('tbody').eq(0).empty();

    console.log("Items x array : ",items);

    items.map((item) => {
        $('tbody').eq(0).append(
            `<tr>
                <th scope="row">${item.itemCode}</th>
                <td>${item.itemName}</td>
                <td>${item.priceValue}</td>
                <td>${item.qtyOnHand}</td>
                <td>${item.getQty}</td>
            </tr>`
        );
    });
}

function calculateTotal() {
    let total = 0;
    items.forEach((item) => {
        total += item.priceValue * item.getQty;
    });
    return total;
}

discountInput.on("input", function() {
    const discountValue = parseFloat(discountInput.val()) || 0; // Get the discount value as a float
    const totalValue = calculateTotal(); // Calculate the total based on your logic
    const subtotalValue = totalValue - (totalValue * (discountValue / 100)); // Calculate the subtotal

    // Update the sub-total input field
    subTotalInput.val(subtotalValue);
});

cashInput.on("input", function() {
    const cashValue = parseFloat(cashInput.val()) || 0; // Get the cash value as a float
    const totalValue = parseFloat(subTotalInput.val())||0; // Calculate the total based on your logic
    const balanceValue = cashValue - totalValue; // Calculate the balance

    // Update the balance input field
    balanceInput.val(balanceValue);
});

resetItemDetails.on("click", function () {
    itemIdCB.val('Select Item Code');
    qty.val('');
    itemName.val('');
    price.val('');
    qtyOnHand.val('');

    updateBtn2.prop("disabled", true);
    removeBtn2.prop("disabled",true);
    add.prop("disabled", false);
});

itemIdCB.on("change", function() {
    // Capture the selected value in a variable
    let selectedValue = $(this).val();

    let itemObj = $.grep(item_db, function(item) {
        return item.item_code === selectedValue;
    });

    if (itemObj.length > 0) {
        // Access the first element in the filtered array
        itemName.val(itemObj[0].item_name); // Assuming there is an 'item_name' property
        price.val(itemObj[0].price);
        qtyOnHand.val(itemObj[0].qty_on_hand);
    }

    // Check if the item is already in the items array
    let existingItem = items.find(item => item.itemCode === selectedValue);

    if (existingItem) {
        updateBtn2.prop("disabled", false);
        removeBtn2.prop("disabled",false);
        add.prop("disabled", true);
        qty.val(existingItem.qtyValue);
    }
});

customerIdCB.on("change", function() {
    // Capture the selected value in a variable
    let selectedValue = $(this).val();

    let customerObj = $.grep(customer_db, function(customer) {
        return customer.customer_id === selectedValue;
    });

    if (customerObj.length > 0) {
        // Access the first element in the filtered array
        customerName.val(customerObj[0].name);
    }
});

$('#item-order-table').on('click', 'tbody tr', function() {

    let itemCodeValue = $(this).find('th').text();
    let itemNameValue = $(this).find('td:eq(0)').text();
    let priceValue = $(this).find('td:eq(1)').text();
    let qtyOnHandValue = $(this).find('td:eq(2)').text();
    let qtyValue=$(this).find('td:eq(3)').text();

    itemIdCB.val(itemCodeValue);
    itemName.val(itemNameValue);
    price.val(priceValue);
    qtyOnHand.val(qtyOnHandValue);
    qty.val(qtyValue);

    updateBtn2.prop("disabled", false);
    removeBtn2.prop("disabled",false);
    add.prop("disabled", true);


});

removeBtn2.on("click", function () {
    let index = items.findIndex(item => item.itemCode === itemIdCB.val());
    items.splice(index, 1);
    populateItemTable();
    resetItemDetails.click();
    total.val(calculateTotal());

    subTotalInput.val('');
    cashInput.val('');
    balanceInput.val('');
});

updateBtn2.on("click",function () {

    let itemCodeValue = itemIdCB.val();
    let qtyValue = parseInt(qty.val());

    /*Check if the item is already in the items array*/
    let existingItem = items.find(item => item.itemCode === itemCodeValue);

    if (existingItem) {
        if (qtyOnHand.val() >= qtyValue) {
            /*Update the quantity of the existing item*/
            existingItem.getQty = qtyValue;

            /*Populate the Item table*/
            populateItemTable();

            /*Reset the item details*/
            resetItemDetails.click();
        } else {
            showValidationError('Invalid Input', 'Out of stock');
        }
    }

    total.val(calculateTotal());

});


submitBtn.on("click", function (e) {

    e.preventDefault();

    // Get the data needed for the order
    const orderDate = $("#order_date").val();
    const orderId = $("#order_id").val();
    const customerId = $("#order_customer_id").val();
    const total = $("#total").val();
    const discount = $("#discount").val();
    const cash = $("#Cash").val();
    const balanceInput1=$('#balance').val();

    // Validate order data
    if (!orderDate) {
        showValidationError('Null Input', 'Please select an order date');
        return;
    }

    if (!orderId) {
        showValidationError('Null Input', 'Please generate an order ID');
        return;
    }

    if (customerId === "Select Customer Id") {
        showValidationError('Invalid Input', 'Please select a customer');
        return;
    }

    if (!total || parseFloat(total) <= 0) {
        showValidationError('Invalid Input', 'Total must be a positive number');
        return;
    }

    if (!cash || parseFloat(cash) < 0) {
        showValidationError('Invalid Input', 'Cash amount must be a positive number');
        return;
    }

    const discountValue = parseFloat(discount);
    if (isNaN(discountValue) || discountValue < 0 || discountValue > 100) {
        showValidationError('Invalid Input', 'Discount must be a number between 0 and 100');
        return;
    }
    if (balanceInput1 < 0) {
        showValidationError('Invalid Input', 'Cash Insufficient');
        return;
    }

    // Create an order instance
    const order = new OrderModel(orderDate, orderId, customerId, total, discount, cash);
    console.log("order array : ",order);
    // Add the order to the order_db array
    order_db.push(order);

    // Loop through the items in your order details
    items.forEach(item => {
        const orderDetail = new orderModel(orderId, item.itemCode, item.priceValue, item.getQty);
        console.log("orderDetails array : ",orderDetail);
        order_details_db.push(orderDetail);

        item_db.forEach((itemObj) => {
            if (itemObj.item_code === item.itemCode) {
                itemObj.qty_on_hand -= item.getQty;
            }
        });
    });

    clearAll();

    /*customerName.val('');
    total='';
    discount.val();
    subTotalInput.val();
    cashInput.val();
    balanceInput.val();*/

    items = [];

    $("#item-order-table tbody").empty()


    Swal.fire(
        'Order Placed Successfully!',
        'The order has been saved.',
        'success'
    );


});

function clearAll(){

    customerName.val('')
    total.val('')
    discountInput.val('')
    subTotalInput.val('')
    cashInput.val('')
    balanceInput.val('')


    $("#nav-place-order.onclick").onclick


    populateCustomerIDs();
    orderId.val(generateOrderId());
    populateItemIDs();
    generateCurrentDate();
}



