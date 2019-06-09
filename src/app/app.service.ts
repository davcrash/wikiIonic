import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  public endPointService: string = environment.apiUrl;
  public clientHeaders: HttpHeaders;

  constructor(private http: HttpClient) { }

  SetEndPoint(nameServer: string) {
    this.endPointService = nameServer;
  }

  Get(methodService: string, methodParams: Array<any>): Observable<any> {
    let EndPointRequest = this.endPointService + methodService + '?';
    for (const tuple of Object.keys(methodParams)) {
      EndPointRequest += tuple + '=' + methodParams[tuple] + '&';
    }
    let tokenStorage = 'Bearer ';
    // tslint:disable-next-line:max-line-length
    tokenStorage += (environment.clientStorageType === 'SESSION') ? sessionStorage.getItem('applicationCurrentUser') : localStorage.getItem('applicationCurrentUser');
    const headers = new HttpHeaders().set('Authorization', tokenStorage);
    return this.http.get(EndPointRequest.slice(0, -1), { headers });
  }

  Post(methodService: string, methodParams: object): Observable<any> {
    const EndPointRequest = `${this.endPointService}${methodService}`;
    const headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');
    return this.http.post(EndPointRequest, methodParams, { headers });
  }

  Put(methodService: string, methodParams: object): Observable<any> {
    const EndPointRequest = `${this.endPointService}${methodService}`;
    const headers =
      new HttpHeaders().set('Authorization',
        localStorage.getItem('applicationCurrentUser'));
    return this.http.put(EndPointRequest, methodParams, { headers });
  }

  Delete(methodService: string, methodParams: HttpParams): Observable<any> {
    let EndPointRequest = this.endPointService + methodService + '?';
    for (const tuple of Object.keys(methodParams)) {
      EndPointRequest += tuple + '=' + methodParams[tuple] + '&';
    }
    let tokenStorage = 'Bearer ';
    // tslint:disable-next-line:max-line-length
    tokenStorage += (environment.clientStorageType === 'SESSION') ? sessionStorage.getItem('applicationCurrentUser') : localStorage.getItem('applicationCurrentUser');
    const headers = new HttpHeaders().set('Authorization', tokenStorage);
    return this.http.delete(EndPointRequest.slice(0, -1), { headers });
  }
}
