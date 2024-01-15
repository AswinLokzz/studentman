import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { StudentpageComponent } from './pages/studentpage/studentpage.component';
import { StudentlistComponent } from './pages/studentpage/studentlist/studentlist.component';
import { StudentformComponent } from './pages/studentpage/studentform/studentform.component';
import { TeacherpageComponent } from './pages/teacherpage/teacherpage.component';
import { TeacherformComponent } from './pages/teacherpage/teacherform/teacherform.component';
import { TeacherlistComponent } from './pages/teacherpage/teacherlist/teacherlist.component';
import { TeacherviewComponent } from './pages/teacherpage/teacherview/teacherview.component';

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
  {
    path: 'Teachers',
    component: TeacherpageComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: TeacherlistComponent},
      { path: 'form', component: TeacherformComponent },
      {path:'view/:_id',component:TeacherviewComponent},
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
