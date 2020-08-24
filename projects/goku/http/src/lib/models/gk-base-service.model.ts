import { GKRequestService } from '../services/gk-request.service';
import { GKBaseApis } from './gk-base-apis.model';
import { Observable } from 'rxjs';

type HttpServiceFun = (...arg: any) => Observable<any>;

/**
 * 列表，增删改查服务创建基类
 */
export abstract class GKBaseService {
  list?: HttpServiceFun;
  add?: HttpServiceFun;
  update?: HttpServiceFun;
  remove?: HttpServiceFun;
  detail?: HttpServiceFun;
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
