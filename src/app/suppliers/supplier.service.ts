import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { throwError, Observable, of, map, concatMap, tap, mergeMap, switchMap } from 'rxjs';
import { Supplier } from './supplier';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  suppliersUrl = 'api/suppliers';

  suppliersWithMap$ = of(1, 5, 8)
    .pipe(
      map(id => this.http.get<Supplier>(`${this.suppliersUrl}/${id}`))
    )

  suppliersWithConcatMap$ = of(1, 5, 8) // here we define an observable of IDs
    .pipe(
      tap(id => console.log('concatMap source Observable', id)), // We pipe each ID through a set of operators. Use tap to log the ID coming in from the source observable
      concatMap(id => this.http.get<Supplier>(`${this.suppliersUrl}/${id}`)) // We use concatMap to transform our ID values into new inner obervables and then flatten the result to the output stream
    );

  suppliersWithMergeMap$ = of(1, 5, 8) // here we define an observable of IDs
    .pipe(
      tap(id => console.log('mergeMap source Observable', id)), // We pipe each ID through a set of operators. Use tap to log the ID coming in from the source observable
      mergeMap(id => this.http.get<Supplier>(`${this.suppliersUrl}/${id}`)) // We use concatMap to transform our ID values into new inner obervables and then flatten the result to the output stream
    );

  suppliersWithswitchMap$ = of(1, 5, 8) // here we define an observable of IDs
    .pipe(
      tap(id => console.log('switchMap source Observable', id)), // We pipe each ID through a set of operators. Use tap to log the ID coming in from the source observable
      switchMap(id => this.http.get<Supplier>(`${this.suppliersUrl}/${id}`)) // We use concatMap to transform our ID values into new inner obervables and then flatten the result to the output stream
    );
    
  
    
  

  constructor(private http: HttpClient) { 
    // this.suppliersWithConcatMap$.subscribe(
    //   item => console.log('concatMap result', item)
    // )

    // this.suppliersWithMergeMap$.subscribe(
    //   item => console.log('mergeMap result', item)
    // )
    
    // this.suppliersWithswitchMap$.subscribe(
    //   item => console.log('switchMap result', item)
    // )
    // this.suppliersWithMap$.subscribe(o => o.subscribe(
    //   item => console.log('map result', item))
    // )
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.message}`;
    }
    console.error(err);
    return throwError(() => errorMessage);
  }

}
