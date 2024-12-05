import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListardonacionComponent } from './listardonacion/listardonacion.component';

@Component({
  selector: 'app-donacion',
  standalone: true,
  imports: [RouterOutlet,ListardonacionComponent],
  templateUrl: './donacion.component.html',
  styleUrl: './donacion.component.css'
})
export class DonacionComponent  implements OnInit{
  constructor(public route:ActivatedRoute){}
  ngOnInit(): void {}
}
