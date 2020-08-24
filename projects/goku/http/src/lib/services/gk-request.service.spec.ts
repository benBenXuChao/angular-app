import { TestBed } from '@angular/core/testing';

import { GKRequestService } from './gk-request.service';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { gkApiCreators } from '../tools/gk-api-creators';

describe('GKRequestService', () => {
  let service: GKRequestService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  const httpResponse = {
    code: 0,
    msg: 'success',
    data: {},
  };

  beforeEach(() => {
    const spy = jasmine.createSpyObj('HttpClient', [
      'get',
      'post',
      'put',
      'delete',
    ]);
    TestBed.configureTestingModule({
      providers: [GKRequestService, { provide: HttpClient, useValue: spy }],
    });
    service = TestBed.inject(GKRequestService);
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  it('服务被正常创建', () => {
    expect(service).toBeTruthy();
  });

  it('api正常调用', () => {
    const api = gkApiCreators('/api/department');
    httpClientSpy.get.and.returnValue(of(httpResponse));
    httpClientSpy.post.and.returnValue(of(httpResponse));
    httpClientSpy.put.and.returnValue(of(httpResponse));
    httpClientSpy.delete.and.returnValue(of(httpResponse));
    const list = service.request(api.LIST);
    const add = service.request(api.ADD);
    const remove = service.request(api.REMOVE);
    const update = service.request(api.UPDATE);
    const option = service.request(api.OPTION);
    const detail = service.request(api.DETAIL);

    expect(httpClientSpy.get.calls.count()).toBe(3);
    expect(httpClientSpy.post.calls.count()).toBe(1);
    expect(httpClientSpy.delete.calls.count()).toBe(1);
    expect(httpClientSpy.put.calls.count()).toBe(1);

    expect(list instanceof Observable).toBe(true);
    expect(add instanceof Observable).toBe(true);
    expect(remove instanceof Observable).toBe(true);
    expect(update instanceof Observable).toBe(true);
    expect(option instanceof Observable).toBe(true);
    expect(detail instanceof Observable).toBe(true);

    list.subscribe((res) => {
      expect(res).toEqual(httpResponse);
    });
  });
});
