import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RegisterRequest } from '../models/register-request';
import { PopUpComponent } from '../pop-up/pop-up.component';
import { LoginService } from '../services/log-in.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true},
    },
  ],
})
export class RegisterComponent implements OnInit {

  constructor(private _formBuilder: FormBuilder, private loginService: LoginService, private router:Router, public dialog: MatDialog) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }
  dataFormGroup: FormGroup = this._formBuilder.group({nameCtrl: ['', Validators.required], lastnameCtrl: ['', Validators.required], dniCtrl: ['', Validators.required], mailCtrl: ['', Validators.required]});
  passFormGroup: FormGroup = this._formBuilder.group({passCtrl: ['', Validators.required], repeatPassCtrl: ['', Validators.required], });
  hide = true;

  ngOnInit(): void {
  }

  finishClick(){

    if (!this.dataFormGroup.valid || !this.dataFormGroup.valid) {
      this.dialog.open(PopUpComponent, {
        width: '350px',
        data: {
          dataKey: 'Error;Algunos de tus datos faltan o no son correctos. Completalos e intenta nuevamente'
        }
      });
      return;
    }

    let registerRequest = new RegisterRequest(
      this.dataFormGroup.controls['mailCtrl'].value,
      this.passFormGroup.controls['passCtrl'].value,
      this.dataFormGroup.controls['nameCtrl'].value,
      this.dataFormGroup.controls['lastnameCtrl'].value,
      this.dataFormGroup.controls['dniCtrl'].value
    )

    this.loginService.registerUser(registerRequest).subscribe(
      data => {
        if(data.result != 0){
          this.router.navigate(['login'], {queryParams: { status: 'registered' }})
        }else{
          this.dialog.open(PopUpComponent, {
            width: '350px',
            data: {
              dataKey: 'Error;'+data.errors[0].msg
            }})
          }},
      error => {
        this.dialog.open(PopUpComponent, {
          width: '350px',
          data: {
            dataKey: 'Error;Error fatal'
          }
        });
      }
      )

  }
}
