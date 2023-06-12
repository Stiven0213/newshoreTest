import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Flight } from 'src/app/shared/flight.model';
import { Journey } from 'src/app/shared/journey.model';
import { ExchangeService } from 'src/app/services/exchange.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
})
export class ViewComponent implements OnInit {
  inputOrigin: string = '';
  inputDestination: string = '';
  journeysList: Journey[] = [];
  selectedCurrency : string = 'USD'

  constructor(
    public api: ApiService,
    public exchangeApi: ExchangeService
  ) {}

  ngOnInit(): void {
    this.api.getApiResponse();
  }

  searchJourney() {
    let originFound = false;
    let destinationFound = false;

    this.api.flights.forEach((element) => {
      if (element.departureStation == this.inputOrigin) {
        originFound = true;
      }

      if (element.arrivalStation == this.inputDestination) {
        destinationFound = true;
      }
    });

    if (!originFound || !destinationFound) {
      alert('Origen/Destino no encontrado');
      return;
    }

    this.journeysList = this.searchRoute();
    console.log(this.journeysList);

    if(this.journeysList.length == 0){
      alert('Ruta no encontrada');
    }
  }

  searchRoute() : Journey[]{
    let list = [];

    // Recorre el arreglo global
    for (const flight1 of this.api.flights) {

      // Compara si el inputOrigin coincide con el origen de flight1
      if (flight1.departureStation == this.inputOrigin) {
        
         // Si el inputDestination coincide con el destino de flight1, lo imprime (ruta directa)
        if (flight1.arrivalStation == this.inputDestination) {
          let journey = this.populateJourney(flight1);
          list.push(journey);
          alert('Vuelo directo encontrado');
        }

        // Acá empieza a buscar vuelos con al menos una escala
        for (const flight2 of this.api.flights) {
          if (flight2.arrivalStation == this.inputOrigin) {
            continue;
          }

          if (flight1.arrivalStation == flight2.departureStation) {
            if (flight2.arrivalStation == this.inputDestination) {
              let journey = this.populateJourney(flight1, flight2);
              list.push(journey);
            }

            // Acá empieza a buscar vuelos con al menos dos escalas
            for (const flight3 of this.api.flights) {
              if (
                flight3.arrivalStation == this.inputOrigin ||
                flight3.arrivalStation == flight2.departureStation
              ) {
                continue;
              }

              if (flight2.arrivalStation == flight3.departureStation) {
                if (flight3.arrivalStation == this.inputDestination) {
                  let journey = this.populateJourney(
                    flight1,
                    flight2,
                    flight3
                  );

                  list.push(journey);
                }

                // Acá empieza a buscar vuelos con al menos tres escalas
                for (const flight4 of this.api.flights) {
                  if (
                    flight4.arrivalStation == this.inputOrigin ||
                    flight4.arrivalStation == flight2.departureStation ||
                    flight4.arrivalStation == flight3.departureStation
                  ) {
                    continue;
                  }

                  if (flight3.arrivalStation == flight4.departureStation) {
                    if (flight4.arrivalStation == this.inputDestination) {
                      let journey = this.populateJourney(
                        flight1,
                        flight2,
                        flight3,
                        flight4
                      );
                      list.push(journey);
                    }

                    // Acá empieza a buscar vuelos con al menos cuatro escalas
                    for (const flight5 of this.api.flights) {
                      if (
                        flight5.arrivalStation == this.inputOrigin ||
                        flight5.arrivalStation == flight2.departureStation ||
                        flight5.arrivalStation == flight3.departureStation ||
                        flight5.arrivalStation == flight4.departureStation
                      ) {
                        continue;
                      }

                      if (
                        flight4.arrivalStation == flight5.departureStation
                      ) {
                        if (flight5.arrivalStation == this.inputDestination) {
                          let journey = this.populateJourney(
                            flight1,
                            flight2,
                            flight3,
                            flight4,
                            flight5
                          );
                          list.push(journey);
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

    return list;
  }

  populateJourney(...elements: Flight[]) : Journey {
    let journey = new Journey();
    journey.origin = this.inputOrigin;
    journey.destination = this.inputDestination;
    journey.price = 0;
    journey.flights = [];

    for (const e of elements) {
      journey.flights.push(e);
      journey.price += e.price;
    }

    return journey;
  }

  exchangeRate(capturedValue: string) {
    this.exchangeApi.getCurrency(capturedValue);
    this.selectedCurrency = capturedValue
  }

  onInputChange() {
    this.inputOrigin = this.inputOrigin.toUpperCase();
    this.inputDestination = this.inputDestination.toUpperCase();

    if (this.inputOrigin === this.inputDestination) {
      alert('Los valores no pueden ser iguales');

      this.inputOrigin = '';
      this.inputDestination = '';
    }
  }
}
