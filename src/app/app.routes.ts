import { AuctionRoomComponent } from './Components/auction-room/auction-room.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { JoinRoomComponent } from './Components/join-room/join-room.component';
import { LayoutComponent } from './Components/layout/layout.component';
import { MainPageComponent } from './Components/main-page/main-page.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'main',
        component: LayoutComponent,
        children: [
            { path: 'home', component: DashboardComponent },
            { path: 'room/:roomId/:username', component: AuctionRoomComponent },
            { path: 'join', component: JoinRoomComponent },
            { path: 'auction', component: MainPageComponent },
            { path: '', redirectTo: 'home', pathMatch: 'full' }  // Redirect to 'home' when no path is matched
        ]
    },
    {
        path:'',redirectTo:'/main',pathMatch:"full"
    }
];
