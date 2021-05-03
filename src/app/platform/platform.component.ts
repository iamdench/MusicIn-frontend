import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {NavigationService} from '../services/navigation.service';
import {SpotifyApiService} from '../services/spotify-api.service';
import {
  TuiContextWithImplicit,
  TuiIdentityMatcher,
  TuiStringHandler,
} from '@taiga-ui/cdk';

interface Hero {
  readonly id: number;
  readonly name: string;
}

@Component({
  selector: 'app-platform',
  templateUrl: './platform.component.html',
  styleUrls: ['./platform.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlatformComponent implements OnInit {


  constructor(private navigationService: NavigationService,
              private spotifyApiService: SpotifyApiService) { }

  readonly items: ReadonlyArray<Hero> = [
    {id: 1, name: 'Рок'},
    {id: 2, name: 'Поп'},
    {id: 3, name: 'Хип-хоп'},
    {id: 4, name: 'Инди'},
    {id: 5, name: 'Кьют-рок'},
    {id: 6, name: 'Классика'},
  ];

  readonly control = new FormControl([
    {
      id: 4,
      name: 'Инди',
    },
  ]);

  id = '2eiThpX5zH6LFmqP2HY1hL';

  avaTest: string;
  nameTest: string;
  linkTest: string;
  followersTest: string;

  readonly testForm = new FormGroup({
    testValue: new FormControl('Artist name')
  });

  readonly stringify: TuiStringHandler<Hero | TuiContextWithImplicit<Hero>> = item =>
    'name' in item ? item.name : item.$implicit.name

  readonly identityMatcher: TuiIdentityMatcher<Hero> = (hero1, hero2) =>
    hero1.id === hero2.id

  ngOnInit(): void {
    // console.log(window.location.search);
  }

  logOut(): void {
  this.navigationService.toAuth();
  }


  getArtist(): void {
  this.spotifyApiService.getArtist(this.id).
    subscribe(res => {
      console.log(res.name);
      this.avaTest = res.images[0].url;
      this.nameTest = res.name;
      this.linkTest = res.external_urls.spotify;
      this.followersTest = res.followers.total;
      console.log(res.images[0].url);
  }, error => {
      console.log(error);
  });
  }
}
