import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';
import { DashboardComponent }from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
//import { DashboardService } from './dashboard.service';
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

@NgModule({
  imports: [
    DataTablesModule,
    CommonModule,
    HttpClientModule,
    DashboardRoutingModule,
    ApolloModule,
    HttpLinkModule
  ],
//  providers:[DashboardService],
  declarations: [DashboardComponent]
})
export class DashboardModule {
  constructor(
    apollo: Apollo,
  httpLink: HttpLink
  ){
    apollo.create({
    // By default, this client will send queries to the
    // `/graphql` endpoint on the same host
    link: httpLink.create({uri:'https://r9kzqlzq9n.lp.gql.zone/graphql'}),
    cache: new InMemoryCache()
  });
}
 }
