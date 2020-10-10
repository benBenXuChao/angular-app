/*
 * @Author: your name
 * @Date: 2020-10-10 13:53:43
 * @LastEditTime: 2020-10-10 14:34:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /angular-app/src/app/components/ng-template-outlet/ng-template-outlet.component.ts
 */
import { Component, OnInit, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-ng-template-outlet',
  templateUrl: './ng-template-outlet.component.html',
  styleUrls: ['./ng-template-outlet.component.less']
})
export class NgTemplateOutletComponent implements OnInit {
  @Input('tem')
  template: TemplateRef<HTMLDivElement>;
  @Input() ngTemplate: TemplateRef<HTMLInputElement>;
  @Input() list: Array<any>;
  context = {
  };
  test = '';
  constructor() { }

  ngOnInit(): void {
  }
  handel(item, index): void {
    this.context = {
      $implicit: item,
      index
    };

  }
  submit(form): void {
    console.log(form);
  }
}
