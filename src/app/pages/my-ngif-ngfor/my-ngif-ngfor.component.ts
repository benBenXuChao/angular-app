/*
 * @Author: your name
 * @Date: 2020-09-29 11:20:53
 * @LastEditTime: 2020-09-30 16:38:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /angular-app/src/app/pages/my-ngif-ngfor/my-ngif-ngfor.component.ts
 */
import { Component, OnInit, ViewChild, TemplateRef, ContentChildren, QueryList, AfterViewChecked } from '@angular/core';
import { ExportAsDirective, HostDirective } from 'src/app/directive/directive-exercise.directive';
import { NzInputDirective } from 'ng-zorro-antd';

@Component({
  selector: 'app-my-ngif-ngfor',
  templateUrl: './my-ngif-ngfor.component.html',
  styleUrls: ['./my-ngif-ngfor.component.less']
})
export class MyNgifNgforComponent implements OnInit, AfterViewChecked {
  condition = true;
  @ViewChild('c', { static: true }) c: ExportAsDirective;
  @ContentChildren(HostDirective) host!: QueryList<HostDirective>;
  @ContentChildren(NzInputDirective) nzinput!: QueryList<NzInputDirective>;
  students = [
    { name: '小明', age: 22 },
    { name: '小李', age: 12 },
    { name: '小张', age: 35 },
  ];
  constructor() { }
  ngAfterViewChecked(): void {
    console.log(this.nzinput);

    this.host.forEach(item => {
      console.log(item)
    })
  }

  ngOnInit(): void {
    console.log('c', this.c.toSay());
  }
  handel(type, i?) {
    switch (type) {
      case 'add':
        this.students.push({ name: '小林', age: 23 })
        break;
      case 'remove':
        this.students.splice(i, 1);
        break;
      case 'update':
        this.students[i] = { name: '小红', age: 24 };
        break;
      case 'modify':
        this.students[i].age = 26;
        break;

      default:
        break;
    }
  }
}
