import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

  constructor(private router: Router,
              public loadingService:LoadingService
  ) {}

  isLoginRoute(): boolean {
    return this.router.url === '/login' || this.router.url === '/signup'; // Retorna true si está en la ruta de login
  }

}
