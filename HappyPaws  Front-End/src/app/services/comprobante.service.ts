import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, Subject } from 'rxjs';
import { Comprobante } from '../models/Comprobante';

const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class ComprobanteService {
  private url=`${base_url}/comprobantes`
  private listaCambio = new Subject<Comprobante[]>()
  constructor(private http:HttpClient) { }

  list() {
    return this.http.get<Comprobante[]>(this.url).pipe(
      map((comprobante: Comprobante[]) => comprobante.sort((a, b) => a.idComprobante - b.idComprobante))
    );
  }
  insert(comprobante:Comprobante){
    return this.http.post(this.url, comprobante)
  }

  setList(listaCambio: Comprobante[]){
    this.listaCambio.next(listaCambio)
  }
  getList(){
    return this.listaCambio.asObservable()
  }
  delete(id:number){
    return this.http.delete(`${this.url}/${id}`)
  }
  listId(id:number){
    return this.http.get<Comprobante>(`${this.url}/${id}`)
  }
  update(c:Comprobante){
    return this.http.put(this.url, c)
  }
}
