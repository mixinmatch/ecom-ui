import {Appt, CatalogItem, displayItem, ItemQty, Order} from './Appt';
import {environment} from '../../../environment.prod'
const API_CATALOG=environment.CATALOG_API;
const API_INVENTORY=environment.INVENTORY_API;
const API_ORDER=environment.ORDER_API;
const API_APPT=environment.APPT_API;

export const getCatalogItems = async (): Promise<CatalogItem[]> => {
    const res = await fetch(`/items`);
    // const res = await fetch('/items');
    return await res.json() as CatalogItem[];
}

export const getInventory =  async (uuid: string): Promise<ItemQty> => {
        const res = await fetch(`/item/${uuid}/qty`);
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
        await fetch(`/order`, {
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
        await fetch(`/appt`, {
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