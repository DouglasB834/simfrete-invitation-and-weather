import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, DecimalPipe } from '@angular/common';
import { faSearch, faMapLocation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { GetWeatherService } from '../../services/get-weather.service';//sempre que importo da error

@Component({
  selector: 'app-weather',
  imports: [ FormsModule, CommonModule, DecimalPipe, FontAwesomeModule ],
  standalone: true,
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css'
})

export class WeatherComponent implements OnInit {
  searchIcon = faSearch;
  location= faMapLocation
  city = '';
  errorMessage = '';
  weatherData: any;
  catList = []
  isLoading = false;

  constructor(private service: GetWeatherService) { }

  ngOnInit() {
    this.getCurrentLocation();
  }

  getCurrentLocation() {
    if (!('geolocation' in navigator)) {
      this.errorMessage = 'Geolocalização não é suportada neste navegador.';
      return;
    }

    this.isLoading = true;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.getWeatherByCoords(position.coords.latitude, position.coords.longitude);
      },
      (error) => {
        this.errorMessage = this.getGeolocationErrorMessage(error.code);
      },
      { timeout: 10000 }
    );

    this.isLoading = false;
  }

  getGeolocationErrorMessage(errorCode: number): string {
    switch (errorCode) {
      case 1:
        return 'Usuário negou a permissão de localização.';
      case 2:
        return 'Informação de localização indisponível.';
      case 3:
        return 'Tempo de requisição de localização expirou.';
      default:
        return 'Ocorreu um erro ao obter localização.';
    }
  }

  getWeatherByCoords(lat: number, lon: number) {
    this.service.getWeatherByCoords(lat, lon).subscribe(
      (data) => {
        console.log(data.main);
        console.log(data);
        this.weatherData = data;
        this.errorMessage = '';
      }
    )
  }

  search() {
    if (this.city.trim()) {
      this.service.getWeather(this.city).subscribe({
        next: (data) => {
          this.weatherData = data;
          this.errorMessage = '';
          this.city = '';
        },
        error: (error) => {
          this.errorMessage = 'Cidade não encontrada!';
          this.weatherData = null;
        },
      });
    }
  }

  getWeatherIcon(iconCode: string): string {
    //10d || 01d ...
    https://openweathermap.org/img/wn/01d@2x.png
    return this.service.getweatherIcon(iconCode)
  }

  capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

}
