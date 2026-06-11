import { environment } from './src/environments/environment';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DataService {
    private catalogURL = environment.CATALOG_URL;
    private invURL = environment.INV_URL;
    private orderURL = environment.ORDER_URL;
    private apptURL = environment.APPT_URL;
}