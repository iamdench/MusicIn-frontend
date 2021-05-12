import {ChangeDetectionStrategy, Component, DoCheck, OnInit} from '@angular/core';
import {Artist, SpotifyApiService} from '../../services/spotify-api.service';
import {AuthApiService} from '../../services/auth-api.service';
import {Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import {StorageService} from '../../services/storage.service';
import {LikesApiService} from '../../services/likes-api.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.less'],
})
export class UserCardComponent implements OnInit, DoCheck {

  artists: Artist[] = [];

  loading = false;

  search = '';

  track = new Audio();

  state = false;


  constructor(private spotyApiService: SpotifyApiService,
              private authApiService: AuthApiService,
              private storageService: StorageService,
              private likesService: LikesApiService) { }

   getAllArtists(): Subscription{
    return this.authApiService.getArtists().
    pipe(map(artists => artists.filter(artist => artist._id !== this.storageService.getUserId()))).
    subscribe(artists => {
      this.artists = artists;
      this.checkLikes();
      this.getAllSpotify();
      this.getSongs(this.artists);
    }, error => {
      console.log(error);
    });
  }

  checkLikes(): void {
    for (const artist of this.artists) {
      if (artist.likedMe.includes(this.storageService.getUserId())) {
        console.log('check', artist);
        artist.like = true;
      } else {
        artist.like = false;
      }
    }
  }

  showName(artist): void{
    console.log(artist._id);
  }

  getSongs(artists): void{
    for (const artist of artists) {
      this.spotyApiService.getTrack(artist.spotifyId).
      subscribe(res => {
        artist.track = res.tracks[0].preview_url;
      },
      error => {
        console.log(error);
      }
      );
    }
    console.log('artists!!!!', this.artists);
  }

  getAllSpotify(): void{
    for (const artist of this.artists) {
      this.spotyApiService.getArtist(artist.spotifyId).
      subscribe(res => {
        artist.image = res.images[0].url;
        artist.name = res.name;
        artist.follower = res.followers.total;
        console.log(res);
      }, error => {
        console.log(error);
      });
    }
  }

  ngOnInit(): void {
    this.getAllArtists();
  }

  like(artist): void{
    if (!artist.like) {
      this.likesService.like(artist._id).subscribe(req => {
        console.log(req);
        },
          error => {
            console.log(error);
          });
      artist.like = true;
      } else {
      this.likesService.dislike(artist._id).subscribe(req => {
          console.log(req);
          },
        error => {
          console.log(error);
        });
      artist.like = false;
    }
  }

  playSong(trackUrl): void {
    this.track.src = trackUrl;
    this.state === false ? this.track.play() : this.track.pause();
    this.state = !this.state;
  }

  ngDoCheck(): void {
    // this.checkLikes();
  }
}
