import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BackUrls, Item, MercadoPagoRequest } from '../models/mercadopago-request';
import { PopUpComponent } from '../pop-up/pop-up.component';
import { MercadoPagoService } from '../services/mercado-pago.service';

@Component({
  selector: 'app-mercado-pago',
  templateUrl: './mercado-pago.component.html',
  styleUrls: ['./mercado-pago.component.css'],
  providers: [MercadoPagoService]
})
export class MercadoPagoComponent implements OnInit {

  nuevoSaldo: number = 0;

  urlProd = 'https://zealous-beach-043a3b010.1.azurestaticapps.net/'
  urlDev = 'http://localhost:4200/'

  constructor(private mercadoPagoService : MercadoPagoService, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  test1(){

    if(this.nuevoSaldo == 0){
      return
    }

    let mercadoPagoRequest = new MercadoPagoRequest('all',new BackUrls( this.urlProd + 'saldos','',''), [new Item('Recargar Saldo','Saldo de BondiPago',1,this.nuevoSaldo)] )

    this.mercadoPagoService.pedirLinkMP(mercadoPagoRequest).subscribe(
      data => {      
        console.log(data)
        window.location.assign(data.sandbox_init_point); 
      },
      error => {
        this.dialog.open(PopUpComponent, {
          width: '350px',
          data: {
            dataKey: 'Error al conectarse a mercado pago.'
          }
        });
      }
      )
  }

}
