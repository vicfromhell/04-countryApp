import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CountryService } from '../../services/countries.service';
import { switchMap, tap } from 'rxjs';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: ``
})
export class CountryPageComponent implements OnInit {

  public country?: Country;

  constructor(
    private activatedRoute: ActivatedRoute,
    private countryService: CountryService,
    private router: Router
  ) { }

  ngOnInit(): void {
    //Observable Hell u Callback hell, es cuando un observable llama a otro observable, se refactorizo con el metodo searchCountry(string)
    this.activatedRoute.params.//<-Observable
      pipe(
        switchMap(({ id }) => this.countryService.searchCountryByAlphaCode(id)),//recibe el valor anterior (params) cuyo objetivo es regresar un nuevo Observable
      ).
      subscribe(country => {

        if (!country)return this.router.navigateByUrl('');

        console.log("Tenemos un paaís : " + country);

        return this.country = country;

      });

    // console.log({ id });
    //this.searchCountry(id)

  }

  searchCountry(code: string) {

    this.countryService.searchCountryByAlphaCode(code)
      .subscribe(country => {

        console.log({ country });

      })
  }

}
