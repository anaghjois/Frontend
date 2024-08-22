import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainPageComponent } from "./Components/main-page/main-page.component";
import { AuctionRoomComponent } from "./Components/auction-room/auction-room.component";
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MainPageComponent,HttpClientModule,CommonModule,MatSnackBarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers:[HttpClientModule]
})
export class AppComponent {
  title = 'Frontend';
}
