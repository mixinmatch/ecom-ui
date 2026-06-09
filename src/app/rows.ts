import { Component, signal, inject, computed, effect } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { getItems } from './api/api';
import { OrderModal } from './orderModal';
import { ApptOrderModal } from './apptOrderModal';
import { ToasterComponent } from './services/toast';

@Component({
  selector: 'rows',
  template: `
  <div class="flex mt-12 mb-2 buttons-table">
  </div>
  <table class="shadow-md ml-[2vw] mr-[2vw]">
    <thead class="pt-6">
      <tr [style.height]="'5em'">
      </tr>
    </thead>
    <tbody class="scroll-container">
    @for (subArray of rows(); track subArray) {
        @for (item of subArray; track item) {
          <div class="mt-10 mb-10 flex-col gap-2 ml-10">
            <div class="p-2">
            @if(item.itemName == "Expensive Coat") {
                <img
                  class="fit-picture"
                  src="/images/coat.jpg"
                  alt="Pricy coat"
                  width="50" height="60"
                  />
            }
            @if(item.itemName == "Race car") {
                <img
                  class="fit-picture"
                  src="/images/car.jpg"
                  alt="Uulgati"
                  width="50" height="60"
                  />
            }
            @if(item.itemName == "Sports car") {
                <img
                  class="fit-picture"
                  src="/images/sportcar.jpg"
                  alt="Sports car"
                  width="50" height="60"
                  />
            }
            @if(item.itemName == "Watch") {
                <img
                  class="fit-picture"
                  src="/images/watch.jpg"
                  alt="watch"
                  width="50" height="60"
                  />
            }
            @if(item.itemName == "Electric bike") {
                <img
                  class="fit-picture"
                  src="https://images.unsplash.com/photo-1620802051782-725fa33db067?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Bike"
                  width="50" height="60"
                  />
            }
              <div>          
                <span>{{item.itemName}}</span>
              </div>
                <span>Seller: {{item.merchant}}</span>            
            </div>
            <div class="p-2">
            <div>
              <span>{{ item.isLiquidated ? "Reduced Price": ""}} </span>
              </div>
              <span>{{ item.qty}} remaining </span>
            </div>
            <div class="ml-auto flex gap-1">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" (click)="onClicked(item.itemID, item.itemName)"> Buy </button>
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" (click)="onClickedAppt(item.itemID, item.itemName)"> Try in Store </button>
            </div>
          </div>
        }
    }@empty {
      <span> no items </span> 
    }
      @if(showOrderModal()) {
        <order-modal [(isModalOpen)]="showOrderModal" [itemId]="itemId()" [itemName]="itemName()" />
      }

      @if (showApptOrderModal()) {
      <appt-order-modal [(isModalOpen)]="showApptOrderModal" [itemId]="itemId()" [itemName]="itemName()" />
      }

    </tbody>
    <tfoot>
    </tfoot>
  </table>
  <app-toaster></app-toaster>
  `,

  styles:`  
    .buttons-table {
      margin-left: 2vw;
      margin-right: 2vw;
    }

    button:hover {
      opacity: 20%;
      background-color: black;
      color: white;
      cursor: pointer;
    }

    .hover:hover {
      background-color: #EDEDED;
    }
    
    button:active {
      background-color: #3e8e41;
      box-shadow: 0 2px #666;
    }

    input[type=checkbox] {
      transform: scale(1.5);
      cursor: pointer;
    }

    input[type="checkbox"]:checked {
      background-color: blue;
      border-color: darkblue;
    }

    tr:has(input[type="checkbox"]:checked) {
        background-color: #EDEDED;
    }

    table tbody {
      display: block;
      max-height: 65vh;
      overflow-y: auto;
    }

    table thead, table tbody tr {
      display: table;
      width: 100%;
      table-layout: fixed;
    }
    
    table {
      margin-left: 2vm;
      margin-right: 2vm;
    }

    .scroll-container tr td {
      text-align: center;
    }    
  `,
  imports: [FormsModule, OrderModal, ApptOrderModal, ToasterComponent]
})
export class Rows {
  protected readonly rows = signal<any[][]>([[]]);
  showOrderModal = signal(false);
  showApptOrderModal = signal(false);

  itemId = signal("")
  itemName = signal("")

  constructor() {
  }

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

  async ngOnInit() {
    const items = await getItems();
    this.rows.set([items]);
  }
}