import { GKRoutes, GKMenuItem as MI, GKRoute } from './route.model';
import { BaseTableComponent } from '../pages/base-table/base-table.component';

export const hybridRoutes = new GKRoutes([
  /**
   * MI为一级菜单对象
   * 第一个参数代表菜单文本
   * 第二个参数代表菜单前的图标类型
   * 第三个参数为列表,内部为二级混合路由对象
   */
  new MI('代码逻辑', 'dashboard', [
    new GKRoute('base-table', BaseTableComponent, '基础表格')
  ]),
]);
