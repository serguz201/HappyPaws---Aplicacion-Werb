import { Component, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { Comprobante } from '../../../models/Comprobante';
import { ComprobanteService } from '../../../services/comprobante.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-listarcomprobante',
  standalone: true,
  imports: [MatTableModule, MatIconModule, RouterModule, MatPaginatorModule],
  templateUrl: './listarcomprobante.component.html',
  styleUrl: './listarcomprobante.component.css'
})
export class ListarcomprobanteComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource:MatTableDataSource<Comprobante>=new MatTableDataSource()
  displayedColumns:string[]=['c1','c2','c3','c4', 'accion01']
  constructor(public snackBar: MatSnackBar,private cS: ComprobanteService){}
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
