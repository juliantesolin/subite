import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LogInComponent } from './log-in/log-in.component';
import { MovimientosComponent } from './movimientos/movimientos.component';
import { RegisterComponent } from './register/register.component';
import { SaldosComponent } from './saldos/saldos.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';

const routes: Routes = [
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LogInComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'confirmarEmail', component: VerifyEmailComponent },
  { path: 'home', component: HomeComponent },
  { path: 'saldos', component: SaldosComponent },
  { path: 'movimientos', component: MovimientosComponent },
  { path: '**', redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
