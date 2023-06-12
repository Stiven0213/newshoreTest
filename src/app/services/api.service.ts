import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Flight } from '../shared/flight.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  flights: Flight[] = [];

  private URL = 'https://recruiting-api.newshore.es/api/flights/2'


  constructor( private http: HttpClient) {}

  getApiResponse(){
    this.http.get<Flight[]>(this.URL).subscribe((response) =>{
      this.flights = response
      console.log(this.flights)
      this.flights.forEach(element => {
       
        console.log(element.departureStation, element.arrivalStation)
      });
    })
  }




}
