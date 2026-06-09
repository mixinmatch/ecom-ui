import { Component, signal, input, model, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastService } from './services/toastservice';
import { Appt } from './api/Appt';
import { createAppt } from './api/api';
@Component({
  selector: 'appt-order-modal',
  template: `
  @if (isModalOpen()){
  <dialog class="modal-overlay">
    <div class="modal-content">
    <span>Item: {{itemName()}}. </span>
    
    <div class="mt-2 mb-2"> Quantity: 1 </div>
    <form #userForm="ngForm" >    
      <div class="mt-2 mb-2">
        <label for="name">Name:</label>
        <input 
          type="text" 
          id="name" 
          name="userName" 
          placeholder="Enter your name"
          [(ngModel)]=name
          required 
          #nameRef="ngModel">
        
        @if (nameRef.invalid && nameRef.touched) {
          <small style="color: red;">Name is required.</small>
        }
      </div>

      <div class="mt-2 mb-2">
        <label for="email">Email:</label>
        <input 
          type="email" 
          id="email" 
          placeholder="Enter your email"
          name="userEmail" 
          [(ngModel)]="email"
          required 
          #emailRef="ngModel">
        
        @if (emailRef.invalid && emailRef.touched) {
          <small style="color: red;">Please enter a valid email address.</small>
        }
      </div>
      <div class="mt-2 mb-2">
        <label for="cc">Date:</label>
        <input 
          type="date" 
          id="date" 
          placeholder="Choose date"
          name="date" 
          [(ngModel)]="date"
          required 
          #emailRef="ngModel">
      </div>

      <div class="flex justify-end">
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded mr-2" (click)="onSubmit()">Submit</button>
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded" (click)="closeModal()">Cancel</button>
      </div>
    </form>
    </div>
  </dialog>
}
  `,
  styles:`
  input:focus {
  outline: 3px solid #3b82f6;
  outline-offset: 2px;
  }
  .modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  min-width: 45em;
}
  `,
  imports: [FormsModule]
})
export class ApptOrderModal {
  itemId = input<string>("");
  itemName = input<string>();
  isModalOpen = model(false);
  private toast = inject(ToastService);

  protected email = "";
  protected name = "";
  protected date: Date = new Date(Date.now());

  async onSubmit() {
    const appt: Appt = {
      clientId: "c4a789ca-11ad-4185-9276-86c63dab9edc",
      clientEmail: this.email,
      time: this.date,
      item: {
        id: this.itemId(),
        qty: 1,
      }
    }
    await createAppt(appt);
    this.toast.show('Appointment Created', 'success');
    this.closeModal()
  }

  closeModal() {
    this.isModalOpen.set(false);
  }
}