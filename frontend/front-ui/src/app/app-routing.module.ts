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
import { StudentviewComponent } from './pages/studentpage/studentview/studentview.component';
import { FeesComponent } from './pages/fees/fees.component';
import { FeelistComponent } from './pages/fees/feelist/feelist.component';
import { FeeassignerComponent } from './pages/fees/feeassigner/feeassigner.component';
import { LoginpageComponent } from './pages/loginpage/loginpage.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'Students',
    component: StudentpageComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: StudentlistComponent },
      { path: 'form', component: StudentformComponent },
      {path:'view/:_id',component:StudentviewComponent}
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
  {
    path:'Fees',
    component:FeesComponent
  },
  {
    path:'login', component:LoginpageComponent,
    children:[
      {path:'home',component:HomeComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
