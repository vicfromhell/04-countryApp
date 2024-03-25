import { Component } from '@angular/core';
import { CountryService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {

  public countries: Country[] = [];
  public isLoading: boolean = false;

  constructor(private countriesService: CountryService) { }

  searchByCapital(term: string): void {

    this.isLoading = true;

    this.countriesService.searchCapital(term)
      .subscribe(obj => {
        this.countries = obj;
        this.isLoading = false;
      })

  }

}
