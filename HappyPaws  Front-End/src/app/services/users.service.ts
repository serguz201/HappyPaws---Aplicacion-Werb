import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Users } from '../models/Users';
import { map, Observable, Subject } from 'rxjs';

const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private url=`${base_url}/usuarios`
  private listaCambio = new Subject<Users[]>()
  constructor(private http:HttpClient) { }
  list() {
    return this.http.get<Users[]>(this.url).pipe(
      map((users: Users[]) => users.sort((a, b) => a.id - b.id)) 
    );
  }
  
  insert(user:Users){
    return this.http.post(this.url, user)
  }

  setList(listaCambio: Users[]){
    this.listaCambio.next(listaCambio)
  }
  getList(){
    return this.listaCambio.asObservable()
  }
  delete(id:number){
    return this.http.delete(`${this.url}/${id}`)
  }
  listId(id:number){
    return this.http.get<Users>(`${this.url}/${id}`)
  }
  update(u:Users){
    return this.http.put(this.url, u)
  }
  getActivos():Observable<Users[]>{
    return this.http.get<Users[]>(`${this.url}/activos`)
  }
}
