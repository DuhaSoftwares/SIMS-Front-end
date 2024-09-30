// app.module.ts

import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app.routing.module';
import { SharedModule } from './shared/shared.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ServerModule } from '@angular/platform-server';

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule, AppRoutingModule, SharedModule,
    ServerModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
  // bootstrap: [AppComponent,] // Ensure AppComponent is set as the bootstrap component
})
export class AppModule { }
