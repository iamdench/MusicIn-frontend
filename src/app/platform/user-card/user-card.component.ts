import { Component, OnInit } from '@angular/core';
import {Artist, SpotifyApiService} from '../../services/spotify-api.service';
import {AuthApiService} from '../../services/auth-api.service';
import {resolve} from '@angular/compiler-cli/src/ngtsc/file_system';
import {Subscription} from 'rxjs';
import {filter, map} from 'rxjs/operators';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.less']
})
export class UserCardComponent implements OnInit {

  artists: Artist[] = [];
  //   name: 'Linkin Park',
  //   link: '',
  // tslint:disable-next-line:max-line-length
  //   image: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f177d691-9e5a-444f-b778-51439b92602b/d4wlaad-5d2a6ccd-7900-4439-aea9-fa8fe56d42ff.jpg/v1/fill/w_872,h_873,q_75,strp/linkin_park_logo_4_by_gps3_d4wlaad-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9ODczIiwicGF0aCI6IlwvZlwvZjE3N2Q2OTEtOWU1YS00NDRmLWI3NzgtNTE0MzliOTI2MDJiXC9kNHdsYWFkLTVkMmE2Y2NkLTc5MDAtNDQzOS1hZWE5LWZhOGZlNTZkNDJmZi5qcGciLCJ3aWR0aCI6Ijw9ODcyIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.6urPmwdTZ9Kwav5cNIl1df6VjDCXQNSuUgm97FlcFxc',
  //   follower: 'test1',
  //   id: '6XyY86QOPPrYVGvF9ch6wz',
  // },
  //   {
  //   name: '50 Cent',
  //   link: '',
  //   image: 'https://avatarfiles.alphacoders.com/897/89718.jpg',
  //   follower: 'test2',
  //   id: '3q7HBObVc0L8jNeTe5Gofh',
  // },
  //   {
  //     name: 'T-Fest',
  //     link: '',
  //     image: 'https://m.the-flow.ru/uploads/images/origin/12/04/36/89/50/e218608.jpg',
  //     follower: 'test3',
  //     id: '01lZudgXsojt5TBHuygB8r',
  //   },
  //   {
  //     name: 'Nautilus Pompilius',
  //     link: '',
  //     image: 'https://i.pinimg.com/originals/d1/06/7d/d1067de46ac26d7a2f981edb6b91818f.jpg',
  //     follower: 'test4',
  //     id: '3tYzkTZtYt5dGBSrAnWpX0',
  //   }



  constructor(private spotyApiService: SpotifyApiService,
              private authApiService: AuthApiService) { }

   getAllArtists(): Subscription{
    return this.authApiService.getArtists().
    pipe(map(artists => artists.filter(artist => artist._id !== '60844f2d1b6560992c232923'))).
    subscribe(artists => {
      this.artists = artists;
      console.log(this.artists);
    }, error => {
      console.log(error);
    });
  }

  getAllSpotify(): void{
    for (let artist of this.artists) {
      this.spotyApiService.getArtist(artist.id).
      subscribe(res => {
        artist = res;
        console.log(res.name);
        artist.image = res.images[0].url;
        artist.name = res.name;
        artist.follower = res.followers.total;
        console.log(res.images[0].url);
      }, error => {
        console.log(error);
      });
    }
  }

  ngOnInit(): void {
  }

}
