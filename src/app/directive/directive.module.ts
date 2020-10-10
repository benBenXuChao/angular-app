/*
 * @Author: your name
 * @Date: 2020-09-29 13:11:27
 * @LastEditTime: 2020-09-30 15:22:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /angular-app/src/app/directive/directive.module.ts
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyIfDirective } from './my-if.directive';
import { MyForOfDirective } from './my-for-of.directive';
import { ExportAsDirective, HostDirective } from './directive-exercise.directive';


const Directives = [MyIfDirective, MyForOfDirective, ExportAsDirective, HostDirective];
@NgModule({
  declarations: [...Directives],
  imports: [
    CommonModule
  ],
  exports: [...Directives]
})
export class DirectiveModule { }
