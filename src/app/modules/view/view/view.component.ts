import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/services/api.service';
import { Flight } from 'src/app/shared/flight.model';
import { Journey } from 'src/app/shared/journey.model';
import { ExchangeService } from 'src/app/services/exchange.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
})
export class ViewComponent implements OnInit {
  inputOrigin: string = '';
  destination: string = '';
  info: Journey[] = []
  

  constructor(private http: HttpClient, public api: ApiService, public exchangeApi: ExchangeService) {    
  }

  ngOnInit(): void {
    this.api.getApiResponse();
    this.inputOrigin.toUpperCase()
    
  }

  exchangeRate(capturedValue :string){
    this.exchangeApi.getCurrency(capturedValue)
  }

  onInputChange(){
    this.inputOrigin = this.inputOrigin.toUpperCase();
    this.destination = this.destination.toUpperCase();

    if (this.inputOrigin === this.destination) {
      // Los valores son iguales, puedes mostrar un mensaje de error o realizar otra acción
      alert("Los valores no pueden ser iguales")

      this.inputOrigin=''
      this.destination=''
    }

 
  }





  searchJourney() {
    

    //TODO Validacion de los campos

    let origenEncontrado = false;
    let destinoEncontrado = false;

    this.api.flights.forEach((element) => {
      if (element.departureStation == this.inputOrigin) {
        origenEncontrado = true;
      }

      if (element.arrivalStation == this.destination) {
        destinoEncontrado = true;
      }

      if (
        element.arrivalStation == this.destination &&
        element.departureStation == this.inputOrigin
      ) {
        alert('Vuelo directo encontrado, valor: ' + element.price);
        //return;
      }
    });

    if (!origenEncontrado || !destinoEncontrado) {
      alert('Origen/Destino no encontrado');
      //return;
    }


    this.info = this.searchRoute()
    console.log(this.info);
  }

  searchRoute(){
    var listaJourneys = [];

    for (const element1 of this.api.flights) {
      // Recorre el arreglo global
      if (element1.departureStation == this.inputOrigin) {
        // Compara si el inputOrigin coincide con el origen de element1
        if (element1.arrivalStation == this.destination) {
          // Si el inputDestination coincide con el destino de element1, lo imprime (ruta directa)
          let journey = this.populateJourney(element1)
                          
          listaJourneys.push(journey)
        }

        for (const element2 of this.api.flights) {
          if (element2.arrivalStation == this.inputOrigin) {
            continue;
          }

          if (element1.arrivalStation == element2.departureStation) {
            if (element2.arrivalStation == this.destination) {
              let journey = this.populateJourney(element1, element2)
                          
              listaJourneys.push(journey)
            }

            for (const element3 of this.api.flights) {
              if (
                element3.arrivalStation == this.inputOrigin ||
                element3.arrivalStation == element2.departureStation
              ) {
                continue;
              }

              if (element2.arrivalStation == element3.departureStation) {
                if (element3.arrivalStation == this.destination) {
                  let journey = this.populateJourney(element1, element2, element3)
                          
                  listaJourneys.push(journey)
                }

                for (const element4 of this.api.flights) {
                  if (
                    element4.arrivalStation == this.inputOrigin ||
                    element4.arrivalStation == element2.departureStation ||
                    element4.arrivalStation == element3.departureStation
                  ) {
                    continue;
                  }

                  if (element3.arrivalStation == element4.departureStation) {
                    if (element4.arrivalStation == this.destination) {
                      let journey = this.populateJourney(element1, element2, element3, element4)
                      listaJourneys.push(journey)
                    }

                    for (const element5 of this.api.flights) {
                      if (
                        element5.arrivalStation == this.inputOrigin ||
                        element5.arrivalStation == element2.departureStation ||
                        element5.arrivalStation == element3.departureStation ||
                        element5.arrivalStation == element4.departureStation
                      ) {
                        continue;
                      }

                      if (
                        element4.arrivalStation == element5.departureStation
                      ) {
                        if (element5.arrivalStation == this.destination) {
                          let journey = this.populateJourney(element1, element2, element3, element4, element5)
                          listaJourneys.push(journey)
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

    return listaJourneys
  }

  populateJourney(...elementos: Flight[]){
    let journey = new Journey();
    journey.origin = this.inputOrigin;
    journey.destination = this.destination;
    journey.price = 0
    journey.flights = [];

    for (const e of elementos) {
      journey.flights.push(e)
      journey.price += e.price
    }

    return journey
  }

}
