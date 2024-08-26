export class ItemApi{

    getAllItem(){
        return $.ajax({
            url: "http://localhost:8080/pos/item",
            type:"GET",
            data: {
                action: 'getAllItem',
            },
            contentType: "application/json"
        });
    }

    generateItemCode(){
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "GET",
                url: "http://localhost:8080/pos/item",
                data:{
                    action: 'generateItemCode'
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



    saveItem(item){
        return new Promise((resolve, reject)=>{
            let itemJson = JSON.stringify(item);

            const sendAjax = (customerJson)=>{
                $.ajax({
                    url: "http://localhost:8080/pos/item",
                    type: "POST",
                    data: itemJson,
                    contentType: "application/json",
                    success: function (responseText){
                        resolve(responseText);
                    }
                });
            }
            console.log('Save item call');
            sendAjax(itemJson);
        });
    }

    updateItem(item){
        return new Promise((resolve,reject)=>{
            let itemJson = JSON.stringify(item);

            const sendAjax = (itemJson)=>{
                $.ajax({
                    url:"http://localhost:8080/pos/item",
                    type:"PUT",
                    data: itemJson,
                    contentType: "application/json",
                    success: function (responseText){
                        resolve(responseText);
                    }
                })
            }
            console.log("item update call");
            sendAjax(itemJson);
        })
    }

    deleteItem(code){
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "DELETE",
                url: "http://localhost:8080/pos/item?itemCode="+code,
                success: function(responseText) {
                    console.log("trigger ajax");
                    resolve(responseText);
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    reject(new Error(`AJAX request failed with status ${jqXHR.status}`));
                }
            });
        });
    }

}