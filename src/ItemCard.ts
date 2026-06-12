import { Component, signal, inject, computed, effect, input } from '@angular/core';
import { displayItem, Item } from './app/api/Appt';
import { OrderModal } from './app/orderModal';
import {ApptOrderModal} from './app/apptOrderModal';

@Component({
  selector: 'item-card',
  template: `
    <div class="max-w-sm rounded overflow-hidden shadow-lg" >
        <img
            class="w-full"
            [src]="item().photolink"
            alt="article"
            style="height: 500px;"       
            />            
        <div class="px-6 py-4">          
            <div class="text-gray-700 text-base">{{item().itemName}}</div>
        </div>
        <div class="px-6"><span><strong>{{item().merchant}}</strong></span></div>
        <div class="px-6"><strong>$1,000</strong></div>
        <div class="">
            <div class="px-6">
              <span>{{ item().isLiquidated ? "Item price reduced.": ""}} </span>
            </div>
            <div class="px-6"> <span>{{ item().qty}} remaining </span> </div>
                <div class="py-2 ml-auto flex gap-1 px-6">
                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" (click)="onClicked(item().itemID, item().itemName)"> Buy </button>
                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" (click)="onClickedAppt(item().itemID, item().itemName)"> Try in Store </button>
                </div>
          </div>
    </div>

    @if(showOrderModal()) {
    <order-modal [(isModalOpen)]="showOrderModal" [itemId]="itemId()" [itemName]="itemName()" />
    }

    @if (showApptOrderModal()) {
    <appt-order-modal [(isModalOpen)]="showApptOrderModal" [itemId]="itemId()" [itemName]="itemName()" />
    }
  `,

  styles:``,
  imports: [OrderModal, ApptOrderModal]
})
export class ItemCard {
    item = input<displayItem>({
        itemID: "",
        itemName: "",
        merchant: "",
        photolink: "",
        isLiquidated: false,
        qty: -1
    });
    itemName = signal("");
    itemId = signal("")

    showOrderModal = signal(false);
    showApptOrderModal = signal(false);

  onClicked(id: string, name: string) {
    this.showOrderModal.set(true);
    this.itemId.set(id);
    this.itemName.set(name);
  }
  onClickedAppt(id: string, name: string) {
    this.itemId.set(id);
    this.itemName.set(name);
    this.showApptOrderModal.set(true);
  }
}