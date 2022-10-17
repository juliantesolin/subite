import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'web-user';

  constructor(private router:Router) {}

  isLogin() {

    let path : string = this.router.url

    return path.includes('login') || path.includes('register') || path.includes('condiciones') || path.includes('acerca') || path.includes('verify')
  }

  registerClick(){
    localStorage.removeItem('token')
    this.router.navigate(['login'], {  });
  }

  homeClick(){
    this.router.navigate([''], {  });
  }
}
