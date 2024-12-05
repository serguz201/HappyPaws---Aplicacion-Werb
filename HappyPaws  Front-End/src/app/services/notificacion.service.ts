import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, Observable, Subject } from 'rxjs';
import { Notificacion } from '../models/Notificacion';
import { NotificacionByDate } from '../models/NotificacionByDate';

const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class NotificacionService {
  private url=`${base_url}/notificaciones`
  private listaCambio = new Subject<Notificacion[]>()
  constructor(private http:HttpClient) { }

  list() {
    return this.http.get<Notificacion[]>(this.url).pipe(
      map((notificacion: Notificacion[]) => notificacion.sort((a, b) => a.idNotificacion- b.idNotificacion))
    );
  }
  insert(notificacion:Notificacion){
    return this.http.post(this.url, notificacion)
  }

  setList(listaCambio: Notificacion[]){
    this.listaCambio.next(listaCambio)
  }
  getList(){
    return this.listaCambio.asObservable()
  }
  delete(id:number){
    return this.http.delete(`${this.url}/${id}`)
  }
  listId(id:number){
    return this.http.get<Notificacion>(`${this.url}/${id}`)
  }
  update(n:Notificacion){
    return this.http.put(this.url, n)
  }
  getNotixFecha(fecha:Date):Observable<NotificacionByDate[]>{
    return this.http.get<NotificacionByDate[]>(`${this.url}/notificacionxfecha/${fecha}`)
  }
}
