import {Component, OnInit} from '@angular/core';
import {CountriesService} from './services/countries.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  countries;
  constructor(private countriesService: CountriesService) {
  }

  ngOnInit(): void {
    this.countries = this.countriesService.getCountries();
  }
}
