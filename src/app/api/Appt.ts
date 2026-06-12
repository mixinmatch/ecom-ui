export interface Item {
    id: string,
    qty: number,
};

export interface Appt {
    clientId: string,
    clientEmail: string,
    time: Date,
    item: Item
};

export interface Order {
        merchantId: string,
        itemId: string,
        qty: number,
        cost: number,
        clientEmail: string
}

export interface CatalogItem {
    id: string,
    name: string,
    merchant: string,
    merchantId: string,
    photoLink: string,
    isLiquidationSale: boolean,
}
export interface ItemQty {
    id: string,
    qty: number
};
export interface displayItem {
    itemID: string,
    itemName: string,
    photolink: string,
    merchant: string,
    isLiquidated: boolean,
    qty: number
};