import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent implements OnInit {

  constructor(private router: Router,
              private authService: AuthService) {}

  isCollapsed = false; //estado del sidebar

  user: any;

  ngOnInit(): void {
      this.user = JSON.parse(localStorage.getItem('user') || '');
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed; // Cambia el estado del sidebar
  }

}
