import { Component, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { Cita } from '../../../models/Cita';
import { CitaService } from '../../../services/cita.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-citaspendientes',
  standalone: true,
  imports: [MatTableModule, MatIconModule, RouterModule, MatPaginatorModule],
  templateUrl: './citaspendientes.component.html',
  styleUrl: './citaspendientes.component.css'
})
export class CitaspendientesComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource:MatTableDataSource<Cita>=new MatTableDataSource()
  displayedColumns:string[]=['c1','c2','c3','c4', 'c5']
  constructor(public snackBar: MatSnackBar,private cS: CitaService){}
  ngOnInit(): void {
    this.cS.getPendientes().subscribe((data) => {
        this.dataSource=new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
    });
  }
}