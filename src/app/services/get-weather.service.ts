import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class GetWeatherService {
  private apiKey = '45f8d6a48ac2279c8954243037bb47b8'; // Obtenha em https://home.openweathermap.org/api_keys
  private apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
  constructor(private client: HttpClient) { }

  getWeatherByCoords (lat: number, lon: number):Observable<any> {
    // https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
    return this.client.get(`${this.apiUrl}?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric&lang=pt_br`);
  }

  getWeather(city : string):Observable<any> {
    return this.client.get(`${this.apiUrl}?q=${city}&appid=${this.apiKey}&units=metric&lang=pt_br`);
  }
}
