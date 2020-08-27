import { TestBed } from '@angular/core/testing';

import { GKRequestService } from './gk-request.service';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { gkApiCreators } from '../tools/gk-api-creators';

describe('GKRequestService', () => {
  /** 需要被测试的服务(暂未赋值) */
  let service: GKRequestService;
  /** 被测试的服务所依赖的服务(模拟的间谍服务,亦暂未赋值) */
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  /** 用于给间谍对象模拟的返回值 */
  const httpResponse = {
    code: 0,
    msg: 'success',
    data: {},
  };

  /** 每个it执行之前的准备工作 */
  beforeEach(() => {
    /**
     * 生成间谍类
     * 第一个参数代表mock一个类名叫HttpClient的间谍对象
     * 第二个参数代表该类中具备如下四个成员
     */
    const spy = jasmine.createSpyObj('HttpClient', [
      'get',
      'post',
      'put',
      'delete',
    ]);

    /**
     * 将需要被测试的服务类以及相关的依赖类注入到测试机床中
     * 可以理解为挂在到测试用的NgModule当中
     */
    TestBed.configureTestingModule({
      providers: [GKRequestService, { provide: HttpClient, useValue: spy }],
    });

    /** 通过测试机床获取需要被测试的服务实例 */
    service = TestBed.inject(GKRequestService);

    /** 通过测试机床获取被依赖的间谍服务实例 */
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  it('服务被正常创建', () => {
    /** 判断被测试的服务实例是否被正常创建 */
    expect(service).toBeTruthy();
  });

  it('api正常调用', () => {
    /** 根据地址生成一个api对象 */
    const api = gkApiCreators('/api/department');

    /**
     * 分别指定间谍服务类的四个方法(get post put delete)返回值
     */
    httpClientSpy.get.and.returnValue(of(httpResponse));
    httpClientSpy.post.and.returnValue(of(httpResponse));
    httpClientSpy.put.and.returnValue(of(httpResponse));
    httpClientSpy.delete.and.returnValue(of(httpResponse));

    /**
     * 获取目标服务,调用request方法,分别传入常用的api类型并获取返回值
     */
    const list = service.request(api.LIST);
    const add = service.request(api.ADD);
    const remove = service.request(api.REMOVE);
    const update = service.request(api.UPDATE);
    const option = service.request(api.OPTION);
    const detail = service.request(api.DETAIL);

    /**
     * 统计如上操作调用的间谍服务对应方法次数
     * 上述api中存在3个get类型  post delete put类型分别1个
     * 所以间谍服务中的get方法应当被调用3次   其余方法分别被调用1次
     */
    expect(httpClientSpy.get.calls.count()).toBe(3);
    expect(httpClientSpy.post.calls.count()).toBe(1);
    expect(httpClientSpy.delete.calls.count()).toBe(1);
    expect(httpClientSpy.put.calls.count()).toBe(1);

    /** 判断调用目标服务的request方法时,不同的参数返回值是否均为Observable类型 */
    expect(list instanceof Observable).toBe(true);
    expect(add instanceof Observable).toBe(true);
    expect(remove instanceof Observable).toBe(true);
    expect(update instanceof Observable).toBe(true);
    expect(option instanceof Observable).toBe(true);
    expect(detail instanceof Observable).toBe(true);

  });
});
