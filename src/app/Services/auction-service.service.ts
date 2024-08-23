import { HttpClient,HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable , Subject} from 'rxjs';
import { io,Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class AuctionServiceService {
  public socket: Socket;
  private url = 'http://192.168.172.177:3000';

  constructor(private http: HttpClient) { 
    console.log('AuctionService constructor called'); // Log for debugging
    this.socket = io(this.url);
    console.log('Socket initialized'); // Log for debugging
  }

  joinRoom(roomId: string, userName: string): void {
    this.socket.emit('joinRoom', { roomId, userName });
  }

  onUserJoined(): Observable<{ userName: string }> {
    const subject = new Subject<{ userName: string }>();
    this.socket.on('userJoined', (data) => {
      subject.next(data);
    });
    return subject.asObservable();
  }

  onUserLeft(): Observable<{ userName: string }> {
    const subject = new Subject<{ userName: string }>();
    this.socket.on('userLeft', (data) => {
      subject.next(data);
    });
    return subject.asObservable();
  }

  onRoomFull(): Observable<void> {
    const subject = new Subject<void>();
    this.socket.on('roomFull', () => {
      subject.next();
    });
    return subject.asObservable();
  }

  createRoom(roomSize: number,expiration: string): Observable<{ roomId: string }> {
    return this.http.get<{ roomId: string }>(`${this.url}/create-room`, {
      params: { roomSize: roomSize.toString(),expiration: expiration}
    });
  }

  joinHost(roomId: string, userName: string): Observable<void> {
    return this.http.post<void>(`${this.url}/join-room`, { roomId, userName });
  }
  placeBid(bid: number, player: string, userName: string): void {
    this.socket.emit('placeBid', { bid, player, userName });
  }

  onNewBid(): Observable<{ bid: number; player: string; userName: string }> {
    const subject = new Subject<{ bid: number; player: string; userName: string }>();
    this.socket.on('newBid', (data) => {
      subject.next(data);
    });
    return subject.asObservable();
  } 
  onCurrentUsers(): Observable<Array<{ userName: string }>> {
    const subject = new Subject<Array<{ userName: string }>>();
    this.socket.on('currentUsers', (data) => {
      subject.next(data);
    });
    return subject.asObservable();
  }
}
