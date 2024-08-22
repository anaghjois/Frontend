import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule,RouterOutlet,RouterLink, RouterLinkActive],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  isUserLoggedIn: boolean = false; // Example check for user login status


  constructor(private route:ActivatedRoute,private router:Router){

  }
  loginAsGuest() {
    // Implement your guest login logic here
    console.log("Logged in as Guest");
  }
}
