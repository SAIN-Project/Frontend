import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs'
import { map } from 'rxjs/operators'
import { Router } from '@angular/router'

export interface UserDetails {
  id: number
  firstname: string
  lastname: string
  email: string
  expire: number
}

interface TokenResponse {
  token: string
}



@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private token: string

  constructor(private http: HttpClient, private router: Router) { }

  private saveToken(token: string): void {
    localStorage.setItem('usertoken', token)
    this.token = token
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('usertoken')
    }
    return this.token
  }
  public getUserDetails(): UserDetails {
    const token = this.getToken()
    
    if (token) {
      let payload = token.split('.')[1]
      payload = window.atob(payload)
      return JSON.parse(payload)
    } 
    else {
      return null
    }
  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetails()
    if (user)  return user.expire > Date.now() / 1000

    else return false   
  }

  public register(user:any): Observable<any> {
    return this.http.post('/account/register', user)
  }

  public login(user:any): Observable<any> {
    const base = this.http.post('/account/login', user)

    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token)
        }
        return data
      })
    )
    
    return request
  }

  public profile(): Observable<any> {
    return this.http.get(`/account/profile`, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }

  public logout(): void {
    this.token = null
    window.localStorage.removeItem('usertoken')
    this.router.navigateByUrl('/login')
  }

  public handleError(errorMessage:any):string{
    var error='Undefined error'
    if(errorMessage.error){
      var e=JSON.stringify(errorMessage.error)
      error=JSON.parse(e)["error"];
    }
    return error
  }
}
