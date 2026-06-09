import { Injectable, signal } from '@angular/core';

export interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastsSignal = signal<Toast[]>([]);
  toasts = this.toastsSignal.asReadonly();

  show(message: string, type: Toast['type'] = 'info', duration = 3000) {
    const id = Date.now();
    
    this.toastsSignal.update(toasts => [...toasts, { id, message, type }]);

    setTimeout(() => this.dismiss(id), duration);
  }

  dismiss(id: number) {
    this.toastsSignal.update(toasts => toasts.filter(t => t.id !== id));
  }
}