import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CurrencyResponse } from '../shared/currencyResponse.model';

@Injectable({
  providedIn: 'root',
})
export class ExchangeService {

  capturedExchange : number = 1

  private URL = 'https://xecdapi.xe.com/v1/convert_from?from=USD&amount=1';


  constructor(private http: HttpClient) {}

  getCurrency(currency: string) {
    const username = 'ssda915191318';
    const password = 'e5vop9p79cetc7vnlr7mh29qoi';
    const encodedCredentials = btoa(username + ':' + password); // Codifica en base64 el nombre de usuario y la contraseña

    const headers = {
      Authorization: 'Basic ' + encodedCredentials,
    };

    this.http
      .get<CurrencyResponse>(this.URL + '&to=' + currency, { headers })
      .subscribe((response) => {
        this.capturedExchange = response.to[0].mid
        console.log(response.to[0].mid);
      });


    /*  if(currency == 'COP'){
        this.capturedExchange = 4200
      }

      if(currency == 'USD'){
        this.capturedExchange = 1
      }

      if(currency == 'EUR'){
        this.capturedExchange = 0.9
      }*/
  }
}
