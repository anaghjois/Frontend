import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuctionServiceService } from '../../Services/auction-service.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [HttpClientModule,CommonModule,FormsModule],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
  
})
export class MainPageComponent {
  private _snackBar = inject(MatSnackBar);
  constructor(private auctionService: AuctionServiceService, private router: Router,private http:HttpClient) {}
roomID:any
roomSize: number = 8; // Default value
createRoom() {
  if (this.roomSize < 2 || this.roomSize > 100) {
    alert('Please enter a valid number between 2 and 100.');
    return;
  }

  const expiration = '1min'; // or '2min', 'forever', etc., based on user input

  this.auctionService.createRoom(this.roomSize, expiration).subscribe((response) => {
    this.roomID = response.roomId;
    // Redirect to the room page
    // this.router.navigate([`/room/${this.roomID}`]);
  });
}

  joinRoom(){
      this.router.navigate([`/main/join`])
  }
}
