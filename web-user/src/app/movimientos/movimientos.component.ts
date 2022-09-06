import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
  providers: [AccountService]
})
export class MovimientosComponent implements OnInit {

  constructor(private accountService: AccountService, public dialog: MatDialog) { }

  loading = false;
  displayedColumns: string[] = ['type', 'amount', 'currency', 'date'];
  dataSource = TRANSACTIONS;

  ngOnInit(): void {

    let token = localStorage.getItem('token') + ''

    this.accountService.getAccountInfo(token);


    this.accountService.getAccountInfo(token).subscribe(
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



}
