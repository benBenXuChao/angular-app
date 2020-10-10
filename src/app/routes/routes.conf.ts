/*
 * @Author: your name
 * @Date: 2020-09-29 11:18:03
 * @LastEditTime: 2020-10-10 14:17:59
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /angular-app/src/app/routes/routes.conf.ts
 */
import { GKRoutes, GKMenuItem as MI, GKRoute } from './route.model';
import { BaseTableComponent } from '../pages/base-table/base-table.component';
import { ExcelComponent } from '../pages/excel/excel.component';
import { MyNgifNgforComponent } from '../pages/my-ngif-ngfor/my-ngif-ngfor.component';
import { TemplateComponent } from '../pages/template/template.component';

export const hybridRoutes = new GKRoutes([
  /**
   * MI为一级菜单对象
   * 第一个参数代表菜单文本
   * 第二个参数代表菜单前的图标类型
   * 第三个参数为列表,内部为二级混合路由对象
   */
  new MI('代码逻辑', 'dashboard', [
    /**
     * GKRoute为混合路由对象
     * 第一个参数代表路由路径
     * 第二个参数代表路径对应加载的组件
     * 第三个参数为可选参数, 代表映射到主菜单上的文本,如不加参数,则该路由不会被映射到菜单上,多用于详情页等无需添加到菜单上的页面
     * 第四个参数为可选参数, 为数组类型,元素值依旧为GKRoute类型,代表子路由
     * 第五个参数为可选参数, 为其他需要配置到路由对象上的属性. 比如添加data配置值
     */
    new GKRoute('base-table', BaseTableComponent, '基础表格', undefined, {
      data: { keep: true },
    }),
    new GKRoute('my-ngif-ngfor', MyNgifNgforComponent, 'ngIf和ngFor', undefined, {
      data: { keep: true },
    }),
    new GKRoute('template-view', TemplateComponent, '关于template', undefined, {
      data: { keep: true },
    }),
    new GKRoute('excel', ExcelComponent, '表格导出'),
  ]),
]);
