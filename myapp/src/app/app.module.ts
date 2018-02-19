import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
//import { DataTablesModule } from 'angular-datatables';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

import { AppRoutingModule }     from './app-routing.module';
import { AppComponent }         from './app.component';
// import { ApolloModule, Apollo } from 'apollo-angular';
// import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
// import { InMemoryCache } from 'apollo-cache-inmemory';

@NgModule({
  imports: [
    BrowserModule,
    //DataTablesModule,    
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    // ApolloModule,
    // HttpLinkModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  declarations: [
    AppComponent,
//    DashboardComponent,
    // HeroesComponent,
    // HeroDetailComponent,
    // MessagesComponent,
    // HeroSearchComponent
  ],
  //providers: [ HeroService, MessageService ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
 }
