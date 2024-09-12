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

    saveCustomer(customer){
        return new Promise((resolve, reject)=>{
            let customerJson = JSON.stringify(customer);

            const sendAjax = (customerJson)=>{
                $.ajax({
                    url: "http://localhost:8080/pos/customer",
                    type: "POST",
                    data: customerJson,
                    contentType: "application/json",
                    success: function (responseText){
                        resolve(responseText);
                    }
                });
            }
            console.log('Save customer call');
            sendAjax(customerJson);
        })
    }


    updateCustomer(customer){
        return new Promise((resolve,reject)=>{
            let customerJson = JSON.stringify(customer);

            const sendAjax = (customerJson)=>{
                $.ajax({
                    url:"http://localhost:8080/pos/customer",
                    type:"PUT",
                    data: customerJson,
                    contentType: "application/json",
                    success: function (responseText){
                        resolve(responseText);
                    }
                })
            }
            console.log("customer update call");
            sendAjax(customerJson);
        })
    }


    deleteCustomer(custId){
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "DELETE",
                url: "http://localhost:8080/pos/customer?customerId="+custId,
                success: function(responseText) {
                    console.log("herath");
                    resolve(responseText);
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    reject(new Error(`AJAX request failed with status ${jqXHR.status}`));
                }
            });
        });
    }
}