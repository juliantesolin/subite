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
  providers: [AccountService]
})
export class SaldosComponent implements OnInit {

  account! : AccountInfoResponse
  loading = false;
  token! : string
  constructor(private accountService: AccountService, public dialog: MatDialog, private router:Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('token')){
      this.token = localStorage.getItem('token') + ''
    }else{
      this.router.navigate(['login'], {  });
    }

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
            dataKey: 'Error al traer tu saldo.'
          }
        });
      }
      )
  }

  recargaButtonOnClick() {
    this.router.navigate(['mercadoPago'], {  });
  }

  transferButtonOnClick() {
    this.router.navigate(['transfer'], {  });
  }

  backButtonOnClick() {
    this.router.navigate(['home'], {  });
  }

}
