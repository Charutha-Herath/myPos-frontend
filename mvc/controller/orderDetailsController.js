import {customer_db, order_db} from "../db/db.js";
import {OrderModel} from "../model/placeOrderModel.js";

import {order_details_db} from "../db/db.js";
import {orderModel} from "../model/orderDetailsModel.js";



function populateTableOrderDetails() {
    $('tbody').eq(5).empty();

    console.log("order-db table : ",order_db);

    order_db.map((orderDetails) => {
        $('tbody').eq(5).append(
            `<tr>
                <th scope="row">${orderDetails.order_id}</th> 
                <td>${orderDetails.order_date}</td>
                <td>${orderDetails.customer_id}</td>
                <td>${orderDetails.total}</td>
                <td>${orderDetails.discount}</td>
                <td>${calculateSubtotal(orderDetails.total, orderDetails.discount)}</td>
                <td>${orderDetails.cash}</td>
                <td>${calculateBalance(orderDetails.cash, orderDetails.total, orderDetails.discount)}</td>                
            </tr>`
        );
    });
}



$('#nav-Order_details').on('click', function() {
    populateTableOrderDetails();
    console.log("nav-order-details");
    /*searchField.attr("placeholder", "Search Order Id Here");*/
});


function calculateSubtotal(total, discount) {
    const discountValue = parseFloat(discount) || 0;
    const subtotal = total - (total * (discountValue / 100));
    console.log("subTotal : ",subtotal.toFixed(2));
    return subtotal.toFixed(2); // Assuming you want two decimal places
}

// Helper function to calculate balance based on cash, total, and discount
function calculateBalance(cash, total, discount) {
    const discountValue = parseFloat(discount) || 0;
    const subtotal = calculateSubtotal(total, discount);
    const balance = cash - parseFloat(subtotal);
    console.log("balance : ",balance.toFixed(2));
    return balance.toFixed(2); // Assuming you want two decimal places
}


