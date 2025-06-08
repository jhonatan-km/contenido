import { Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { AuthGuard } from './core/guards/auth.guard';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { ReportesComponent } from './component/reportes/reportes.component';
import { RecuperaComponent } from './component/recupera/recupera.component';
import { CurriculumFormComponent } from './component/contenido-curricular/contenido-curricular.component';
import { CurriculumFormPageTwoComponent } from './component/curriculum-form-page-two/curriculum-form-page-two.component';

export const routes: Routes = [
  { 
    path: 'login', 
    component: LoginComponent 
  },
  {
    path: 'recupera', 
    component:RecuperaComponent

  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
 
  {
  path: 'contenido-curricular',
  children: [
    { path: '', component: CurriculumFormComponent },
    { path: 'page-two', component: CurriculumFormPageTwoComponent }
  ]
},

      { path: 'reportes', component: ReportesComponent }

      
    ]
  },
  { path: '**', redirectTo: 'login' }
  
];