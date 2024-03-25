import { Component } from '@angular/core';
import { CountryService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: ``
})
export class ByCountryPageComponent {

  public countries: Country[] = [];

  constructor(public countryService: CountryService) { }

  searchByCountry(term: string) {

    this.countryService.searchCountry(term)
      .subscribe(obj => {
        this.countries = obj;
      })
  }
}
