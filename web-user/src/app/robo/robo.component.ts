import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PopUpComponent } from '../pop-up/pop-up.component';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-robo',
  templateUrl: './robo.component.html',
  styleUrls: ['./robo.component.css'],
  providers: [AccountService]
})
export class RoboComponent implements OnInit {

  loading = false;
  token! : string
  hide = true;

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

  }

  reestablecerButtonOnClick() {

    if(this.newPass != this.repeatNewPass){
      this.dialog.open(PopUpComponent, {
        width: '350px',
        data: {
          dataKey: 'Las contraseñas no coinciden.'
        }
      });
      return;
    }

    if(this.newPass.length < 8){
      this.dialog.open(PopUpComponent, {
        width: '350px',
        data: {
          dataKey: 'La nueva contraseña debe tener mas de 8 caracteres.'
        }
      });
      return;
    }

    this.loading = true;
    this.accountService.reportUser(this.newPass, this.token).subscribe(
    data => {      
      this.loading = false
      localStorage.removeItem('token')
      this.router.navigate(['login'], {  });
    },
    error => {
      this.loading = false
      this.dialog.open(PopUpComponent, {
        width: '350px',
        data: {
          dataKey: 'Error al reestablecer la cuenta.'
        }
      });
    }
    ) 
  }

  backButtonOnClick() {
    this.router.navigate(['home'], {  });
  }

}
