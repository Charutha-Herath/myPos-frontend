export class PlaceOrderApi{

    getAllItemCodes() {
        return $.ajax({
            url: "http://localhost:8080/pos/item",
            type: "GET",
            data: {
                action: 'getAllItemCodes',
            },
            contentType: "application/json"
        });
    }

    getItemDetails(itemId) {
        return $.ajax({
            url: "http://localhost:8080/pos/item",
            type: "GET",
            data: {
                action: 'getItemDetails',
                item_id:itemId
            },
            contentType: "application/json"
        });
    }

    getAllCustomerIds() {
        return $.ajax({
            url: "http://localhost:8080/pos/customer",
            type: "GET",
            data: {
                action: 'getAllCustomerIds',
            },
            contentType: "application/json"
        });
    }

    getCustomerDetails(id){
        return $.ajax({
            url: "http://localhost:8080/pos/customer",
            type: "GET",
            data: {
                action: 'getCustomerDetails',
                customerId:id
            },
            contentType: "application/json"
        });
    }
}