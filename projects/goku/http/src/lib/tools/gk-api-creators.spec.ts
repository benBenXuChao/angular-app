import { gkApiCreators } from './gk-api-creators';
import { GKApi } from '../models/gk-api.model';
import { GKBaseApis } from '../models/gk-base-apis.model';
const url = '/api/department';
describe('GKApiCreators', () => {
  it('创建全部api', () => {
    const api = gkApiCreators(url);
    check(api, ['LIST', 'ADD', 'REMOVE', 'UPDATE', 'DETAIL', 'OPTION']);
  });

  it('排除其中一个api', () => {
    const api = gkApiCreators(url, 'OPTION');
    check(api, ['LIST', 'ADD', 'REMOVE', 'UPDATE', 'DETAIL']);
    expect(api.OPTION).not.toBeDefined();
  });

  describe('排除多个个api', () => {
    it('参数完整写法', () => {
      const api = gkApiCreators(url, ['OPTION', 'UPDATE']);
      check(api, ['LIST', 'ADD', 'REMOVE', 'DETAIL']);
      checkExc(api, ['OPTION', 'UPDATE']);
    });

    it('参数简写', () => {
      const api = gkApiCreators(url, ['L', 'A', 'R', 'U', 'D', 'O']);
      check(api, []);
      checkExc(api, ['LIST', 'ADD', 'REMOVE', 'UPDATE', 'DETAIL', 'OPTION']);
    });
  });
});

function check(api: GKBaseApis, serveTypes: string[]): void {
  serveTypes.map((type) => {
    expect(api[type]).toEqual(getGKApiByType(type));
  });
}

function checkExc(api: GKBaseApis, excTypes: string[]): void {
  excTypes.map((type) => {
    expect(api[type]).not.toBeDefined();
  });
}

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
