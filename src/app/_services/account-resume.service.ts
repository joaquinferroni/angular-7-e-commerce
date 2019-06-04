import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {  HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AccountResume } from '../_entities/account-resume.entity';

@Injectable({
  providedIn: 'root'
})
export class AccountResumeService {
  constructor(
    private httpClient: HttpClient
  ) { }

  GetAccountResumes(from: Date, to: Date): Observable<AccountResume[]> {
    const params = new HttpParams()
                  .set('from', from.toDateString())
                  .set('to', to.toDateString());
    return this.httpClient.get<AccountResume[]>(`${environment.apiUrl}/AccountResume`, {params: params});
  }


}
