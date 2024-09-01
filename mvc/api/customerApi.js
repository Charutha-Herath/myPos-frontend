export class CustomerApi{


    generateCustomerId(){
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "GET",
                url: "http://localhost:8080/pos/customer",
                data:{
                    action: 'generateCustomerId'
                },
                success: function(response) {
                    resolve(response);
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.error('Error:', jqXHR.status, jqXHR.statusText);
                    reject(new Error(`AJAX request failed with status ${jqXHR.status}`));
                }
            });
        });
    }

    getAllCustomer(){
        return $.ajax({
            url: "http://localhost:8080/pos/customer",
            type:"GET",
            data: {
                action: 'getAllCustomer',
            },
            contentType: "application/json"
        });
    }
}