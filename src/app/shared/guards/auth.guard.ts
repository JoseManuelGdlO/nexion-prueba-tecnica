import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storage.service';
import { ACCESS_TOKEN } from '../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, public storageService: StorageService) {}

  canActivate(): Promise<boolean> | Observable<boolean> {
    // Aquí va la lógica para verificar si el usuario puede acceder a la ruta
    return this.checkAuthentication();

  }

  // Método de ejemplo para verificar autenticación
  private async checkAuthentication(): Promise<boolean> {
    try {
      // Esperamos la respuesta de angular-storage para obtener el token
      const token = await this.storageService.get(ACCESS_TOKEN); // Suponiendo que retorna un Observable
        
      if (token) {
        // Si el token existe, permitimos la navegación
        return true;
      } else {
        // Si no hay token, redirigimos al usuario al login
        this.router.navigate(['/auth']);
        console.info('no has hecho login');
        return false;
      }
    } catch (error) {
      console.error('Error al obtener el token:', error);
      this.router.navigate(['/auth']);
      return false;
    }
  }
}
