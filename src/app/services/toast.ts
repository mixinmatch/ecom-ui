import { Component, inject } from '@angular/core';
import { ToastService } from './toastservice';

@Component({
  selector: 'app-toaster',
  standalone: true,
  template: `
    <div class="toast-container">
      @for (toast of toastService.toasts(); track toast.id) {
        <div class="toast" [class]="toast.type">
          <span class="message">{{ toast.message }}</span>
          <button class="close-btn" (click)="toastService.dismiss(toast.id)">×</button>
        </div>
      }
    </div>
  `,
  styles: [`
    .toast-container {
      position: fixed;
      top: 5vh;
      right: 50vw;
      z-index: 1000;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .toast {
      display: flex;
      justify-content: space-between;
      align-items: center;
      min-width: 250px;
      padding: 12px 16px;
      border-radius: 6px;
      color: white;
      font-family: sans-serif;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      animation: slideIn 0.2s ease-out;
    }
    .success { background-color: #2ecc71; }
    .error { background-color: #e74c3c; }
    .info { background-color: #3498db; }
    .close-btn {
      background: none;
      border: none;
      color: white;
      font-size: 18px;
      cursor: pointer;
      margin-left: 12px;
      opacity: 0.7;
    }
    .close-btn:hover { opacity: 1; }
    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
  `]
})
export class ToasterComponent {
  toastService = inject(ToastService);
}