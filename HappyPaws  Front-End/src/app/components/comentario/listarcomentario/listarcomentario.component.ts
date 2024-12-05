import { Component, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { Comentario } from '../../../models/Comentario';
import { ComentarioService } from '../../../services/comentario.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-listarcomentario',
  standalone: true,
  imports: [MatTableModule, MatIconModule, RouterModule, MatPaginatorModule],
  templateUrl: './listarcomentario.component.html',
  styleUrl: './listarcomentario.component.css'
})
export class ListarcomentarioComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource:MatTableDataSource<Comentario>=new MatTableDataSource()
  displayedColumns:string[]=['c1','c2','c3','c4', 'accion01']
  constructor(public snackBar: MatSnackBar,private cS: ComentarioService){}
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
