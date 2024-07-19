import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private key  = 'counterValue';
  private counterSubject !: BehaviorSubject<number>;


  constructor() {
    const initialCounter  = parseInt(localStorage.getItem(this.key)||'0');
    this.counterSubject  = new BehaviorSubject<number>(initialCounter);
    // Listen for storage events to update counter across tabs
    window.addEventListener('storage', (event) => {
      if (event.key === this.key) {
        const newValue = parseInt(event.newValue || '0', 10);
        this.counterSubject.next(newValue);
      }
    });
   }





   getCounter$(){
    return this.counterSubject.asObservable();
   }

   incrementCounter(){
    const currentValue = this.counterSubject.getValue();

    const newValue = currentValue+1;
    this.counterSubject.next(newValue);
    localStorage.setItem(this.key,newValue.toString())

   }

   decrementCounter(){
    const currentValue = this.counterSubject.getValue();
    const newValue = currentValue-1;
    this.counterSubject.next(newValue);
    localStorage.setItem(this.key,newValue.toString());
   }
}
