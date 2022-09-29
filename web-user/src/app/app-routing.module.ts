import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LogInComponent } from './log-in/log-in.component';
import { MercadoPagoComponent } from './mercado-pago/mercado-pago.component';
import { MovimientosComponent } from './movimientos/movimientos.component';
import { RegisterComponent } from './register/register.component';
import { SaldosComponent } from './saldos/saldos.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { TerminosCondicionesComponent } from './terminos-condiciones/terminos-condiciones.component';
import { SugerenciasComponent } from './sugerencias/sugerencias.component';
import { AcercaDeComponent } from './acerca-de/acerca-de.component';

const routes: Routes = [
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LogInComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'confirmarEmail', component: VerifyEmailComponent },
  { path: 'home', component: HomeComponent },
  { path: 'saldos', component: SaldosComponent },
  { path: 'movimientos', component: MovimientosComponent },
  { path: 'mercadoPago', component: MercadoPagoComponent },
  { path: 'terminos-condiciones', component: TerminosCondicionesComponent },
  { path: 'sugerencias', component: SugerenciasComponent },
  { path: 'acerca-de', component: AcercaDeComponent },
  { path: '**', redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
