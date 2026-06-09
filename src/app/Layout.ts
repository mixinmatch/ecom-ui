import { Component, inject, signal } from '@angular/core';
import { Rows } from './rows';
import { Banner } from './banner';

@Component({
  selector: 'app-layout',
  template: `
    <banner/>
    <rows class="mt-6"/>
  `,

  styles:`
  
  button:hover {
    opacity: 50%;
  }
  
  button:active {
    background-color: #3e8e41;
    box-shadow: 0 2px #666;
  }
  `,

  imports: [Rows, Banner]
})
export class Layout {
  constructor() {
  }

  onClick() {
  }
  
  onSave() {
  }
  onDelete() {
  }
}