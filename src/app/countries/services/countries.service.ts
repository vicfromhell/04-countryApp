import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, delay, map } from 'rxjs';
import { Country } from '../interfaces/country';
import { catchError, of } from 'rxjs'; //of construye un observable basado en el argumento que se envia en el of

@Injectable({ providedIn: 'root' })
export class CountryService {

    private apiUrl: string = 'https://restcountries.com/v3.1';

    constructor(private http: HttpClient) { }

    getCountryRequest(url: string): Observable<Country[]> {
        return this.http.get<Country[]>(url)
            .pipe(
                catchError(() => of([])),
                delay( 2000 )
            );
    }

    searchCountryByAlphaCode(code: string): Observable<Country | null> {
        return this.http.get<Country[]>(`${this.apiUrl}/alpha/${code}`)
            .pipe(
                map(countries => countries.length > 0 ? countries[0] : null),
                catchError(() => of(null))
            );
    }

    searchCapital(capital: string): Observable<Country[]> {

        const url = `${this.apiUrl}/capital/${capital}`;

        /* return this.http.get<Country[]>(`${this.apiUrl}/capital/${capital}`)
            .pipe( //hay muchos pipes tap recorre; map devuelve algo
                // tap( countries =>  console.log("tap 1", countries)),
                // map( countries => [] ),
                // tap( countries => console.log("tap 2", countries) )
                catchError(() => of([])) //retorna un observable vacio para que el suscriber recibe el mismo tipo de objeto

            ); */

        return this.getCountryRequest( url )
    }

    searchCountry(name: string): Observable<Country[]> {

        const url = `${this.apiUrl}/name/${name}`;

        /* return this.http.get<Country[]>(`${this.apiUrl}/name/${name}`)
            .pipe(
                catchError(() => of([]))
            );*/

         return this.getCountryRequest( url );
    } 

    searchRegion(region: string): Observable<Country[]> {

       const url = `${this.apiUrl}/region/${region}`;
      /*   return this.http.get<Country[]>(`${this.apiUrl}/region/${region}`)
            .pipe(
                catchError(() => of([]))
            ); */

        return this.getCountryRequest( url )    
    }

}