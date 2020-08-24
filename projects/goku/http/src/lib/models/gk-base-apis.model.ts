import { GKApi } from './gk-api.model';
/**
 * 单个表的基础增删改查等接口集合
 */
export interface GKBaseApis {
  /** 列表 */
  LIST?: GKApi;

  /** 新增 */
  ADD?: GKApi;

  /** 删除 */
  REMOVE?: GKApi;

  /** 详情 */
  DETAIL?: GKApi;

  /** 编辑/更新 */
  UPDATE?: GKApi;

  /** 下拉选项 */
  OPTION?: GKApi;

  /** 其他接口 */
  [propKey: string]: GKApi;
}
