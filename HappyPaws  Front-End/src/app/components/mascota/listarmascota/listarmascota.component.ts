import { Component, OnInit, ViewChild } from '@angular/core';
import { Mascota } from '../../../models/Mascota';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MascotaService } from '../../../services/mascota.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-listarmascota',
  standalone: true,
  imports: [MatTableModule, MatIconModule, RouterModule, MatPaginatorModule],
  templateUrl: './listarmascota.component.html',
  styleUrl: './listarmascota.component.css'
})
export class ListarmascotaComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource:MatTableDataSource<Mascota>=new MatTableDataSource()
  displayedColumns:string[]=['c1','c2','c3','c4', 'c5','c6','c7','c8','c9','accion01']
  constructor(public snackBar: MatSnackBar,private mS: MascotaService){}
  ngOnInit(): void {
    this.mS.list().subscribe((data) => {
        this.dataSource=new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
    });
    this.mS.getList().subscribe((data) => {
      this.dataSource=new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }
  eliminar(id:number){
    this.mS.delete(id).subscribe((data) => {
      this.mS.list().subscribe((data) => {
        this.mS.setList(data)
      });
    });
    this.snackBar.open('Eliminación exitosa', 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }
}
