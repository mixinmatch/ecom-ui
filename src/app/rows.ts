import { Component, signal, inject, computed, effect } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { getItems } from './api/api';
import { OrderModal } from './orderModal';
import { ApptOrderModal } from './apptOrderModal';
import { ToasterComponent } from './services/toast';
import { Api } from './api/Api2';
import { ItemCard } from '../ItemCard';

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
    <div class="grid grid-cols-5 grid-rows-5 gap-12">
        @for (subArray of rows(); track subArray) {
            @for (item of subArray; track item) {
              <item-card [item]="item" />
          }
        } @empty {
          <span> <strong>no items </strong> </span> 
        }
      </div>
    </tbody>
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
      max-height: 90vh;
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
  imports: [FormsModule, ToasterComponent, ItemCard]
})
export class Rows {
  protected readonly rows = signal<any[][]>([[]]);

  private api2_0 = inject(Api);

  itemId = signal("")
  itemName = signal("")

  constructor() {}



  async ngOnInit() {
    const items = await this.api2_0.getItems();
    this.rows.set([items]);
  }
}