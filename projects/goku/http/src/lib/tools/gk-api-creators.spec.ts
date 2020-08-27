import { gkApiCreators } from './gk-api-creators';
import { GKApi } from '../models/gk-api.model';
import { GKBaseApis } from '../models/gk-base-apis.model';
const url = '/api/department';
describe('GKApiCreators', () => {
  it('创建全部api', () => {
    /** 调用目标方法,获取api集合 */
    const api = gkApiCreators(url);
    /** 判断是否所有的类型的api都正常生成 */
    check(api, ['LIST', 'ADD', 'REMOVE', 'UPDATE', 'DETAIL', 'OPTION']);
  });

  it('排除其中一个api', () => {
    /** 排除掉option */
    const api = gkApiCreators(url, 'OPTION');

    /** 检测其他的api是否正常生成 */
    check(api, ['LIST', 'ADD', 'REMOVE', 'UPDATE', 'DETAIL']);

    /** 检测option类型api是否没有被生成出来 */
    expect(api.OPTION).not.toBeDefined();
  });

  describe('排除多个个api', () => {
    /**
     * gkApiCreators方法的第二个参数支持简写,所以单元检测中需要分别对参数完整写法和简写写法进行检测
     */
    it('参数完整写法', () => {
      /** 传入两个参数,排除option和update两个接口并生成api */
      const api = gkApiCreators(url, ['OPTION', 'UPDATE']);

      /** 检测没有被排除的api是否正常生成出来 */
      check(api, ['LIST', 'ADD', 'REMOVE', 'DETAIL']);

      /** 检测被排除的api是否真的没有生成 */
      checkExc(api, ['OPTION', 'UPDATE']);
    });

    it('参数简写', () => {
      /** 传入简写参数,检测功能是否正常 */
      const api = gkApiCreators(url, ['L', 'A', 'R', 'U', 'D', 'O']);
      check(api, []);
      checkExc(api, ['LIST', 'ADD', 'REMOVE', 'UPDATE', 'DETAIL', 'OPTION']);
    });
  });
});

/**
 * 传入api集合(对象类型),判断是否存在对应的api对象
 * @param api 需要被检测的api集合
 * @param serveTypes api类型(列表,添加,删除,详情,下拉等)
 */
function check(api: GKBaseApis, serveTypes: string[]): void {
  serveTypes.map((type) => {
    expect(api[type]).toEqual(getGKApiByType(type));
  });
}

/**
 * 传入api集合,判断是否不存在对应的api对象,用于检测排除功能是否生效
 * @param api 需要被检测的api集合
 * @param excTypes api类型(列表,添加,删除,详情,下拉等)
 */
function checkExc(api: GKBaseApis, excTypes: string[]): void {
  excTypes.map((type) => {
    expect(api[type]).not.toBeDefined();
  });
}

/**
 * 传入指定的类型,创建对应的api
 * @param type api类型
 */
function getGKApiByType(type: string): GKApi {
  let target: GKApi;
  switch (type) {
    case 'LIST':
      target = new GKApi(url);
      break;
    case 'ADD':
      target = new GKApi(url, 'p');
      break;
    case 'REMOVE':
      target = new GKApi(url, 'd');
      break;
    case 'UPDATE':
      target = new GKApi(url, 'put');
      break;
    case 'DETAIL':
      target = new GKApi(`${url}/detail`);
      break;
    case 'OPTION':
      target = new GKApi(`${url}/option`);
      break;
  }
  return target;
}
