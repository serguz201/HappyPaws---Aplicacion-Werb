import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Users } from '../../../models/Users';
import { UsersService } from '../../../services/users.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-usersactivos',
  standalone: true,
  imports: [MatTableModule, MatIconModule, RouterModule, MatPaginatorModule],
  templateUrl: './usersactivos.component.html',
  styleUrl: './usersactivos.component.css'
})
export class UsersactivosComponent implements OnInit{
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource:MatTableDataSource<Users>=new MatTableDataSource()
  displayedColumns:string[]=['c1','c2','c3']
  constructor(private uS: UsersService, public snackBar: MatSnackBar){}
  ngOnInit(): void {
    this.uS.getActivos().subscribe((data) => {
      this.dataSource=new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }
}
