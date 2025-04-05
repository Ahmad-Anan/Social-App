import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../shared/environments/environment';
import { jwtDecode } from "jwt-decode";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient:HttpClient, private router: Router) { }
  userData:any = null;


  signUp(data: object): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}users/signup`, data);
  }

signIn(data :object):Observable<any>{
return this.httpClient.post(`${environment.baseUrl}users/signin` , data)
};

changePassword(data :object):Observable<any>{
return this.httpClient.post(`${environment.baseUrl}users/change-password` , data)
};

uploadProfilePhoto(data :object):Observable<any>{
return this.httpClient.put(`${environment.baseUrl}users/upload-photo` , data)
};

GetLoggedUserData():Observable<any>{
return this.httpClient.get(`${environment.baseUrl}users/profile-data` )
};


saveDataUser(): void {
  const token = sessionStorage.getItem('token');
  if (token !== null) {
    this.userData = jwtDecode(token);
  }
}

signOut():void{
  sessionStorage.removeItem('token');
  this.userData = null;
  this.router.navigate(['/login']) 
  
  }



}
