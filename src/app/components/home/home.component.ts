import { Component, signal } from '@angular/core';

import { FooterComponent } from '../footer/footer.component';
import { InvitationComponent } from '../invitation/invitation.component';
import { WeatherComponent } from '../weather/weather.component';

@Component({
  selector: 'app-home',
  imports: [ FooterComponent, WeatherComponent, InvitationComponent ],
  // standalone:true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  name = 'Simfrete';
  urlImg = signal("https://picsum.photos/200/300");

  getImg() {
    this.urlImg.update(_ => `https://picsum.photos/200/300?t=${Date.now()}`);
  }
}
