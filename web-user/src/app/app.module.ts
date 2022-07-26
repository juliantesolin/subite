import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogInComponent } from './log-in/log-in.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule  } from "@angular/material/input";
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { LoginService } from './services/log-in.service';
import {MatDividerModule} from '@angular/material/divider';
import {MatMenuModule} from '@angular/material/menu';
import { HomeComponent } from './home/home.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import {MatDialogModule} from '@angular/material/dialog';
import { PopUpComponent } from './pop-up/pop-up.component';
import { RegisterComponent } from './register/register.component';
import {MatStepperModule} from '@angular/material/stepper';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { SaldosComponent } from './saldos/saldos.component';
import { MovimientosComponent } from './movimientos/movimientos.component';
import {MatTableModule} from '@angular/material/table';
import { MercadoPagoComponent } from './mercado-pago/mercado-pago.component';
import { TerminosCondicionesComponent } from './terminos-condiciones/terminos-condiciones.component';
import { AcercaDeComponent } from './acerca-de/acerca-de.component';
import { SugerenciasComponent } from './sugerencias/sugerencias.component';
import { RoboComponent } from './robo/robo.component';
import { AsociarTarjetaComponent } from './asociar-tarjeta/asociar-tarjeta.component';
import { PopUpOkComponent } from './pop-up-ok/pop-up-ok.component';
import { TransferirComponent } from './transferir/transferir.component';

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    HomeComponent,
    VerifyEmailComponent,
    PopUpComponent,
    RegisterComponent,
    SaldosComponent,
    MovimientosComponent,
    MercadoPagoComponent,
    TerminosCondicionesComponent,
    AcercaDeComponent,
    SugerenciasComponent,
    RoboComponent,
    AsociarTarjetaComponent,
    PopUpOkComponent,
    TransferirComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    HttpClientModule,
    MatDividerModule,
    MatMenuModule,
    MatDialogModule,
    MatStepperModule,
    MatProgressSpinnerModule,
    MatTableModule
  ],
  providers: [{provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}, LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
