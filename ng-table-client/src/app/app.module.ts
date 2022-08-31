import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RestService } from "./shared/services/rest.service";
import { PersonsListModule } from "./persons-list/persons-list.module";
import { PopupModule } from "./popup/popup.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    PersonsListModule,
    PopupModule
  ],
  providers: [RestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
