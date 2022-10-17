import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-pop-up-ok',
  templateUrl: './pop-up-ok.component.html',
  styleUrls: ['./pop-up-ok.component.css'],
  animations: [
    trigger('flyInOut', [
      state('in', style({ opacity:1,transform: 'translateY(0)' })),
      transition('void => *', [
        style({ opacity:0,transform: 'translateY(-100%)' }),
        animate(400)
      ]),
      transition('* => void', [
        animate(400, style({ opacity:0,transform: 'translateY(-100%)' }))
      ])
    ])
  ]
})
export class PopUpOkComponent implements OnInit {

  title: string
  text: string
  animation = false

  constructor(public dialogRef: MatDialogRef<PopUpOkComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    let textos = data.dataKey.split(';')
    this.title = textos[0]
    this.text = textos[1]
  }

  ngOnInit(): void {
    this.animation = true
  }
}
