import { Component, OnInit } from '@angular/core';
import { AuctionServiceService } from '../../Services/auction-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-auction-room',
  standalone: true,
  templateUrl: './auction-room.component.html',
  styleUrls: ['./auction-room.component.scss'],
  imports: [FormsModule,CommonModule]
})
export class AuctionRoomComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  roomId: string | null = null;
  userName: string | null = null;
  currentBids: Array<{ bid: number; player: string; userName: string }> = [];
  roomMessages: string[] = [];
  usersInRoom: Array<{ userName: string }> = []; // Array to store users in the room

  player: string = '';
  bidAmount: number | null = null;

  constructor(
    private auctionService: AuctionServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.roomId = this.route.snapshot.paramMap.get('roomId');
    this.userName = this.route.snapshot.paramMap.get('username');

    if (this.roomId && this.userName) {
      // Join the auction room
      this.auctionService.joinRoom(this.roomId, this.userName);

      // Handle new users joining the room
      this.auctionService.onUserJoined().subscribe(({ userName }) => {
        this._snackBar.open(`${userName} joined the room.`, 'x', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
       
      });
      // Handle users leaving the room
      this.auctionService.onUserLeft().subscribe(({ userName }) => {
        this._snackBar.open(`${userName} left the room.`, 'x', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
        this.usersInRoom = this.usersInRoom.filter((user) => user.userName !== userName);
      });

      // Handle new bids
      this.auctionService.onNewBid().subscribe((bidData) => {
        this.currentBids.push(bidData);
      });

      // Handle room full event
      this.auctionService.onRoomFull().subscribe(() => {
        this.roomMessages.push('Room is full.');
        this.router.navigate(['/home']);
      });
    }

    setInterval(()=>{
      this.GetAllUsers();
    },2000);
  }

  placeBid() {
    if (this.player && this.bidAmount !== null) {
      this.auctionService.placeBid(this.bidAmount, this.player, this.userName || '');
      this.bidAmount = null;
      this.player = '';
    }
  }

 
GetAllUsers() {
  // Emit getUsersInRoom to request the current user list
  this.auctionService.socket.emit('getUsersInRoom');

  // Subscribe to the currentUsers event
  this.auctionService.onCurrentUsers().subscribe((users) => {
    this.usersInRoom = users;
  });
}
}
