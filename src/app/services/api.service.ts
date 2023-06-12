import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Flight } from '../shared/flight.model';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  flights: Flight[] = [];

  private URL = 'https://recruiting-api.newshore.es/api/flights/2';

  constructor(private http: HttpClient) {}

  getApiResponse() {
    this.http
      .get<Flight[]>(this.URL)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          // Lógica para manejar el error de la respuesta
          console.error('Error en la llamada a API:', error.message);
          return throwError(() => 'Error en la llamada a API');
        })
      )
      .subscribe((response) => {
        this.flights = response;
        this.flights.forEach((element) => {
          console.log(element.departureStation, element.arrivalStation);
        });
      });
  }
}
