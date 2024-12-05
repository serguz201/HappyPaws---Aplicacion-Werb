import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { Donacion } from '../../../models/Donacion';
import { DonacionService } from '../../../services/donacion.service';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-donacionesxmontos',
  standalone: true,
  imports: [MatTableModule, MatIconModule, RouterModule, MatPaginatorModule],
  templateUrl: './donacionesxmontos.component.html',
  styleUrl: './donacionesxmontos.component.css'
})
export class DonacionesxmontosComponent implements OnInit{
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource:MatTableDataSource<Donacion>=new MatTableDataSource()
  displayedColumns:string[]=['c1','c2', 'c3']
  constructor(public snackBar: MatSnackBar,private dS: DonacionService){}
  ngOnInit(): void {
    this.dS.getMontos().subscribe((data) => {
        this.dataSource=new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
    });
  }
}
