import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {TUI_VALIDATION_ERRORS} from '@taiga-ui/kit';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NavigationService} from '../../services/navigation.service';
import {RegistrationService} from '../../services/registration.service';
import {map} from 'rxjs/operators';
import {RegProfile} from '../../interfaces/reg-profile';

// function checkPasswordConfirm(control: FormControl): { [p: string]: boolean } | null {
//   return control.parent?.value.pass === control.value ? null : {confirmed: true};
// }

function maxLengthValue(context: {requiredLength: string}): string {
  return `Максимальная длина — ${context.requiredLength} символов`;
}

function minLengthValue(context: {requiredLength: string}): string {
  return `Минимальная длина — ${context.requiredLength} символов`;
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: TUI_VALIDATION_ERRORS,
      useValue: {
        required: 'Поле обязательно для заполнения',
        email: 'Укажите действительный адрес электропочты',
        maxlength: maxLengthValue,
        minlength: minLengthValue,
        pattern: 'Пароль должен содержать прописную и заглавную латинские буквы, цифру, спецсимвол из списка _!#+-$'
      },
    },
    RegistrationService
  ]

})
export class RegistrationComponent implements OnInit {

  form: FormGroup;

  commonValidator: number;

  constructor(private navigationService: NavigationService,
              private registrationService: RegistrationService) { }

  isValid = true;

  ngOnInit(): void {
      console.log('Это все из-за меня');
      this.form = new FormGroup({
        username: new FormControl('', [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(60)
        ]),
        email: new FormControl('', [
          Validators.email,
          Validators.required,
          Validators.maxLength(100)
        ]),
        password: new FormControl(null, [
          Validators.required,
          Validators.pattern(/(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[_!#+\-$])/g),
          Validators.minLength(5)
        ]),
        spotifyLink: new FormControl('https://open.spotify.com/artist/*ваш id*', [
          Validators.required,
          Validators.minLength(52),
          Validators.maxLength(56)
        ]),
      });
  }

  submit(): void{
      this.registrationService.checkUserName(this.form.value).
      subscribe(name => {
        if (name) {
          this.block();
          alert('Username found');
        }
        this.registrationService.checkSpotifyId(this.form.value).
      subscribe(id => {
          if (id) {
            this.block();
            alert('Id found');
          }
          this.registrationService.checkEmail(this.form.value).
          subscribe(email => {
            if (email) {
              this.block();
              alert('Email found');
            }
            if (this.isValid) {
            this.registrationService.regNewUser(this.form.value).
            subscribe(r => {
              console.log(r);
            });
            }
          });
        });
      });
  }

  block(): void {
    this.isValid = false;
  }

  toAuth(): void{
  this.navigationService.toAuth();
  }

}
