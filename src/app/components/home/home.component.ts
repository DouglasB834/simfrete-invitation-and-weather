import { Component } from '@angular/core';

import { InvitationComponent } from '../invitation/invitation.component';
import { WeatherComponent } from '../weather/weather.component';

@Component({
  selector: 'app-home',
  imports: [  WeatherComponent, InvitationComponent ],
  // standalone:true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
