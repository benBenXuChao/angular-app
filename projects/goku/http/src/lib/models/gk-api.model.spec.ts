import { GKApi } from './gk-api.model';

const url = '/api/department';
describe('GKApi', () => {
  describe('get类型api', () => {
    const types = ['g', 'get', 'GET', 'Get'];

    it('new实例时,不传请求类型参数', () => {
      const api = new GKApi(url);
      exp(api, 'GET');
    });

    check(types, 'GET');
  });

  describe('post类型api', () => {
    const types = ['p', 'post', 'POST', 'Post'];
    check(types, 'POST');
  });

  describe('put类型api', () => {
    const types = ['put', 'PUT', 'Put'];
    check(types, 'PUT');
  });

  describe('delete类型api', () => {
    const types = ['d', 'delete', 'del', 'Delete', 'DELETE', 'Del', 'DEL'];
    check(types, 'DELETE');
  });

  it('new实例时,传的请求方法参数无法识别时抛出异常', () => {
    expect(() => new GKApi(url, 'pt')).toThrowError();
  });
});

function exp(api: GKApi, met: string): void {
  expect(api.method).toBe(met);
  expect(api.url).toContain(url);
}

function check(types: string[], met: string): void {
  types.map((mtd) => {
    it(`new实例时,传\'${mtd}\'参数`, () => {
      const api = new GKApi(url, mtd);
      exp(api, met);
    });
  });
}
