import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SaldosService } from '../services/saldos.service';
import { PopUpComponent } from '../pop-up/pop-up.component';
import { TransferRequest } from '../models/transfer-request';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css'],
})
export class TransferComponent implements OnInit {

  token! : string
  monto: number = 0
  iduser: number = 0
  mail: string = ''

  constructor(private _formBuilder: FormBuilder, private saldosService: SaldosService, public dialog: MatDialog, private router:Router) { }

  dataFormGroup: FormGroup = this._formBuilder.group({iduserCtrl: ['', Validators.required], montoCtrl: ['', Validators.required], mailCtrl: ['', Validators.required]});

  ngOnInit(): void {
    if(localStorage.getItem('token')){
      this.token = localStorage.getItem('token') + ''
    }else{
      this.router.navigate(['login'], {  });
    }
  }

  backButtonOnClick() {
    this.router.navigate(['saldos'], {  });
  }

  transferir(){

    if (!this.dataFormGroup.valid || !this.dataFormGroup.valid) {
      this.dialog.open(PopUpComponent, {
        width: '350px',
        data: {
          dataKey: 'Error;Completa los datos con el formato como corresponde o valores válidos.'
        }
      });
      return;
    }

    let transferRequest = new TransferRequest(
      this.dataFormGroup.controls['mailCtrl'].value,
      this.dataFormGroup.controls['iduserCtrl'].value,
      this.dataFormGroup.controls['montoCtrl'].value
    )

    this.saldosService.transferUser(this.token, transferRequest).subscribe(
      data => {
        console.log('Le transferiste '+ this.monto + ' al usuario '+ this.iduser)
        this.router.navigate(['login'])},
      error => {
        this.dialog.open(PopUpComponent, {
          width: '350px'
        });
      }
      )

  }

}
