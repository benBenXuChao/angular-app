import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.less'],
})
export class MenuComponent implements OnInit {
  @Input()
  isCollapsed = false;

  menus = [
    {
      icon: 'dashboard',
      text: '代码逻辑',
      childs: [
        {
          text: '基础表格',
          path: '/base-table',
        },
      ],
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
