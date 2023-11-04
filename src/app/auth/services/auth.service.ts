import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environments } from 'src/environments/environments';
import { User } from '../interfaces/user.interface';
import { Observable, tap, of, map, catchError } from 'rxjs';
import { FormGroup } from '@angular/forms';


@Injectable({providedIn: 'root'})
export class AuthService {

  private baseUrl= environments.baseUrl;
  private user?: User;

  constructor(private http: HttpClient) { }

  get currentUser() : User | undefined {
    if( !this.user) return undefined;
    return structuredClone(this.user);
  }

  login(email: string, password : string): Observable<User>{
    return this.http.get<User>(`${this.baseUrl}/users/1`)
    .pipe(
      tap( user => { this.user = user; }),
      tap( user =>  localStorage.setItem('token', 'asdaei3212.12321sa.d21312')),
    )
  }

  checkAuthentication(): Observable<boolean>{
    if(! localStorage.getItem('token')) return of(false);
    const token= localStorage.getItem('token');
    return this.http.get<User>(`${this.baseUrl}/users/1`)
    .pipe(
      tap(user => this.user = user),
      map(user => !!user),// true
      catchError(err => of(false))
    )

}

  logout(){
    this.user=undefined;
    localStorage.clear();
  }
  generateRandomNumericId(): number {
    return Math.floor(Math.random() * 1000); // Genera un número aleatorio entre 0 y 999
  }

  newUser(form: FormGroup){
    const url=`${this.baseUrl}/users`;
    const newRandomId: number =this.generateRandomNumericId();

    const newUser1: User = {
      id: newRandomId,
      user: form.controls['username'].value,
      email: form.controls['email'].value
    };

    this.http.post(url,newUser1).subscribe((response) => {
      console.log('Usuario Agregado:', response);
    });




      // const user1={
    //   id: 2,
    //   user: form.controls['name'].value,
    //   user: form.controls['username'].value,
    //   email:form.controls['email'].value,
    //    password: form.controls['password'].value,
    // }
  }


}
