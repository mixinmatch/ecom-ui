import {Appt, CatalogItem, displayItem, ItemQty, Order} from './Appt';
const API_CATALOG="localhost:8080"
const API_INVENTORY="localhost:5053"
const API_ORDER="localhost:5274"
const API_APPT="localhost:5062"

export const getCatalogItems = async (): Promise<CatalogItem[]> => {
    const res = await fetch(`http://${API_CATALOG}/items`);
    // const res = await fetch('/items');
    return await res.json() as CatalogItem[];
}

export const getInventory =  async (uuid: string): Promise<ItemQty> => {
        const res = await fetch(`http://${API_INVENTORY}/item/${uuid}/qty`);
        // const res = await fetch(`/item/${uuid}/qty`);

        return await res.json() as ItemQty;
    }

    export const getItems = async(): Promise<displayItem[]> =>{
        const cItems = await getCatalogItems();
        const dItem: displayItem[] = cItems.map(c => {
            return {
                itemID: c.id,
                itemName: c.name,
                merchant: c.merchant,
                isLiquidated: c.isLiquidationSale,
                //set later
                qty: -1
            }
        });
        for (const item of dItem) {
            const i = await getInventory(item.itemID);
            item.qty = i.qty;
        };


        return Promise.resolve(dItem);
    }

    export const createOrder = async(order: Order) =>{
        await fetch(`http://${API_ORDER}/order`, {
            method: "POST",
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
            "merchantId": order.merchantId,
            "itemId": order.itemId,            
            "cost": 9.99, //tochange
            "qty": order.qty, 
            })
        })
    }

    export const createAppt = async (appt: Appt) => {
        await fetch(`http://${API_APPT}/appt`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                "clientId": "622af152-3e26-454b-9134-4b859c0e2dc2",
                "clientEmail": appt.clientEmail,
                "time": new Date(Date.now()),
                "Item": {
                    "id" : appt.item.id,
                    "qty": 1
                }
            })
        })
    }