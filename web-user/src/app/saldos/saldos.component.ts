import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AccountInfoResponse } from '../models/accountinfo-response';
import { PopUpComponent } from '../pop-up/pop-up.component';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-saldos',
  templateUrl: './saldos.component.html',
  styleUrls: ['./saldos.component.css'],
  providers: [AccountService],
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
export class SaldosComponent implements OnInit {

  account! : AccountInfoResponse
  loading = false;
  animation = false;
  token! : string
  constructor(private accountService: AccountService, public dialog: MatDialog, private router:Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('token')){
      this.token = localStorage.getItem('token') + ''
    }else{
      this.router.navigate(['login'], {  });
    }
    this.animation = true
    this.loading = true
    this.accountService.getAccountInfo(this.token).subscribe(
      data => {
        this.loading = false
        this.account = data},
      error => {
        this.loading = false
        this.dialog.open(PopUpComponent, {
          width: '350px',
          data: {
            dataKey: 'Error;Error al traer tu saldo.'
          }
        });
      }
      )
  }

  recargaButtonOnClick() {
    this.animation = false
    setTimeout(() => 
    {
      this.router.navigate(['mercadoPago'], {  });
    },
    400);
  }

  transferButtonOnClick() {
    this.animation = false
    setTimeout(() => 
    {
      this.router.navigate(['transfer'], {  });
    },
    400);
  }

  backButtonOnClick() {
    this.animation = false
    setTimeout(() => 
    {
      this.router.navigate(['home'], {  });
    },
    400);
  }

}
