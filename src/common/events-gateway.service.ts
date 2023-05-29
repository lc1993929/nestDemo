import { SubscribeMessage, WebSocketGateway, WsResponse, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Injectable } from '@nestjs/common';

@WebSocketGateway()
export class EventsGatewayService implements OnGatewayConnection, OnGatewayDisconnect{
  @WebSocketServer() server;
  constructor(){
    console.log(this.server)
  }
  handleDisconnect(client: any) {
    // throw new Error('Method not implemented.');
  }
  handleConnection(client: any, ...args: any[]) {
    console.log(client, args)
  }
  @SubscribeMessage('events')
  onEvent(client: any, payload: any) {
    console.log(client, payload)
  }
}