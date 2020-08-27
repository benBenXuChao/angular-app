import { Component, OnInit, Input } from '@angular/core';
import { GKMenus } from './menu.model';
import {hybridRoutes} from '../../routes/routes.conf';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.less'],
})
export class MenuComponent implements OnInit {
  @Input()
  isCollapsed = false;

  menus: GKMenus = hybridRoutes.getMenus();
  constructor() {}

  ngOnInit(): void {}
}
