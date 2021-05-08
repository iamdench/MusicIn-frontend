import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NavigationService} from '../services/navigation.service';
import {SpotifyApiService} from '../services/spotify-api.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {AuthApiService} from '../services/auth-api.service';
import {StorageService} from '../services/storage.service';

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

  id = `3x1WV02xLxlQZxddtaBux9`;
  ngOnInit(): void {
  this.getSpotyToken();
  }

  login(): void {
    const user: UserForm = this.form.value;
    this.authApiService.login(user.username, user.password).
    subscribe((res: any) => {
      console.log(res);
      this.storageService.setAccToken(res.access_token);
      // this.spotifyApiService.loginSpotify()
      //     .subscribe(
      //       (res: any) => {
      //         console.log(res);

      //       },
      //       err => console.log(err)
      //     );
      // this.getSpotyToken();
      this.navigationService.toPlarform();
    },
      error => console.log(error)
  );
    this.form.reset();
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


  // getSongInfo(): void{
  //   this.spotifyApiService.getTrack(this.id)
  //     .subscribe(
  //       (res: any) => {
  //         console.log(res);
  //       },
  //       error => console.log(error)
  //     );
  // }

}
