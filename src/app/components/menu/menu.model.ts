/**
 * 菜单列表
 */
export type GKMenus = GKParentMenu[];

/**
 * 父级菜单
 */
export class GKParentMenu {
  constructor(
    /** 菜单文本 */
    readonly text: string,
    /** 图标 */
    readonly icon: string,
    /** 子级菜单列表 */
    readonly childs: GKMenu[]
  ) {}
}

/**
 * 二级菜单
 */
export class GKMenu {
  constructor(
    /** 菜单文本 */
    readonly text: string,
    /** 菜单跳转路径 */
    readonly path: string
  ) {}
}
