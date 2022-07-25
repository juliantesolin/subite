import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private _formBuilder: FormBuilder) {}
  mailFormGroup: FormGroup = this._formBuilder.group({mailCtrl: ['']});
  passFormGroup: FormGroup = this._formBuilder.group({passCtrl: ['']});
  hide = true;

  ngOnInit(): void {
  }

}
