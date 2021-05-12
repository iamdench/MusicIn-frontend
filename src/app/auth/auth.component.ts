import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NavigationService} from '../services/navigation.service';
import {SpotifyApiService} from '../services/spotify-api.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {AuthApiService} from '../services/auth-api.service';
import {StorageService} from '../services/storage.service';
import * as url from 'url';

export interface UserForm {
  username: string;
  password: string;
}

@Component({
  selector: 'app-enter',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.less']
})
export class AuthComponent implements OnInit {
  readonly form = new FormGroup({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required)
  });

  constructor(private navigationService: NavigationService,
              private spotifyApiService: SpotifyApiService,
              private route: ActivatedRoute,
              private authApiService: AuthApiService,
              private storageService: StorageService)
  {}

  id = `2n6CVwo43YvjiTgcPxYWrf`;

    // `3EwWB7HxAIFVloXDApQ8kL`;

  // `3x1WV02xLxlQZxddtaBux9`;
  track = new Audio();
  state = false;


  ngOnInit(): void {
  this.getSpotyToken();
  }



  login(): void {
    const user: UserForm = this.form.value;
    this.authApiService.login(user.username, user.password).
    subscribe((res: any) => {
      console.log(res);
      this.storageService.setAccToken(res.access_token);
      this.navigationService.toPlarform();
    },
      error => console.log(error)
  );
    this.form.reset();
  }

  registration(): void {
    this.navigationService.toRegistration();
  }

  getSpotyToken(): void {
    this.spotifyApiService.loginSpotify()
      .subscribe(
        (res: any) => {
          console.log(res);
          this.storageService.setSpotyToken(res.access_token);
        },
        err => console.log(err)
      );
  }


  getSongInfo(): void{
    this.spotifyApiService.getTrack(this.id)
      .subscribe(
        (res: any) => {
          this.track.src = res.tracks[0].preview_url;
          console.log(res);
          console.log(this.track.src);
        },
        error => console.log(error)
      );
  }

  playSong(): void {
    this.state === false ? this.track.play() : this.track.pause();
    this.state = !this.state;
  }
}
