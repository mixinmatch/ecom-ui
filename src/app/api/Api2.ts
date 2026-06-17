import { Injectable } from "@angular/core";
import { environment } from '../../environments/environment'; // Generic import
import {Appt, CatalogItem, displayItem, ItemQty, Order} from './Appt';

@Injectable({
  providedIn: 'root'
})
export class Api {

  getCatalogItems = async (): Promise<CatalogItem[]> => {
      const res = await fetch(`/api/catalog-service/items`);
      // const res = await fetch('/items');
      return await res.json() as CatalogItem[];
  }
  
  getInventory =  async (uuid: string): Promise<ItemQty> => {
          const res = await fetch(`/api/inventory-service/item/${uuid}/qty`);
          // const res = await fetch(`/item/${uuid}/qty`);
  
          return await res.json() as ItemQty;
      }
  
    getItems = async(): Promise<displayItem[]> =>{
          const cItems = await this.getCatalogItems();
          const dItem: displayItem[] = cItems.map(c => {
              return {
                  itemID: c.id,
                  itemName: c.name,
                  merchant: c.merchant,
                  photolink: c.photoLink,
                  isLiquidated: c.isLiquidationSale,
                  //set later
                  qty: -1
              }
          });
          for (const item of dItem) {
              const i = await this.getInventory(item.itemID);
              item.qty = i.qty;
          };
  
  
          return Promise.resolve(dItem);
      }
  
    createOrder = async(order: Order) =>{
          await fetch(`/api/order-service/order`, {
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
  
      createAppt = async (appt: Appt) => {
          await fetch(`/api/appointment-service/appt`, {
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
}