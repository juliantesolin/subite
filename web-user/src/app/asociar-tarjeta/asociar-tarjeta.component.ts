import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PopUpOkComponent } from '../pop-up-ok/pop-up-ok.component';
import { PopUpComponent } from '../pop-up/pop-up.component';
import { SaldosService } from '../services/saldos.service';

@Component({
  selector: 'app-asociar-tarjeta',
  templateUrl: './asociar-tarjeta.component.html',
  styleUrls: ['./asociar-tarjeta.component.css'],
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
export class AsociarTarjetaComponent implements OnInit {

  loading= false
  animation = false
  numeroTarjeta = ''
  token = ''
  constructor(private saldosService: SaldosService, public dialog: MatDialog, private router:Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('token')){
      this.token = localStorage.getItem('token') + ''
    }else{
      this.router.navigate(['login'], {  });
    }
    this.animation = true
  }

  asociarTarjetaClick() {
    this.loading = true
    this.saldosService.asociarTarjeta(this.token, this.numeroTarjeta).subscribe(
      data => {      
        this.loading = false
        if(data.result != 0){
          this.dialog.open(PopUpOkComponent, {
            width: '350px',
            data: {
              dataKey: 'Tarjeta Asociada;La tarjeta fue asociada correctamente a su cuenta.'
            }
          })
          .afterClosed().subscribe(result => {
            this.animation = false
            setTimeout(() => 
            {
              this.router.navigate(['home'], {  });
            },
            400);
          });
        } else {
          this.dialog.open(PopUpComponent, {
            width: '350px',
            data: {
              dataKey: 'Error;'+data.errors[0].msg
            }
          });
        }
        },
      error => {
        this.loading = false
        this.dialog.open(PopUpComponent, {
          width: '350px',
          data: {
            dataKey: 'Error;Error al asociar tarjeta.'
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
