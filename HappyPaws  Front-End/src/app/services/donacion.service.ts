import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, Observable, Subject } from 'rxjs';
import { Donacion } from '../models/Donacion';
import { DonacionByNameDTO } from '../models/DonacionByNameDTO';

const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class DonacionService {
  private url=`${base_url}/donaciones`
  private listaCambio = new Subject<Donacion[]>()
  constructor(private http:HttpClient) { }

  list() {
    return this.http.get<Donacion[]>(this.url).pipe(
      map((donacion: Donacion[]) => donacion.sort((a, b) => a.idDonacion- b.idDonacion))
    );
  }
  insert(donacion:Donacion){
    return this.http.post(this.url, donacion)
  }

  setList(listaCambio: Donacion[]){
    this.listaCambio.next(listaCambio)
  }
  getList(){
    return this.listaCambio.asObservable()
  }
  delete(id:number){
    return this.http.delete(`${this.url}/${id}`)
  }
  listId(id:number){
    return this.http.get<Donacion>(`${this.url}/${id}`)
  }
  update(d:Donacion){
    return this.http.put(this.url, d)
  }
  getDonaciones():Observable<DonacionByNameDTO[]>{
    return this.http.get<DonacionByNameDTO[]>(`${this.url}/donacionxnombre`)
  }
  getMontos():Observable<Donacion[]>{
    return this.http.get<Donacion[]>(`${this.url}/buscarxmonto`)
  }
}
