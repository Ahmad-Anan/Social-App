import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { authGuard } from './shared/guards/auth.guard';
import { loggedGuard } from './shared/guards/logged.guard';


export const routes: Routes = [
    { path: '', redirectTo: 'timeLine', pathMatch: 'full' },

    {path: '',component: AuthLayoutComponent,canActivate: [loggedGuard],children: [
        { path: 'login', component: LoginComponent, title: 'Login' },
        { path: 'register', component: RegisterComponent, title: 'Register' },
    ]
    },
{
    path: '',component: MainLayoutComponent, canActivate: [authGuard],children: [
        { path: 'timeLine', loadComponent: () => import('./pages/time-line/time-line.component').then(m => m.TimeLineComponent), title: 'Time Line' },

        // { path: '**', loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent), title: 'Error 404' }
        ]

    }
];