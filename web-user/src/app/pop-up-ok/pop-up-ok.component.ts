import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-pop-up-ok',
  templateUrl: './pop-up-ok.component.html',
  styleUrls: ['./pop-up-ok.component.css']
})
export class PopUpOkComponent implements OnInit {

  title: string
  text: string

  constructor(public dialogRef: MatDialogRef<PopUpOkComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    let textos = data.dataKey.split(';')
    this.title = textos[0]
    this.text = textos[1]
  }

  ngOnInit(): void {
  }
}
