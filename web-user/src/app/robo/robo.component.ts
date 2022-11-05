import { trigger, state, style, transition, animate } from '@angular/animations';
import { IfStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PopUpComponent } from '../pop-up/pop-up.component';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-robo',
  templateUrl: './robo.component.html',
  styleUrls: ['./robo.component.css'],
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
export class RoboComponent implements OnInit {

  loading = false;
  token! : string
  hide_op = true;
  hide_np = true;
  hide_rp = true;

  animation = false;
  oldPass :string = "";
  newPass :string = "";
  repeatNewPass :string = "";

  constructor(public dialog: MatDialog, private router:Router,private accountService:AccountService) { }

  ngOnInit(): void {
    if(localStorage.getItem('token')){
      this.token = localStorage.getItem('token') + ''
    }else{
      this.router.navigate(['login'], {  });
    }

    this.animation = true

  }

  reestablecerButtonOnClick() {

    if(this.newPass != this.repeatNewPass){
      this.dialog.open(PopUpComponent, {
        width: '350px',
        data: {
          dataKey: 'Error;Las contraseñas no coinciden.'
        }
      });
      return;
    }

    if(this.newPass.length < 8){
      this.dialog.open(PopUpComponent, {
        width: '350px',
        data: {
          dataKey: 'Error;La nueva contraseña debe tener más de 6 caracteres.'
        }
      });
      return;
    }

    this.loading = true;
    this.accountService.reportUser(this.oldPass, this.newPass, this.token).subscribe(
    data => {      
      this.loading = false
      if(data.result != 0){
        localStorage.removeItem('token')
        this.animation = false
        setTimeout(() => 
        {
          this.router.navigate(['login'], {queryParams: { status: 'reported' }});
        },
        400);
      }else{
        this.dialog.open(PopUpComponent, {
          width: '350px',
          data: {
            dataKey: 'Error;' + data.errors[0].msg
          }
        });
      }
    },
    error => {
      this.loading = false
      this.dialog.open(PopUpComponent, {
        width: '350px',
        data: {
          dataKey: 'Error;Error al reestablecer la cuenta.'
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
