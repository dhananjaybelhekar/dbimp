// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';

// import { Observable } from 'rxjs/Observable';
// import { of } from 'rxjs/observable/of';
// import { catchError, map, tap } from 'rxjs/operators';


// const httpOptions = {
//   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
// };

// @Injectable()
// export class DashboardService {

//   constructor(
//     private http: HttpClient) { }

//   /** GET heroes from the server */
//   getHeroes (): Observable<any> {
//     // return this.http.post<any>('http://localhost:3000/comment',{"name": "id labore ex et quam laborum"})
//     //   .pipe(
//     //     tap(heroes => this.log(`fetched heroes`)),
//     //     catchError(this.handleError('getHeroes', []))
//     //   );
//     return this.http.get<any>('https://jsonplaceholder.typicode.com/users')
//       .pipe(
//         tap(heroes => this.log(`fetched heroes`)),
//         catchError(this.handleError('getHeroes', []))
//       );
//   }
//   private handleError<T> (operation = 'operation', result?: T) {
//     return (error: any): Observable<T> => {

//       // TODO: send the error to remote logging infrastructure
//       console.error(error); // log to console instead

//       // TODO: better job of transforming error for user consumption
//       this.log(`${operation} failed: ${error.message}`);

//       // Let the app keep running by returning an empty result.
//       return of(result as T);
//     };
//   }

//   /** Log a HeroService message with the MessageService */
//   private log(message: string) {
//    // this.messageService.add('HeroService: ' + message);
//   }
// }
