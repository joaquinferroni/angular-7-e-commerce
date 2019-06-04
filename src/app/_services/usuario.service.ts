import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Usuario } from '../_entities/usuario.entity';
import { UsuarioInfo } from '../_entities/usuarioInfo.entity';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  token = '';
  user: UsuarioInfo;
  constructor(
    private httpClient: HttpClient,
    private loginService: LoginService
  ) {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.token = this.user.Token;
  }


  GetUser(id: Number): Observable<Usuario> {
    const header = new HttpHeaders().append('Authorization', this.user.Token);
    return this.httpClient.get<Usuario>(`${environment.apiUrl}/Usuario`, {
      params: new HttpParams().set('id', String(id)), headers: header
    });
  }
 
  SaveUser(user: Usuario): Observable<Usuario> {
    const header = new HttpHeaders().append('Authorization', this.user.Token);
    return this.httpClient.post<Usuario>(`${environment.apiUrl}/Usuario`, user, {
      headers: header
    });
  }

  uploadImage(img: File, id: number): Observable<any> {
    const uploadData = new FormData();
    uploadData.append('imageProfile', img, img.name);
    uploadData.append('usu_Id', String(id));
    return this.httpClient.post(`${environment.apiUrl}/Usuario/UploadImagen`, uploadData, { reportProgress: true, observe: 'events' });
  }

  GetUserImagePath(id: number): string {
    return `${environment.pathImagenUsuario}/${id}/`;
  }
}
