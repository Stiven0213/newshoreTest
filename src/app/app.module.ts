import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewModule } from './modules/view/view.module';
import { HttpClientModule } from '@angular/common/http';
import { CurrencyConversionPipe } from './shared/pipes/currency-conversion.pipe';


@NgModule({
    declarations: [
        AppComponent,
    ],
    providers: [CurrencyConversionPipe],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ViewModule,
        HttpClientModule
    ]
})
export class AppModule { }
