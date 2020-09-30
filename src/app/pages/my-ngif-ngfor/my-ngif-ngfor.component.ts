/*
 * @Author: your name
 * @Date: 2020-09-29 11:20:53
 * @LastEditTime: 2020-09-30 11:23:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /angular-app/src/app/pages/my-ngif-ngfor/my-ngif-ngfor.component.ts
 */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-ngif-ngfor',
  templateUrl: './my-ngif-ngfor.component.html',
  styleUrls: ['./my-ngif-ngfor.component.less']
})
export class MyNgifNgforComponent implements OnInit {
  condition = true;
  students = [
    { name: '小明', age: 22 },
    { name: '小李', age: 12 },
    { name: '小张', age: 35 },
  ];
  constructor() { }

  ngOnInit(): void {

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
