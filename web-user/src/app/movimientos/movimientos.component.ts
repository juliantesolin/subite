import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  fecha: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: '5.1', weight: 30, symbol: 'Transportista A', fecha: '20/06/22 11:13'},
  {position: 2, name: '4', weight: 20, symbol: 'Transportista C', fecha: '22/06/22 15:23'},
  {position: 3, name: '6.5', weight: 30, symbol: 'Transportista A', fecha: '28/06/22 09:02'},
  {position: 4, name: '2.8', weight: 15, symbol: 'Transportista A', fecha: '12/07/22 10:19'},
  {position: 5, name: '5', weight: 30, symbol: 'Transportista B', fecha: '18/07/22 21:15'},
  {position: 6, name: '6.5', weight: 30, symbol: 'Transportista C', fecha: '19/07/22 22:36'},
  {position: 7, name: '4.3', weight: 20, symbol: 'Transportista D', fecha: '23/07/22 06:48'},
  {position: 8, name: '2.2', weight: 15, symbol: 'Transportista B', fecha: '29/07/22 09:49'},
  {position: 9, name: '4', weight: 20, symbol: 'Transportista A', fecha: '02/08/22 16:27'},
  {position: 10, name: '1.9', weight: 15, symbol: 'Transportista D', fecha: '08/08/22 19:34'},
];

@Component({
  selector: 'app-movimientos',
  templateUrl: './movimientos.component.html',
  styleUrls: ['./movimientos.component.css']
})
export class MovimientosComponent implements OnInit {

  constructor() { }

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'fecha'];
  dataSource = ELEMENT_DATA;

  ngOnInit(): void {

    localStorage.getItem('token')


  }



}
