/*
 * @Author: your name
 * @Date: 2020-09-29 11:18:03
 * @LastEditTime: 2020-09-29 14:53:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /angular-app/src/app/app.module.ts
 */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { GKHttpModule } from '@goku/http';
import { IconsProviderModule } from './icons-provider.module';
import { MenuComponent } from './components/menu/menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { zh_CN } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { BaseTableComponent } from './pages/base-table/base-table.component';

import { SharedModule } from './shared/shared.module';

import {
  NzTableModule,
  NzLayoutModule,
  NzMenuModule,
  NzButtonModule,
  NzMessageModule,
} from 'ng-zorro-antd';
import { ExcelComponent } from './pages/excel/excel.component';
import { MyNgifNgforComponent } from './pages/my-ngif-ngfor/my-ngif-ngfor.component';
registerLocaleData(zh);

@NgModule({
  declarations: [AppComponent, MenuComponent, BaseTableComponent, ExcelComponent, MyNgifNgforComponent],
  imports: [
    // zorror框架模块start
    NzTableModule,
    NzLayoutModule,
    NzMenuModule,
    NzButtonModule,
    NzMessageModule,
    // zorror框架模块end
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    GKHttpModule,
    IconsProviderModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    SharedModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
  bootstrap: [AppComponent],
})
export class AppModule { }
