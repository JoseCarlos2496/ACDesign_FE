import { Constantes } from './../../constantes';
import { loginDefault } from './../../Interfaces/ILogin';
import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { BackendLoginService } from 'src/Services/Login/backend-login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  loginItem = loginDefault;

  constructor(
    public _loginService: BackendLoginService,
    protected _constantes: Constantes
  ) {}

  async login() {
    this.loginItem.username = this.username;
    this.loginItem.password = this.password;

    let data = await this._loginService
      .post(this.loginItem)
      .pipe(map((resp: any) => resp))
      .toPromise();

    var token = sessionStorage.getItem('Token');
    if (token !== undefined) {
      location.href = this._constantes.persona;
    }
  }
}
