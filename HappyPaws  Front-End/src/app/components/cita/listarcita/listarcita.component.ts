import { Component, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { Cita } from '../../../models/Cita';
import { CitaService } from '../../../services/cita.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-listarcita',
  standalone: true,
  imports: [MatTableModule, MatIconModule, RouterModule, MatPaginatorModule],
  templateUrl: './listarcita.component.html',
  styleUrl: './listarcita.component.css'
})
export class ListarcitaComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource:MatTableDataSource<Cita>=new MatTableDataSource()
  displayedColumns:string[]=['c1','c2','c3','c4', 'c5','c6','c7', 'c8','accion01']
  constructor(public snackBar: MatSnackBar,private cS: CitaService){}
  ngOnInit(): void {
    this.cS.list().subscribe((data) => {
        this.dataSource=new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
    });
    this.cS.getList().subscribe((data) => {
      this.dataSource=new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }
  eliminar(id:number){
    this.cS.delete(id).subscribe((data) => {
      this.cS.list().subscribe((data) => {
        this.cS.setList(data)
      });
    });
    this.snackBar.open('Eliminación exitosa', 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }
}
