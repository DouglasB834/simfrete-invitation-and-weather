import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HomeComponent } from './components/home/home.component';

@Component({
  selector: 'app-root',
  styleUrl: './app.component.css',
  // standalone: true,
  imports: [RouterOutlet, HomeComponent ],
  templateUrl: './app.component.html',

})
export class AppComponent {
  title = 'simfrete-invitation-and-weather';
}
