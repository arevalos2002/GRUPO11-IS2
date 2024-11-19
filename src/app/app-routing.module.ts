import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from './layout/app.layout.component';
import { RegisterComponent } from './demo/components/auth/register/register.component';
import { LoginComponent } from '../app/demo/components/auth/login/login.component';
import { DashboardComponent } from '../app/demo/components/dashboard/dashboard.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppLayoutComponent,
                children: [
                    { path: '', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
                    { path: 'tableros', loadChildren: () => import('./demo/components/tablero/tablero.module').then(m => m.TableroModule) }
                ]
            },
            { path: 'auth', loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule) },
            { path: 'notfound', component: NotfoundComponent },
            { path: '', redirectTo: '/login', pathMatch: 'full' },
            { path: 'register', component: RegisterComponent },
            { path: 'dashboard', component: DashboardComponent },
            { path: 'login', component: LoginComponent },
            { path: '**', redirectTo: '/notfound' }
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}
