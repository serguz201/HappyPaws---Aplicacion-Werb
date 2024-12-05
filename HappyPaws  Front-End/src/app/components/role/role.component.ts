import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarroleComponent } from './listarrole/listarrole.component';

@Component({
  selector: 'app-role',
  standalone: true,
  imports: [RouterOutlet, ListarroleComponent],
  templateUrl: './role.component.html',
  styleUrl: './role.component.css'
})
export class RoleComponent implements OnInit {
  constructor(public route:ActivatedRoute){}
  ngOnInit(): void {}
}