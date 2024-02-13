import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatMenuModule} from '@angular/material/menu';
import {MatCardModule} from '@angular/material/card';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatListModule} from '@angular/material/list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatTabsModule} from '@angular/material/tabs';



import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { StudentpageComponent } from './pages/studentpage/studentpage.component';
import { StudentsidebarComponent } from './pages/studentpage/studentsidebar/studentsidebar.component';
import { StudentformComponent } from './pages/studentpage/studentform/studentform.component';
import { StudentlistComponent } from './pages/studentpage/studentlist/studentlist.component';
import { StudentviewComponent } from './pages/studentpage/studentview/studentview.component';
import { TeacherpageComponent } from './pages/teacherpage/teacherpage.component';
import { TeacherlistComponent } from './pages/teacherpage/teacherlist/teacherlist.component';
import { TeacherformComponent } from './pages/teacherpage/teacherform/teacherform.component';
import { TeacherviewComponent } from './pages/teacherpage/teacherview/teacherview.component';
import { TeachersidebarComponent } from './pages/teacherpage/teachersidebar/teachersidebar.component';
import { FeesComponent } from './pages/fees/fees.component';
import { FeesidebarComponent } from './pages/fees/feesidebar/feesidebar.component';
import { FeeformComponent } from './pages/fees/feeform/feeform.component';
import { FeefilterComponent } from './pages/fees/feefilter/feefilter.component';
import { FeeassignerComponent } from './pages/fees/feeassigner/feeassigner.component';
import { FeelistComponent } from './pages/fees/feelist/feelist.component';
import { FeestudentComponent } from './pages/fees/feestudent/feestudent.component';
import { LoginpageComponent } from './pages/loginpage/loginpage.component';
import { ToastrModule } from 'ngx-toastr';
import { TimetableComponent } from './pages/timetable/timetable.component';
import { SubjectsComponent } from './pages/subjects/subjects.component';
import { FeesideComponent } from './pages/studentside/feeside/feeside.component';
import { AuthInterceptor } from './services/auth-interceptor';
import { TableComponent } from './pages/timetable/table/table.component';
import { StudenttimetableComponent } from './pages/studentside/studenttimetable/studenttimetable.component';
import { TeachertimetableComponent } from './pages/teacherside/teachertimetable/teachertimetable.component';
import { TeacherstudentattendanceComponent } from './pages/teacherside/teacherstudentattendance/teacherstudentattendance.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    StudentpageComponent,
    StudentsidebarComponent,
    StudentformComponent,
    StudentlistComponent,
    TeacherlistComponent,
    TeacherformComponent,
    TeacherviewComponent,
    TeachersidebarComponent,
    TeacherpageComponent,
    StudentviewComponent,
    FeesComponent, 
    FeesidebarComponent, 
    FeeformComponent, 
    FeefilterComponent, 
    FeeassignerComponent, 
    FeelistComponent, 
    FeestudentComponent, 
    LoginpageComponent, 
    TimetableComponent,
    SubjectsComponent,
    FeesideComponent,
    TableComponent,
    StudenttimetableComponent,
    TeachertimetableComponent,
    TeacherstudentattendanceComponent
  
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatMenuModule,
    MatCardModule,
    MatTooltipModule,
    HttpClientModule,
    MatListModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatButtonModule,
    MatDialogModule, 
    MatPaginatorModule,
    MatSortModule,
    ToastrModule.forRoot(),
    MatTabsModule
   
    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [{provide: HTTP_INTERCEPTORS,   
    useClass:AuthInterceptor, multi: true}],  
  bootstrap: [AppComponent]
})
export class AppModule { }
