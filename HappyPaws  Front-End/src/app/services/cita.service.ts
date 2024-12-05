import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, Observable, Subject } from 'rxjs';
import { Cita } from '../models/Cita';

const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class CitaService {
  private url=`${base_url}/citas`
  private listaCambio = new Subject<Cita[]>()
  constructor(private http:HttpClient) { }

  list() {
    return this.http.get<Cita[]>(this.url).pipe(
      map((citas: Cita[]) => citas.sort((a, b) => a.idCita - b.idCita))
    );
  }
  insert(cita:Cita){
    return this.http.post(this.url, cita)
  }

  setList(listaCambio: Cita[]){
    this.listaCambio.next(listaCambio)
  }
  getList(){
    return this.listaCambio.asObservable()
  }
  delete(id:number){
    return this.http.delete(`${this.url}/${id}`)
  }
  listId(id:number){
    return this.http.get<Cita>(`${this.url}/${id}`)
  }
  update(c:Cita){
    return this.http.put(this.url, c)
  }
  getPendientes(): Observable<Cita[]>{
    return this.http.get<Cita[]>(`${this.url}/buscarxpendiente`)
  }
}
