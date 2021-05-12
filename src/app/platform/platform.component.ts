import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {NavigationService} from '../services/navigation.service';
import {SpotifyApiService} from '../services/spotify-api.service';
import {
  TuiContextWithImplicit,
  TuiIdentityMatcher,
  TuiStringHandler,
} from '@taiga-ui/cdk';
import {StorageService} from '../services/storage.service';
import {AuthApiService} from '../services/auth-api.service';
import {ActivatedRoute} from '@angular/router';
import {Profile} from '../interfaces/profile';
import {LikesApiService} from '../services/likes-api.service';
import {Liker} from '../interfaces/liker';

interface Hero {
  readonly id: number;
  readonly name: string;
}

@Component({
  selector: 'app-platform',
  templateUrl: './platform.component.html',
  styleUrls: ['./platform.component.less'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlatformComponent implements  OnInit {

  constructor(private navigationService: NavigationService,
              private activatedRoute: ActivatedRoute,
              private spotifyApiService: SpotifyApiService,
              private storageService: StorageService,
              private authApiService: AuthApiService,
              private likesApiService: LikesApiService) { }

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

  id = '';
  avatar: string;
  name: string;
  link: string;
  followers: string;
  likes: number;
  track = new Audio();
  state = false;
  likedMe: string[];
  likedMeLinks: Liker[] = [];


  public user: Profile;

  readonly stringify: TuiStringHandler<Hero | TuiContextWithImplicit<Hero>> = item =>
    'name' in item ? item.name : item.$implicit.name

  readonly identityMatcher: TuiIdentityMatcher<Hero> = (hero1, hero2) =>
    hero1.id === hero2.id

  ngOnInit(): void {
    this.activatedRoute.data.
    subscribe(req => {
          console.log(req);
          this.id = req.currentUser.spotifyId;
          this.storageService.setCurUser(req.currentUser.spotifyId);
          this.storageService.setUserId(req.currentUser.id);
          this.getArtist(req.currentUser.myLikes);
          this.likedMe = req.currentUser.likedMe;
          console.log('Likes', this.likedMe);
        },
          error => {
          console.log(error);
          });
    this.getLikesList(this.likedMe);
  }


  logOut(): void {
    console.log(this.id);
    this.navigationService.toAuth();
  }

  getSong(): void{
    this.spotifyApiService.getTrack(this.storageService.getCurUser()).
    subscribe(res => {
      this.track.src = res.tracks[0].preview_url;
    });
  }


  getArtist(myLikes: number): void{
  this.spotifyApiService.getArtist(this.id).
    subscribe(res => {
      // this.user = res;
      console.log('test', this.user);
      this.avatar = res.images[0].url;
      this.name = res.name;
      this.link = res.external_urls.spotify;
      this.likes = myLikes;
      this.followers = res.followers.total;
  }, error => {
      console.log(error);
  });
  this.getSong();
  }

  playSong(): void {
    this.state === false ? this.track.play() : this.track.pause();
    this.state = !this.state;
  }

  getLikesList(likedMe: string[]): Liker[]{
  for (const artist of likedMe){
    this.likesApiService.getNameAndLink(artist).
    subscribe(req => {
      this.likedMeLinks.push(req);
      console.log(this.likedMeLinks);
    });
  }
  return this.likedMeLinks;
  }
}
