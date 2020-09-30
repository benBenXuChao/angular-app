/*
 * @Author: your name
 * @Date: 2020-09-29 11:18:03
 * @LastEditTime: 2020-09-29 13:31:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /angular-app/src/app/shared/shared.module.ts
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectiveModule } from 'src/app/directive/directive.module';
import { NzCardModule } from 'ng-zorro-antd/card';

const NgZorroModule = [NzCardModule];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...NgZorroModule,
    DirectiveModule
  ],
  exports: [
    DirectiveModule,
    ...NgZorroModule
  ]
})
export class SharedModule { }
