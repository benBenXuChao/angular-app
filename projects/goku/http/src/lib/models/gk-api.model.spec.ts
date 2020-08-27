import { GKApi } from './gk-api.model';
const url = '/api/department';

describe('GKApi', () => {
  describe('get类型api', () => {
    const types = ['g', 'get', 'GET', 'Get'];

    it('new实例时,不传请求类型参数', () => {
      const api = new GKApi(url);
      exp(api, 'GET');
    });

    // 验证在new一个GKApi时,传入分别传入types中所包含的参数,最终实例的method属性值都应该是'GET'
    check(types, 'GET');
  });

  describe('post类型api', () => {
    const types = ['p', 'post', 'POST', 'Post'];
    // 验证在new一个GKApi时,传入分别传入types中所包含的参数,最终实例的method属性值都应该是'POST'
    check(types, 'POST');
  });

  describe('put类型api', () => {
    const types = ['put', 'PUT', 'Put'];
    // 验证在new一个GKApi时,传入分别传入types中所包含的参数,最终实例的method属性值都应该是'PUT'
    check(types, 'PUT');
  });

  describe('delete类型api', () => {
    const types = ['d', 'delete', 'del', 'Delete', 'DELETE', 'Del', 'DEL'];
    // 验证在new一个GKApi时,传入分别传入types中所包含的参数,最终实例的method属性值都应该是'DELETE'
    check(types, 'DELETE');
  });

  it('new实例时,传的请求方法参数无法识别时抛出异常', () => {
    expect(() => new GKApi(url, 'pt')).toThrowError();
  });
});

/**
 * 传入api实例和该实例应该具备的方法名,断言api实例的url和method属性值是否正确
 * @param api 需要被判断的实例
 * @param met 方法名
 */
function exp(api: GKApi, met: string): void {
  expect(api.method).toBe(met);
  expect(api.url).toContain(url);
}

/**
 * 根据请求方法类型列表创建若干个测试用例,测试用例内会创建对应的GKApi实例,并进行相应断言
 * @param types 请求方法列表
 * @param met 断言所对比的目标方法名
 */
function check(types: string[], met: string): void {
  types.map((mtd) => {
    it(`new实例时,传\'${mtd}\'参数`, () => {
      const api = new GKApi(url, mtd);
      exp(api, met);
    });
  });
}
