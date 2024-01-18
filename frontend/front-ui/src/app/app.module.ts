import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatMenuModule} from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatListModule} from '@angular/material/list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


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
import { StudentFormService } from './services/studentform.service';
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
    TeacherpageComponent,StudentviewComponent, FeesComponent, FeesidebarComponent, FeeformComponent, FeefilterComponent, FeeassignerComponent, FeelistComponent, FeestudentComponent
    
   
    
    
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
    MatRadioModule
    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
