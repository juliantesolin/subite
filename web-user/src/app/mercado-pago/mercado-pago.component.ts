import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BackUrls, IdentificationRequest, Item, MercadoPagoRequest, PaymentMethods, PreferencePayerRequest, PreferencePaymentTypeRequest } from '../models/mercadopago-request';
import { PopUpComponent } from '../pop-up/pop-up.component';
import { MercadoPagoService } from '../services/mercado-pago.service';
import { SaldosService } from '../services/saldos.service';
import { environment } from "src/environments/environment";
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-mercado-pago',
  templateUrl: './mercado-pago.component.html',
  styleUrls: ['./mercado-pago.component.css'],
  providers: [MercadoPagoService, SaldosService],
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
export class MercadoPagoComponent implements OnInit {

  nuevoSaldo: number = 0;
  userToken: string = '';
  status: string = '';
  loading = false
  animation = false

  urlProd = 'https://zealous-beach-043a3b010.1.azurestaticapps.net/'
  urlDev = 'http://localhost:4200/'
  notificationUrl = 'https://trapelsic.azurewebsites.net/wbs/api/mp/notifications'

  constructor(private mercadoPagoService : MercadoPagoService, public dialog: MatDialog, private activatedRoute: ActivatedRoute, private router:Router, private saldosService : SaldosService) { }

  ngOnInit(): void {

    this.activatedRoute.queryParams.subscribe(params => {
      this.nuevoSaldo = params['nuevo_saldo'] ? +params['nuevo_saldo'] : 0 ;
      this.status = params['collection_status'] ? params['collection_status'] : '';
      this.userToken = params['user_token'] ? params['user_token'] : '';

      if(!localStorage.getItem('token') && this.userToken == ''){
        this.router.navigate(['login'], {  });
        return
      }

/*       if(this.status == 'approved'){
        this.loading = true
        this.saldosService.postCargarSaldo(this.userToken, this.nuevoSaldo).subscribe(
          data => {      
            this.loading = false
            console.log(data)
          },
          error => {
            this.loading = false
            this.dialog.open(PopUpComponent, {
              width: '350px',
              data: {
                dataKey: 'Error al cargar saldo.' + error
              }
            });
          }
          )
      } */

    });

    this.animation = true

  }

  test1(){

    if(this.nuevoSaldo <= 0){
      this.dialog.open(PopUpComponent, {
        width: '350px',
        data: {
          dataKey: 'Error;El saldo debe ser mayor que cero.'
        }
      });
      return
    }

    let token = this.userToken != '' ? this.userToken : localStorage.getItem('token') + ''

    if(token == ''){
      this.dialog.open(PopUpComponent, {
        width: '350px',
        data: {
          dataKey: 'Error de credenciales;Proba desloguearte y volver a ingresar.'
        }
      });
      return
    }

    this.loading = true
    this.saldosService.getReference(token, this.nuevoSaldo).subscribe(
      data => {      

        let mercadoPagoRequest = new MercadoPagoRequest(
            new PreferencePayerRequest(data.usr_name, data.usr_lname, data.usr_email, new IdentificationRequest('DNI',data.usr_document)) ,
            'all',
            new BackUrls( environment.url + 'mercadoPago?nuevo_saldo=' + this.nuevoSaldo + '&user_token=' + token,'',''),
            //new BackUrls( environment.url + 'mercadoPago?nuevo_saldo=' + this.nuevoSaldo,'',''),
            [new Item(data.external_reference,'Recarga BondiPago','Saldo de BondiPago',1,this.nuevoSaldo)],
            this.notificationUrl,
            data.external_reference,
            new PaymentMethods(1,[new PreferencePaymentTypeRequest('ticket')]),
            'BONDIPAGO-TRAPELSIC',
            true)

    this.mercadoPagoService.pedirLinkMP(mercadoPagoRequest).subscribe(
      data => {     
        console.log(data)
        window.location.assign(data.sandbox_init_point); 
        this.loading = false 
      },
      error => {
        this.loading = false
        this.dialog.open(PopUpComponent, {
          width: '350px',
          data: {
            dataKey: 'Error;Error al conectarse a mercado pago.'
          }
        });
      }
      )

      },
      error => {
        this.loading = false
        this.dialog.open(PopUpComponent, {
          width: '350px',
          data: {
            dataKey: 'Error;Error al obtener el numero de referencia.'
          }
        });
      }
      )

  }

  volverASaldos(){
    this.animation = false
    setTimeout(() => 
    {
      this.router.navigate(['saldos'], {  });
    },
    400);
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
