import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginRequest } from '../models/login-request';
import { LoginResponse } from '../models/login-response';
import { PopUpOkComponent } from '../pop-up-ok/pop-up-ok.component';
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
  constructor(private loginService: LoginService, private router:Router, public dialog: MatDialog, private activatedRoute: ActivatedRoute) {
  }
  ngOnInit() {
    this.animation = true
    this.activatedRoute.queryParams.subscribe(params => {

      switch(params['status']){
        case 'reported': {
          this.dialog.open(PopUpOkComponent, {
            width: '350px',
            data: {
              dataKey: 'Cuenta reestablecida;Su cuenta fue reportada con exito.'
            }
          });
          break
        }
        case 'registered': {
          this.dialog.open(PopUpOkComponent, {
            width: '350px',
            data: {
              dataKey: 'Cuenta registrada;Recuerde validar su correo electronico antes de ingresar.'
            }
          });
          break
        }
      }

    })
  }

  loginButtonOnClick(){
    this.loading = true

    this.loginService.loginUser(new LoginRequest(this.usuario, this.pass)).subscribe(
      data => {      
        if(data.result != 0){
          console.log('Te logueaste con el usuario '+ data.usr_data.name)
          this.loading = false
          localStorage.setItem('token', data.token);
          this.animation = false
          setTimeout(() => 
          {
            this.router.navigate(['home'], {  });
          },
          400);
        } else {
          this.loading = false
          this.dialog.open(PopUpComponent, {
            width: '350px',
            data: {
              dataKey: 'Error;'+data.errors[0].msg
            }
          });
        }

      },
      error => {
        this.loading = false
        this.dialog.open(PopUpComponent, {
          width: '350px',
          data: {
            dataKey: 'Datos incorrectos;Revisa tus credenciales e intenta nuevamente.'
          }
        });
      }
      )
  }

}
