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
import { TimetableComponent } from './pages/timetable/timetable.component';
import { SubjectsComponent } from './pages/subjects/subjects.component';
import { FeesideComponent } from './pages/studentside/feeside/feeside.component';

const routes: Routes = [
  { path: '', component: LoginpageComponent },
  { path: 'Students/home', component: HomeComponent },
  {
    path:'Students/Fees',
    component:FeesideComponent
  },
  {path:'admin/home', component:HomeComponent},
  {
    path: 'admin/home/Students',
    component: StudentpageComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },

      { path: 'list', component: StudentlistComponent },
      { path: 'form', component: StudentformComponent },
      {path:'view/:_id',component:StudentviewComponent}
    ],
  },
  {
    path: 'admin/home/Teachers',
    component: TeacherpageComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      
      { path: 'list', component: TeacherlistComponent},
      { path: 'form', component: TeacherformComponent },
      {path:'view/:_id',component:TeacherviewComponent},
    ],
  },
  {
    path:'admin/home/Fees',
    component:FeesComponent
  },
  {
    path:'admin/home/Timetables',
    component:TimetableComponent
  },
  // {
    //   path:'login', component:LoginpageComponent,
    //   children:[
      //     {path:'home',component:HomeComponent}
      //   ]
      // },
      {
        path:'admin/home/Subjects',
        component:SubjectsComponent
      },
      { path: 'Teachers/home', component: HomeComponent },
    ];
    
    @NgModule({
      imports: [RouterModule.forRoot(routes)],
      exports: [RouterModule],
    })
export class AppRoutingModule {}
