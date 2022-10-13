import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TransactionResponse } from '../models/transactions-response';
import { PopUpComponent } from '../pop-up/pop-up.component';
import { AccountService } from '../services/account.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  fecha: string;
}

const TRANSACTIONS: TransactionResponse[] = [
];

@Component({
  selector: 'app-movimientos',
  templateUrl: './movimientos.component.html',
  styleUrls: ['./movimientos.component.css'],
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
export class MovimientosComponent implements OnInit {

  token!: string
  constructor(private accountService: AccountService, public dialog: MatDialog, private router:Router) { }

  loading = false;
  displayedColumns: string[] = ['type', 'currency', 'amount', 'line', 'date'];
  dataSource = TRANSACTIONS;
  animation = false

  ngOnInit(): void {

    if(localStorage.getItem('token')){
      this.token = localStorage.getItem('token') + ''
    }else{
      this.router.navigate(['login'], {  });
    }


    this.loading = true;
    this.animation = true
    this.accountService.getAccountInfo(this.token).subscribe(
      data => {
        console.log('Te logueaste '+ data.logged)
        this.loading = false
        this.dataSource = data.account.transactions},
      error => {
        this.loading = false
        this.dialog.open(PopUpComponent, {
          width: '350px',
          data: {
            dataKey: 'Error al traer movimientos.'
          }
        });
      }
      )
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
