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
  constructor(private accountService: AccountService, public dialog: MatDialog, private router:Router) { }

  ngOnInit(): void {
    let token = localStorage.getItem('token') + ''

    this.accountService.getAccountInfo(token);

    


    this.accountService.getAccountInfo(token).subscribe(
      data => {      
        console.log('Te logueaste '+ data.logged)
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

}
