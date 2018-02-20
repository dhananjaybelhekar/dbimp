import { Component, OnInit } from '@angular/core';
import {  Apollo } from 'apollo-angular';
import {Observable} from 'rxjs/observable'
import { map } from 'rxjs/operators';
import  gql  from 'graphql-tag';
//import { DashboardService } from './dashboard.service';
import { Query } from '../type';

// import { HeroService } from '../hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  //heroes: Hero[] = [];
  data:any;
  hello:Observable<any>;
  dtOptions: DataTables.Settings = {};
  // this.dtOptions = {
  //   pagingType: 'full_numbers'
  // };
  //constructor(private heroService: HeroService) { }
  //constructor(private dashboardService:DashboardService, 
  constructor(private appolo:Apollo) {}

  ngOnInit() {
    
    this.hello = this.appolo.watchQuery<any>({
      query:gql`query{
        empget{
          name
          id
        }
      }
      `
    }).valueChanges
    .pipe(
      map(result => result.data.empget)
    )

    this.dtOptions = {
      pagingType: 'full_numbers'
    };
  }
  }

 // getHeroes(): void {
  //   this.dashboardService.getHeroes()
  //     .subscribe(heroes => this.data= heroes);
  // }