/*
 * @Author: your name
 * @Date: 2020-10-10 14:05:30
 * @LastEditTime: 2020-10-10 14:50:14
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /angular-app/src/app/pages/template/template.component.ts
 */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.less']
})
export class TemplateComponent implements OnInit {
  list = [
    '小明',
    '小李',
    '小刚',
    '小红',
  ];
  name = '哈哈';
  constructor() { }

  ngOnInit(): void {
  }

}
