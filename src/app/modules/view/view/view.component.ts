import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  origin:string = 'MZL'
  destination:string = 'MDE'


  constructor(private http: HttpClient, public api: ApiService) { }

  ngOnInit(): void {
    this.api.getApiResponse()
  }

  searchJourney(){
    this.api.flights
    console.log(this.api.flights)

    //TODO Validacion de los campos 

    let origenEncontrado = false;
    let destinoEncontrado = false;

    this.api.flights.forEach(element => {
      if (element.departureStation == this.origin ) {
        origenEncontrado = true
      }

      if (element.arrivalStation == this.destination ) {
        destinoEncontrado = true
      }

      if (element.arrivalStation == this.destination && element.departureStation == this.origin) {
        alert("Vuelo encontrado, valor: " + element.price)
      }
      
    });

    if (!origenEncontrado || !destinoEncontrado) {
      alert("Origen/Destino no encontrado")
    }


  }
}
