import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterSales'
})
export class FilterSalesPipe implements PipeTransform {

  EUROPE_COUNTRIES = ['Spain', 'Italy', 'United Kingdom', 'France', 'Germany', 'Portugal', 'Greece', 'Netherlands'];
  UK_COUNTRIES = [['Wales/Cymru', 'England', 'Scotland']];

  transform(value: any, args?: any): any {
    if (value && args) {
     return value.filter(sale => this.filterActivity(sale, args.activities) && this.filterLocation(sale, args.destinations));
    }

    return value;
  }

  private filterActivity(sale: any, activitiesFilters: any): boolean {
    if (!sale.tags && activitiesFilters.length > 0) {
      return false;
    }

    if (activitiesFilters.indexOf('any') > -1) {
      return true;
    }

    const allTags = sale.tags.map(tag => tag.key);

    if (allTags.length === 0) {
      return false;
    }

    if (new Set(allTags.filter(x => new Set(activitiesFilters).has(x))).size > 0) {
      return true;
    }

    return false;
  }

  private filterLocation(sale: any, locationFilters: any): boolean {
    if (locationFilters.indexOf('world') > -1) {
      return true;
    }

    if (!sale.location && locationFilters.length > 0) {
      return false;
    }

    const city = sale.location.city;
    const country = sale.location.country;
    if (locationFilters.length > 0 && (!city || !country)) {
      return false;
    }

    if (city.name === 'London' && locationFilters.indexOf('london') > -1) {
      return true;
    } else if (this.UK_COUNTRIES.indexOf(country.name) && locationFilters.indexOf('uk') > -1) {
      return true;
    } else if (this.EUROPE_COUNTRIES.indexOf(country.name) > -1 && locationFilters.indexOf('europe') > -1) {
      return true;
    }

    return false;
  }

}
