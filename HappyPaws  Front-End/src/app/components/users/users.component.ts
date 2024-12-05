import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarusuarioComponent } from './listarusuario/listarusuario.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [ListarusuarioComponent, RouterOutlet],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
  constructor(public route:ActivatedRoute){}
  ngOnInit(): void {}
}
