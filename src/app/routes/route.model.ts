import { Routes, Route } from '@angular/router';
import { GKMenus, GKMenu } from '../components/menu/menu.model';

/** 混合路由列表对象 */
export class GKRoutes {
  constructor(readonly routes: GKMenuItem[]) {}

  /**
   * 返回路由配置对象
   */
  getRoutes(): Routes {
    let target: Routes = [];

    this.routes.map(({ routes }) => {
      target = [...target, ...this.getRouteList(routes)];
    });

    return target;
  }

  /**
   * 根据混合路由配置列表返回纯粹的路由配置列表
   * @param routes 混合路由配置列表
   */
  private getRouteList(routes: GKRoute[]): Routes {
    const target: Routes = routes.map(({ path, component, children, otherAttr = {} }) => {
      const item: Route = {
        path,
        component,
        ...otherAttr
      };

      if (Array.isArray(children)) {
        item.children = this.getRouteList(children);
      }
      return item;
    });

    return target;
  }

  /**
   * 返回菜单配置对象
   */
  getMenus(): GKMenus {
    const target: GKMenus = [];
    this.routes.map(({ text, icon, routes }) => {
      target.push({
        text,
        icon,
        childs: this.getMenuList(routes),
      });
    });
    return target;
  }

  /**
   * 根据混合路由配置列表返回一元二级菜单数组
   * @param routes 混合路由配置列表,支持多层嵌套
   * @param parentPath 可能存在的父级路由路径
   */
  private getMenuList(routes: GKRoute[], parentPath?: string): GKMenu[] {
    let target: GKMenu[] = [];

    routes.map(({ text, path, children }) => {
      if (text) {
        path = `${parentPath ? parentPath : ''}/${path}`;
        target.push({ text, path });
      }

      if (children) {
        target = [...target, ...this.getMenuList(children, path)];
      }
    });

    return target;
  }
}

/** 菜单对象 */
export class GKMenuItem {
  constructor(
    readonly text: string,
    readonly icon: string,
    readonly routes: GKRoute[]
  ) {}
}

/**
 * 混合路由配置对象
 */
export class GKRoute {
  constructor(
    /** 路由路径 */
    readonly path: string,
    /** 路由对应组件 */
    readonly component: any,
    /** 映射在菜单上的文本内容,若不存在该参数,则代表该路由配置不会出现在菜单列表中 */
    readonly text?: string,
    /** 子级路由 */
    readonly children?: GKRoute[],
    /** 其他需要添加到路由上的配置属性,比如data等 */
    readonly otherAttr?: Route
  ) {}
}
