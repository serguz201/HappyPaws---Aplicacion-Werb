import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, Observable, Subject } from 'rxjs';
import { Mascota } from '../models/Mascota';
import { MascotaByAdopcionDTO } from '../models/MascotaByAdopcionDTO';
import { MascotaByRazaDTO } from '../models/MascotaByRazaDTO';

const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class MascotaService {
  private url=`${base_url}/mascotas`
  private listaCambio = new Subject<Mascota[]>()
  constructor(private http:HttpClient) { }

  list() {
    return this.http.get<Mascota[]>(this.url).pipe(
      map((mascota: Mascota[]) => mascota.sort((a, b) => a.idMascota- b.idMascota))
    );
  }
  insert(mascota:Mascota){
    return this.http.post(this.url, mascota)
  }

  setList(listaCambio: Mascota[]){
    this.listaCambio.next(listaCambio)
  }
  getList(){
    return this.listaCambio.asObservable()
  }
  delete(id:number){
    return this.http.delete(`${this.url}/${id}`)
  }
  listId(id:number){
    return this.http.get<Mascota>(`${this.url}/${id}`)
  }
  update(m:Mascota){
    return this.http.put(this.url, m)
  }
  getRaza():Observable<MascotaByRazaDTO[]>{
    return this.http.get<MascotaByRazaDTO[]>(`${this.url}/mascotaxraza`)
  }
  getAdopcion():Observable<MascotaByAdopcionDTO[]>{
    return this.http.get<MascotaByAdopcionDTO[]>(`${this.url}/mascotaxadopcion`)
  }
}
