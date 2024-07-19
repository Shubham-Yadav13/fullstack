import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: any;
  private totalUsersSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public totalUsers$ = this.totalUsersSubject.asObservable();

  constructor() {
  
    // window.addEventListener('storage',(event)=>{
   
    //   if(event.key=== 'totalUsers'){
    //     const newValue = parseInt(event.newValue || '0', 10);
    //     this.totalUsersSubject.next(newValue)
    //   }
    // })
  }
  

  getTotalUsers$() {
    return this.totalUsers$;
  }

      // Method to update totalUsers received from socket.io
  updateTotalUsers(totalUsers: number) {
    this.totalUsersSubject.next(totalUsers); // Emit new value to subscribers
    localStorage.setItem('totalUsers', totalUsers.toString()); // Update localStorage
  }
  
}
