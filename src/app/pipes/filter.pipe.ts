import { Pipe, PipeTransform } from '@angular/core';
import {Artist} from '../services/spotify-api.service';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(artists: any, search: string = ''): any {
    if (!search.trim()) {
      return artists;
    }
    return artists.filter(artist => {
     return artist.name.toLowerCase().includes(search.toLowerCase());
    });
    // return artists.filter(artist => {
    //   artist.name.toLowerCase().includes(search.toLowerCase());
    // });
  }

}
