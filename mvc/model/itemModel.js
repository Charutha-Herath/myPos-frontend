export class ItemModel{

    constructor(item_code,item_name,price,qty_on_hand,getQty) {
        this.item_code = item_code;
        this.item_name = item_name;
        this.price = price;
        this.qty_on_hand = qty_on_hand;
        this.getQty = getQty;
    }

    /*constructor(item_code,item_name,price,qty_on_hand,getQty) {
        this.item_code = item_code;
        this.item_name = item_name;
        this.price = price;
        this.qty_on_hand = qty_on_hand;
        this.getQty = getQty;
    }*/
}