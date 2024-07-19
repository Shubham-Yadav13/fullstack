import { ChangeDetectorRef, Component, DoCheck, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { io } from 'socket.io-client';
import { SocketService } from './socket.service';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FormsModule, ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent  implements OnInit{

  messages:any;
  allMessages: any;
  userId: any;
 
  title = 'AngularClient';
  counter:number=0;
  private socket: any;
  public messageFromServer: string = '';
  myData:any=''
  totalUsers:any='';
  constructor(private socketService:SocketService,private cdr: ChangeDetectorRef, private dataService:DataService,){
  
  }
  ngOnInit(): void {
    // console.log(this.userId,'user ID');

  //  this.socket = io('http://localhost:4000', {
    this.socket = io('https://backendchat-c7s9.onrender.com/',{
      transports: ['websocket', 'polling'], // Prefer WebSocket transport
    });
    

    this.socket.on('connect', () => {
      // console.log('Connected to server');
      
    });
  //   this.socket.on('private', function(msg:any) {
    
  //     console.log(msg);
  //     // alert(msg); 
  // });

    this.socket.on('newUser', (data: any) => {
      // console.log('DATA REFRESHED', data);
      const totalUsers = data?.message;
      if(data.id!==undefined || data.id!==null  || data.id!=='' )
      this.userId = data?.id;
      // console.log(this.userId,totalUsers);
      
      this.totalUsers = totalUsers;
    //  this.totalUsersSubject.next(data?.message); // Update totalUsersSubject
   //   localStorage.setItem('totalUsers', totalUsers.toString()); // Update localStorage
    });

    this.socket.on('all-messages',(res:any)=>{
      this.allMessages = res.data;
      // console.log(res);
      
      // console.log(this.allMessages);
      
    })




    // this.dataService.getCounter$().subscribe(counter => {
    //   this.counter = counter;
    //   console.log('hi');
    //   console.log(counter);
    // });


    this.socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });


  }

  onSubmit(){
    console.log(this.myData);
    this.socket.emit('send-message', this.myData);
    this.myData='';
  }


  increment(){
   this.dataService.incrementCounter();
  }
  decrement(){
   this.dataService.decrementCounter();
  }
}
