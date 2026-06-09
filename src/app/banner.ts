import { Component, inject } from '@angular/core';

@Component({
  selector: 'banner',
  template: `
  <div>

  </div>
  `,
  styles:`
  #banner {
    width: 100%;
  }

  button:hover {
    opacity: 50%;
    cursor: pointer;
  }
  
  button:active {
    background-color: #3e8e41;
    box-shadow: 0 2px #666;
  }
  `
})
export class Banner {
  constructor() {
  }

  onLoad() {

  }
}