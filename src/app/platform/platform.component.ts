import {AfterContentChecked, AfterContentInit, ChangeDetectionStrategy, Component, DoCheck, OnInit} from '@angular/core';
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
import {interval} from 'rxjs';
import {map} from 'rxjs/operators';
import {stringify} from '@angular/compiler/src/util';

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
export class PlatformComponent implements  OnInit{

  constructor(private navigationService: NavigationService,
              private activatedRoute: ActivatedRoute,
              private spotifyApiService: SpotifyApiService,
              private storageService: StorageService,
              private authApiService: AuthApiService,
              private likesApiService: LikesApiService) { }



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
  iLiked: string[];
  superLikes: string[];
  superLikesLinks = [];
  tracksArr: string[];


  public user: Profile;

  getSuperLikes(): string[]{
    console.log('2 arrays', this.likedMe, this.iLiked);
    this.superLikes = this.likedMe.filter((val) => {
      return this.iLiked.indexOf(val) !== -1;
  });
    console.log('superlikes', this.superLikes);
    return this.superLikes;
  }

  ngOnInit(): void {
    this.activatedRoute.data.
    subscribe(req => {
          console.log('Проверка');
          this.id = req.currentUser.spotifyId;
          this.storageService.setCurUser(req.currentUser.spotifyId);
          this.storageService.setUserId(req.currentUser.id);
          this.getArtist(req.currentUser.myLikes);
          this.likedMe = req.currentUser.likedMe;
          this.iLiked = req.currentUser.iLiked;
          this.getSuperLikes();
          console.log('Likes', this.superLikes);
          // this.getSuperLikeList();
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
      this.tracksArr = res.tracks.map(song => song.preview_url);
    });
  }


  getArtist(myLikes: number): void{
  this.spotifyApiService.getArtist(this.id).
    subscribe(res => {
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

  arrayRandElement(arr): string{
    const rand = Math.floor(Math.random() * arr.length);
    return arr[rand];
  }

  playSong(): void {
    this.track.src = this.arrayRandElement(this.tracksArr);
    this.state === false ? this.track.play() : this.track.pause();
    this.state = !this.state;
  }

  getLikesList(likedMe: string[]): Liker[] {
    console.log('Supercheck', likedMe);
    for (const artist of likedMe) {
      this.likesApiService.getNameAndLink(artist).subscribe(req => {
        this.likedMeLinks.push(req);
        console.log('array', this.likedMeLinks);
        if (req.likedMe.indexOf(this.storageService.getUserId()) !== -1) {
          this.superLikesLinks.push(req);
        }
      });
    }
    return this.likedMeLinks;
  }


  getSuperLikeList(): Liker[] {
    for (const artist of this.superLikes) {
     this.likesApiService.getNameAndLink(artist).
     subscribe(req => {
       this.superLikesLinks.push(req);
       console.log('superLikes FINAL', this.superLikesLinks);
     });
    }
    return this.superLikesLinks;
    }







}
