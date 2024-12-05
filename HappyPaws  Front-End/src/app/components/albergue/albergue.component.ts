import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListaralbergueComponent } from './listaralbergue/listaralbergue.component';

@Component({
  selector: 'app-albergue',
  standalone: true,
  imports: [ListaralbergueComponent, RouterOutlet],
  templateUrl: './albergue.component.html',
  styleUrl: './albergue.component.css'
})
export class AlbergueComponent implements OnInit{
  constructor(public route:ActivatedRoute){}
  ngOnInit(): void {}
}
