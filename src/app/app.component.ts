import { Component, OnInit } from '@angular/core';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  messageText: string = '' ;
  messages: Array<any> = [];
  cards: Array<any> = [];
  target : string = '';
  socket: any;
  constructor(){
    this.socket = io();
  }

  ngOnInit(): void {
    this.messages = new Array();
    this.listen2events();
  }

  listen2events(){
    this.socket.on('tran',(data: any)=>{
      this.cards.push(data);
    });
  }



  sendText(){
    let obj = {
      text: this.messageText,
      target : this.target
    }
    this.socket.emit('newText',obj);
  }
}
