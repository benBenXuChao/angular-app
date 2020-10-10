/*
 * @Author: your name
 * @Date: 2020-09-30 13:56:07
 * @LastEditTime: 2020-09-30 15:33:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /angular-app/src/app/directive/export-as.directive.ts
 */
import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appChildDir]',
  exportAs: 'child-ref' // 可以让使用者在组件内拿到指令服务的内部方法及属性
})
export class ExportAsDirective {

  constructor() { }
  toSay() {
    console.log('Hello word');
  }
}

@Directive({
  selector: '[appHost]',
})
export class HostDirective {
  @Input() appHost: boolean;
  @Input() hostColor: string;
  @Input() hostKey: string;
  constructor() { }
  @HostBinding('class.host') get host(): boolean {
    return this.appHost;
  }
  @HostBinding('style.color') get color(): string {
    return this.hostColor;
  }
  @HostBinding('[attr.key]') get key(): string {
    return this.hostKey;
  }
}
