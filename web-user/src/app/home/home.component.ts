import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  token!: string  
  constructor(private router:Router) { }

  ngOnInit(): void {

    if(localStorage.getItem('token')){
      this.token = localStorage.getItem('token') + ''
    }else{
      this.router.navigate(['login'], {  });
    }

  }

  movimientosClick(){
    this.router.navigate(['movimientos'], {  });
  }

  saldosClick(){
    this.router.navigate(['saldos'], {  });
  }

  roboClick(){
    
  }
}
