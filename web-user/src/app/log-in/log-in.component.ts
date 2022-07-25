import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginRequest } from '../models/login-request';
import { LoginResponse } from '../models/login-response';
import { PopUpComponent } from '../pop-up/pop-up.component';
import { LoginService } from '../services/log-in.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
  providers: [LoginService]
})
export class LogInComponent implements OnInit {

  usuario!: string;
  pass!: string;

  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Este campo es obligatorio';
    }

    return this.email.hasError('email') ? 'Ingrese un Email correcto' : '';
  }
  hide = true;
  constructor(private loginService: LoginService, private router:Router, public dialog: MatDialog) {
  }
  ngOnInit() {
  }

  loginButtonOnClick(){
    this.loginService.loginUser(new LoginRequest(this.usuario, this.pass)).subscribe(
      data => {      
        console.log('Te logueaste con el usuario '+ data.usr_data.name)
        this.router.navigate(['home'])},
      error => {
        this.dialog.open(PopUpComponent, {
          width: '350px'
        });
      }
      )
  }

}
