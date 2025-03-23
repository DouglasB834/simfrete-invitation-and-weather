import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class GetWeatherService {

  private readonly apiKey = environment.API_KEY
  // Obtenha em https://home.openweathermap.org/api_keys
  private readonly apiUrl = environment.API_URL
  constructor(private client: HttpClient) {}

  getWeatherByCoords (lat: number, lon: number):Observable<any> {
    // https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
    return this.client.get(`${this.apiUrl}?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric&lang=pt_br`);
  }

  getWeather(city : string):Observable<any> {
    return this.client.get(`${this.apiUrl}?q=${city}&appid=${this.apiKey}&units=metric&lang=pt_br`);
  }

  getweatherIcon(iconCode: string) {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`
  }

}
