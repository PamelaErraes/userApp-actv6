import { IUser } from './../interfaces/iuser.interfaces';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { IResponse } from '../interfaces/iresponse.nterfaces';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl: string = 'https://peticiones.online/api/users';
  private httpClient = inject(HttpClient);

  //obtener todos los usuarios
  getAll(): Observable<IResponse> {
    return this.httpClient.get<IResponse>(this.baseUrl);
  }

  getAllPromise(): Promise<IResponse> {
    return lastValueFrom(this.httpClient.get<IResponse>(this.baseUrl));
  }

  //Obtener un usuario por id
  getUserById(_id: string): Observable<IUser> {
    return this.httpClient.get<IUser>(`${this.baseUrl}/${_id}`);
  }

  // Método para crear un nuevo usuario
  createUser(user: IUser): Observable<IUser> {
    return this.httpClient.post<IUser>(this.baseUrl, user);
  }

  //actualizar
  updateUser(id: number, user: any): Observable<any> {
    return this.httpClient.put<any>(`${this.baseUrl}/${id}`, user);
  }

 //Eliminar un usuario
 deleteUser(id: number): Observable<IUser>{
  return this.httpClient.delete<any>(`${this.baseUrl}/${id}`);

 }
}
