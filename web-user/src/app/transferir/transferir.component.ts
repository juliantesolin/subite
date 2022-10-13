import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TransferRequest } from '../models/transfer-request';
import { PopUpOkComponent } from '../pop-up-ok/pop-up-ok.component';
import { PopUpComponent } from '../pop-up/pop-up.component';
import { SaldosService } from '../services/saldos.service';

@Component({
  selector: 'app-transferir',
  templateUrl: './transferir.component.html',
  styleUrls: ['./transferir.component.css'],
  providers: [SaldosService],
  animations: [
    trigger('flyInOut', [
      state('in', style({ opacity:1,transform: 'translateY(0)' })),
      transition('void => *', [
        style({ opacity:0,transform: 'translateX(-100%)' }),
        animate(400)
      ]),
      transition('* => void', [
        animate(400, style({ opacity:0,transform: 'translateX(100%)' }))
      ])
    ])
  ]
})
export class TransferirComponent implements OnInit {

  token! : string
  monto: number = 0
  animation = false;
  mail: string = ''

  constructor(private saldosService: SaldosService, public dialog: MatDialog, private router:Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('token')){
      this.token = localStorage.getItem('token') + ''
    }else{
      this.router.navigate(['login'], {  });
    }
    this.animation = true
  }

  transferir(){

    if (this.monto <= 0 || this.mail == '') {
      this.dialog.open(PopUpComponent, {
        width: '350px',
        data: {
          dataKey: 'Error;Completa los datos con el formato como corresponde o valores válidos.'
        }
      });
      return;
    }

    let transferRequest = new TransferRequest(
      this.mail,
      this.monto
    )

    this.saldosService.transferUser(this.token, transferRequest).subscribe(
      data => {
        this.dialog.open(PopUpOkComponent, {
          width: '350px',
          data: {
            dataKey: 'Saldo transferido;Enviaste '+this.monto+' a '+this.mail
          }
        });
      },
      error => {
        this.dialog.open(PopUpComponent, {
          width: '350px',
          data: {
            dataKey: 'Error;Error al transferir saldo.'
          }
        });
      }
      )

  }

  backButtonOnClick() {
    this.animation = false
    setTimeout(() => 
    {
      this.router.navigate(['saldos'], {  });
    },
    400);
  }

}
