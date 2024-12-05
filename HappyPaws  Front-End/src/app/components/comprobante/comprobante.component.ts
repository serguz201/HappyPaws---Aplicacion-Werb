import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarcomprobanteComponent } from './listarcomprobante/listarcomprobante.component';

@Component({
  selector: 'app-comprobante',
  standalone: true,
  imports: [RouterOutlet, ListarcomprobanteComponent],
  templateUrl: './comprobante.component.html',
  styleUrl: './comprobante.component.css'
})
export class ComprobanteComponent implements OnInit{
  constructor(public route:ActivatedRoute){}
  ngOnInit(): void {}
}
