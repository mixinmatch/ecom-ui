import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Layout } from './Layout';
@Component({
  selector: 'app-root',
  imports: [Layout],
  template: `<app-layout/>`,
})
export class App {
}
