import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from './app.config';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [],
  providers: [
    { provide: APP_CONFIG, useValue: AppConfig }
  ]
})
export class XpenseApiModule { }
