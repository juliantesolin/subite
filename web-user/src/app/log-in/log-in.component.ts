import { trigger, state, style, transition, animate } from '@angular/animations';
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
  providers: [LoginService],
  animations: [
    trigger('flyInOut', [
      state('in', style({ opacity:1,transform: 'translateY(0)' })),
      transition('void => *', [
        style({ opacity:0,transform: 'translateY(-100%)' }),
        animate(400)
      ]),
      transition('* => void', [
        animate(400, style({ opacity:0,transform: 'translateY(-100%)' }))
      ])
    ])
  ]
})
export class LogInComponent implements OnInit {

  usuario!: string;
  pass!: string;
  loading = false;
  animation = false;

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
    this.animation = true
  }

  loginButtonOnClick(){
    this.loading = true

    this.loginService.loginUser(new LoginRequest(this.usuario, this.pass)).subscribe(
      data => {      
        console.log('Te logueaste con el usuario '+ data.usr_data.name)
        this.loading = false
        localStorage.setItem('token', data.token);
        this.animation = false
        setTimeout(() => 
        {
          this.router.navigate(['home'], {  });
        },
        400);},
      error => {
        this.loading = false
        this.dialog.open(PopUpComponent, {
          width: '350px',
          data: {
            dataKey: 'Los datos de ingreso no son correctos. Revisa tus credenciales e intenta nuevamente.'
          }
        });
      }
      )
  }

}
