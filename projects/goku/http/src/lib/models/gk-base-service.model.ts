import { GKRequestService } from '../services/gk-request.service';
import { GKBaseApis } from './gk-base-apis.model';
import { Observable } from 'rxjs';

type HttpServiceFun = (...arg: any) => Observable<any>;

/**
 * 列表，增删改查服务创建基类
 * ## 用法
 * 页面服务只需要继承当前抽象类,并将API集合传入到super()方法中,页面服务即可具备api集合中存在的各方法(add,list,update等)
 * ### 示例:
 * ```typescript
 * import { API } from '../api/api.conf';
 * export class DepartmentService extends GKBaseService {
 *   constructor(public requestService: GKRequestService) {
 *     super(API.DEPARTMENT);
 *   }
 * }
 * ```
 */
export abstract class GKBaseService {
  /** 列表数据 */
  list?: HttpServiceFun;

  /** 添加 */
  add?: HttpServiceFun;

  /** 修改 */
  update?: HttpServiceFun;

  /** 删除 */
  remove?: HttpServiceFun;

  /** 详情 */
  detail?: HttpServiceFun;

  /** 下拉 */
  option?: HttpServiceFun;

  abstract requestService: GKRequestService;

  /**
   * 传入api实例集合 自动根据存在的api属性生成增删改查等方法
   * @param apis api实例集合
   */
  constructor(public apis: GKBaseApis) {
    this.loadList();
    this.loadAdd();
    this.loadRemove();
    this.loadUpdate();
    this.loadDetail();
    this.loadOption();
  }

  private loadList(): void {
    if (this.apis.LIST) {
      this.list = (data?: any) =>
        this.requestService.request(this.apis.LIST, data);
    }
  }

  private loadAdd(): void {
    if (this.apis.ADD) {
      this.add = (data: any) =>
        this.requestService.request(this.apis.ADD, data);
    }
  }

  private loadRemove(): void {
    if (this.apis.REMOVE) {
      this.remove = (id) =>
        this.requestService.request(this.apis.REMOVE, { id });
    }
  }

  private loadUpdate(): void {
    if (this.apis.UPDATE) {
      this.update = (data: any) =>
        this.requestService.request(this.apis.UPDATE, data);
    }
  }

  private loadDetail(): void {
    if (this.apis.DETAIL) {
      this.detail = (id) =>
        this.requestService.request(this.apis.DETAIL, { id });
    }
  }

  private loadOption(): void {
    if (this.apis.OPTION) {
      this.option = (data?: any) =>
        this.requestService.request(this.apis.OPTION, data);
    }
  }
}
