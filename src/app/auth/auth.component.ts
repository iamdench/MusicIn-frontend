import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NavigationService} from '../services/navigation.service';
import {SpotifyApiService} from '../services/spotify-api.service';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-enter',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.less']
})
export class AuthComponent implements OnInit {
  readonly form = new FormGroup({
    login: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required)
  });

  constructor(private navigationService: NavigationService,
              private spotifyApiService: SpotifyApiService,
              private route: ActivatedRoute)
  {}

  id = `3x1WV02xLxlQZxddtaBux9`;
  ngOnInit(): void {
    // this.spotifyApiService.showAuthWindow();
    // this.code = this.route.snapshot.params.code;
    // console.log(this.code);
  }

  login(): void {
    this.navigationService.toPlarform();
    localStorage.setItem('currentUser', 'Denis');
  }

  getSpotyToken(): void {
    this.spotifyApiService.loginSpotify()
      .subscribe(
        (res: any) => {
          console.log(res);
          localStorage.setItem('access_token', res.access_token);
        },
        err => console.log(err)
      );
  }


  getSongInfo(): void{
    this.spotifyApiService.getTrack(this.id)
      .subscribe(
        (res: any) => {
          console.log(res);
        },
        error => console.log(error)
      );
  }

}
