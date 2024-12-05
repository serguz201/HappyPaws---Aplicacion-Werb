import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Albergue } from '../../../models/Albergue';
import { AlbergueService } from '../../../services/albergue.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-albergueabierto',
  standalone: true,
  imports: [MatTableModule, MatIconModule, RouterModule, MatPaginatorModule],
  templateUrl: './albergueabierto.component.html',
  styleUrl: './albergueabierto.component.css'
})
export class AlbergueabiertoComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource:MatTableDataSource<Albergue>=new MatTableDataSource()
  displayedColumns:string[]=['c4','c6','c7','c8','c9']
  constructor(private aS: AlbergueService){}
  ngOnInit(): void {
    this.aS.getOpen().subscribe((data) => {
        this.dataSource=new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
    });
  }
}
