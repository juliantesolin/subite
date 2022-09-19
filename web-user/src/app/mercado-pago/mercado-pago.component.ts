import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BackUrls, Item, MercadoPagoRequest } from '../models/mercadopago-request';
import { PopUpComponent } from '../pop-up/pop-up.component';
import { MercadoPagoService } from '../services/mercado-pago.service';
import { SaldosService } from '../services/saldos.service';

@Component({
  selector: 'app-mercado-pago',
  templateUrl: './mercado-pago.component.html',
  styleUrls: ['./mercado-pago.component.css'],
  providers: [MercadoPagoService, SaldosService]
})
export class MercadoPagoComponent implements OnInit {

  nuevoSaldo: number = 0;
  userToken: string = '';
  status: string = '';

  urlProd = 'https://zealous-beach-043a3b010.1.azurestaticapps.net/'
  urlDev = 'http://localhost:4200/'

  constructor(private mercadoPagoService : MercadoPagoService, public dialog: MatDialog, private activatedRoute: ActivatedRoute, private router:Router, private saldosService : SaldosService) { }

  ngOnInit(): void {

    this.activatedRoute.queryParams.subscribe(params => {
      this.nuevoSaldo = params['nuevo_saldo'] ? +params['nuevo_saldo'] : 0 ;
      this.userToken = params['user_token'] ? params['user_token'] : '';
      this.status = params['collection_status'] ? params['collection_status'] : '';

      let token = localStorage.getItem('token') + ''

      if(this.status == 'approved'){
        this.saldosService.postCargarSaldo(this.userToken, this.nuevoSaldo).subscribe(
          data => {      
            console.log(data)
          },
          error => {
            this.dialog.open(PopUpComponent, {
              width: '350px',
              data: {
                dataKey: 'Error al cargar saldo.' + error
              }
            });
          }
          )
      }

    });

  }

  test1(){

    if(this.nuevoSaldo <= 0){
      return
    }

    let token = localStorage.getItem('token') + ''
    let mercadoPagoRequest = new MercadoPagoRequest('all',new BackUrls( this.urlDev + 'mercadoPago?nuevo_saldo=' + this.nuevoSaldo + '&user_token=' + token,'',''), [new Item('Recarga BondiPago','Saldo de BondiPago',1,this.nuevoSaldo)] )

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

  volverASaldos(){
    this.router.navigate(['saldos'], {  });
  }

}
