import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GKApi } from '../models/gk-api.model';

/**
 * 接受Api接口实例，提供的request方法自动根据Api实例中记载的请求类型发起对应请求，并自动处理参数传递
 */
@Injectable({
  providedIn: 'root',
})
export class GKRequestService {
  constructor(private http: HttpClient) {}

  /**
   * 发起http请求，返回一个observable实例
   * @param api 接口实例
   * @param data 请求时需要传递的参数
   */
  request(api: GKApi, data: any = null): Observable<any> {
    const params = new HttpParams({ fromObject: data });
    let httpOB: Observable<any>;
    switch (api.method) {
      case 'POST':
        httpOB = this.http.post(api.url, data);
        break;
      case 'PUT':
        httpOB = this.http.put(api.url, data);
        break;
      case 'DELETE':
        httpOB = this.http.delete(api.url, { params });
        break;
      default:
        httpOB = this.http.get(api.url, { params });
        break;
    }

    return httpOB;
  }
}
