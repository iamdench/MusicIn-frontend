import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NavigationService} from '../services/navigation.service';

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

  constructor(private navigationService: NavigationService) { }

  ngOnInit(): void {
  }

  login(): void {
    this.navigationService.toPlarform();
  }
}
