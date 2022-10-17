import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VerifyEmailRequest } from '../models/verify-email-request';
import { PopUpComponent } from '../pop-up/pop-up.component';
import { LoginService } from '../services/log-in.service';
@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css'],
  providers: [LoginService]
})
export class VerifyEmailComponent implements OnInit {

  token!: string;
  confirmacion = false;
  initialize = false;

  constructor(private route: ActivatedRoute, private loginService: LoginService, private router:Router) { }

  ngOnInit(): void {

    this.route.queryParams
      .subscribe(params => {
        this.token = params['token'];
      }
    );

    this.confirmacion = false
    this.initialize = false;

    this.loginService.verifyEmail(this.token).subscribe(
      data => {
        console.log('Confirmaste el correo con el usuario')
        this.confirmacion = true
        this.initialize = true;
       } ,
      error => {
        console.log('Fallo la confirmacion')
        this.confirmacion = false
        this.initialize = true;
      }
      )
  }

  goToLoginClick(){
    this.router.navigate(['login'], {})
  }
}
