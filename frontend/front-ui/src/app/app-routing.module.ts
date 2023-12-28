import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { StudentpageComponent } from './pages/studentpage/studentpage.component';
import { StudentlistComponent } from './pages/studentpage/studentlist/studentlist.component';
import { StudentformComponent } from './pages/studentpage/studentform/studentform.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { 
    path: 'Students', 
    component: StudentpageComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: StudentlistComponent },
      { path: 'form', component: StudentformComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
