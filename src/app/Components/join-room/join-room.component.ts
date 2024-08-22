import { Component } from '@angular/core';
import { AuctionServiceService } from '../../Services/auction-service.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-join-room',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './join-room.component.html',
  styleUrl: './join-room.component.scss'
})
export class JoinRoomComponent {
  roomId: string = '';
  userName: string = '';
  errorMessage: string | null = null;

  constructor(private auctionService: AuctionServiceService, private router: Router) {}

  joinRoom() {
    if (this.roomId && this.userName) {
          this.router.navigate([`/main/room/${this.roomId}/${this.userName}`]); // Redirect to the room page
    } else {
      this.errorMessage = 'Room ID and your name are required.';
    }
  }
}
