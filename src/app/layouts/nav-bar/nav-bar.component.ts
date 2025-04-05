import { Component, inject, input } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NgbCollapseModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { UsersService } from './../../core/services/users.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [NgbDropdownModule, NgbCollapseModule, RouterLink, RouterLinkActive], 
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'] 
})
export class NavBarComponent {
  private readonly router = inject(Router);
  private readonly usersService = inject(UsersService);

  isLogin = input<boolean>(true); 
  isCollapsed = true;



  signOut():void{
    this.usersService.signOut()
  }
}