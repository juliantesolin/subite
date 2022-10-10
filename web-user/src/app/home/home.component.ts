import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('flyInOut1', [
      state('in', style({ opacity:1,transform: 'translateY(0)' })),
      transition('void => *', [
        style({ opacity:0,transform: 'translateY(-25%)' }),
        animate(400)
      ]),
      transition('* => void', [
        animate(400, style({ opacity:0,transform: 'translateY(-25%)' }))
      ])
    ]),
    trigger('flyInOut2', [
      state('in', style({ opacity:1,transform: 'translateY(0)' })),
      transition('void => *', [
        style({ opacity:0,transform: 'translateY(-50%)' }),
        animate(400)
      ]),
      transition('* => void', [
        animate(400, style({ opacity:0,transform: 'translateY(-50%)' }))
      ])
    ]),
    trigger('flyInOut3', [
      state('in', style({ opacity:1,transform: 'translateY(0)' })),
      transition('void => *', [
        style({ opacity:0,transform: 'translateY(-75%)' }),
        animate(400)
      ]),
      transition('* => void', [
        animate(400, style({ opacity:0,transform: 'translateY(-75%)' }))
      ])
    ]),
    trigger('flyInOut4', [
      state('in', style({ opacity:1,transform: 'translateY(0)' })),
      transition('void => *', [
        style({ opacity:0,transform: 'translateY(-100%)' }),
        animate(400)
      ]),
      transition('* => void', [
        animate(400, style({ opacity:0,transform: 'translateY(-100%)' }))
      ])
    ])
  ]
})

export class HomeComponent implements OnInit {

  animation = false
  token!: string  
  constructor(private router:Router) { }

  ngOnInit(): void {

    if(localStorage.getItem('token')){
      this.token = localStorage.getItem('token') + ''
    }else{
      this.router.navigate(['login'], {  });
    }

    this.animation = true
  }

  movimientosClick(){
    this.animation = false
    setTimeout(() => 
    {
      this.router.navigate(['movimientos'], {  });
    },
    400);
  }

  saldosClick(){
    this.animation = false
    setTimeout(() => 
    {
      this.router.navigate(['saldos'], {  });
    },
    400);
  }

  roboClick(){
    this.animation = false
    setTimeout(() => 
    {
      this.router.navigate(['robo'], {  });
    },
    400);
  }

  asociarTarjetaClick(){
    this.animation = false
    setTimeout(() => 
    {
      this.router.navigate(['asociar-tarjeta'], {  });
    },
    400);
  }
}
