/*
 * @Author: your name
 * @Date: 2020-09-29 13:14:15
 * @LastEditTime: 2020-09-29 14:43:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /angular-app/src/app/directive/my-if.directive.ts
 */
import {
  Directive,
  Input,
  ViewContainerRef,
  TemplateRef
} from '@angular/core';

@Directive({
  selector: '[appMyIf]'
})
export class MyIfDirective {
  @Input('appMyIf') set appMyIf(condition: boolean) {
    console.log(condition);
    if (condition) {
      this.viewContainerRef.createEmbeddedView(this.template);
    } else {
      this.viewContainerRef.clear();
    }
  }
  constructor(
    private viewContainerRef: ViewContainerRef,
    private template: TemplateRef<any>
  ) { }

}
