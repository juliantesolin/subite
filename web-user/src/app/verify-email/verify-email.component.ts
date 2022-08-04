import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private route: ActivatedRoute, private loginService: LoginService) { }

  ngOnInit(): void {

    this.route.queryParams
      .subscribe(params => {
        this.token = params['token'];
      }
    );

    this.loginService.verifyEmail(this.token).subscribe(
      data => {
        console.log('Confirmaste el correo con el usuario')

       } ,
      error => {
        console.log('fallo la confirmacion')
      }
      )
  }

}
