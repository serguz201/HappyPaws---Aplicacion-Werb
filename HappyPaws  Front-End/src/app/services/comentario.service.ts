import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, Subject } from 'rxjs';
import { Comentario } from '../models/Comentario';

const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class ComentarioService {
  private url=`${base_url}/comentarios`
  private listaCambio = new Subject<Comentario[]>()
  constructor(private http:HttpClient) { }

  list() {
    return this.http.get<Comentario[]>(this.url).pipe(
      map((comentario: Comentario[]) => comentario.sort((a, b) => a.idComentario - b.idComentario))
    );
  }
  insert(comentario:Comentario){
    return this.http.post(this.url, comentario)
  }

  setList(listaCambio: Comentario[]){
    this.listaCambio.next(listaCambio)
  }
  getList(){
    return this.listaCambio.asObservable()
  }
  delete(id:number){
    return this.http.delete(`${this.url}/${id}`)
  }
  listId(id:number){
    return this.http.get<Comentario>(`${this.url}/${id}`)
  }
  update(c:Comentario){
    return this.http.put(this.url, c)
  }
}
