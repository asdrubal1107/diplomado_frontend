import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenKey = 'bd6ccbce08991570d76153cdcd3946e45aa69c8dd9d7518a4d717a2aa1deecdd';

  loggedIn = new BehaviorSubject<boolean>(false);

  logued: boolean = false;
  usuario: any;

  formInvalid = false;

  get isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  private apiUrl = environment.apiUrl + '/auth';

  menuItems = ['Ingresar']; // Agrega los nombres de los elementos del menú aquí

  constructor(private http: HttpClient,
              private router: Router
  ) { }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData).pipe(
      catchError(this.handleError)
    );
  }

  login(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, userData).pipe(
      catchError(this.handleError)
    );
  }

  // Método para cerrar sesión
  logout(): void {
    localStorage.removeItem('token');  // Elimina el token del almacenamiento local
    this.router.navigate(['/login']);  // Redirige al usuario a la página de login
  }

  private handleError(error: HttpErrorResponse) {

    let errorMessage = 'Ocurrió un error desconocido';
    
    if (error.error instanceof ErrorEvent) {
      // Errores del cliente (errores de red o del navegador)
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Errores que provienen del servidor
      errorMessage = `Error ${error.status}: ${error.error.message || 'Error en el servidor'}`;
    }

    // Muestra el error en la consola para debugging
    console.error(errorMessage);

    // Retorna el mensaje de error para que pueda ser capturado por los componentes
    return throwError(() => new Error(errorMessage));
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  // Obtiene el token del almacenamiento local
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Elimina el token
  clearToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

}
