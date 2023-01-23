import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { ContactComponent } from './components/contact/contact.component';
import { HomeComponent } from './components/home/home.component';
import { ServicesComponent } from './components/services/services.component';
import { ViewStudentDetailsComponent } from './components/view-student-details/view-student-details.component';

const routes: Routes = [
  {path : '', component: AdminDashboardComponent ,
   children:[
{path: 'home', component: HomeComponent},
{path: 'about', component: AboutComponent},
{path : 'services', component: ServicesComponent},
{path : 'student-details/:id', component: ViewStudentDetailsComponent},
{path : 'contact', component: ContactComponent},
{path: '', redirectTo: 'admin/home', pathMatch: 'full'},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
