import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './components/internal/header/header.component';
import { SideNavComponent } from './components/internal/side-nav/side-nav.component';
import { FooterComponent } from './components/internal/footer/footer.component';
import { DashboardComponent } from './components/main/dashboard/dashboard.component';
import { ControlSidebarComponent } from './components/internal/control-sidebar/control-sidebar.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SideNavComponent,
    FooterComponent,
    DashboardComponent,
    ControlSidebarComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule,CommonModule,FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
