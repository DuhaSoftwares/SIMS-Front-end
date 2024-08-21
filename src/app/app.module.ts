// app.module.ts

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app.routing.module';
import { SharedModule } from './shared/shared.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule, AppRoutingModule, SharedModule,
  ],
  providers: [
    provideAnimationsAsync()
  ],
  // bootstrap: [AppComponent,] // Ensure AppComponent is set as the bootstrap component
})
export class AppModule { }
