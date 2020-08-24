import { GKBaseApis } from '../models/gk-base-apis.model';
import { GKApi } from '../models/gk-api.model';

type ApiType = 'LIST' | 'ADD' | 'REMOVE' | 'UPDATE' | 'DETAIL' | 'OPTION';

type ApiTypeExp = ApiType | 'L' | 'A' | 'R' | 'U' | 'D' | 'O';

/**
 * api对象生成器,用于生成包含 列表,添加,删除,修改,查询,下拉选项等接口的对象
 * @param url 请求路径
 * @param excludes 不需要生成的接口类型或者接口类型列表
 */
export function gkApiCreators(
  url: string,
  excludes?: ApiTypeExp | ApiTypeExp[]
): GKBaseApis {
  const target: GKBaseApis = {};

  target.LIST = new GKApi(url);
  target.ADD = new GKApi(url, 'post');
  target.REMOVE = new GKApi(url, 'delete');
  target.UPDATE = new GKApi(url, 'put');
  target.DETAIL = new GKApi(`${url}/detail`);
  target.OPTION = new GKApi(`${url}/option`);

  if (typeof excludes === 'string') {
    const exclude = apiTypeHandler(excludes);
    delete target[exclude];
  } else if (Array.isArray(excludes)) {
    excludes.map((exclude) => {
      exclude = apiTypeHandler(exclude);

      delete target[exclude];
    });
  }

  return target;
}

/**
 * 将简写api类型处理成全字符的
 * @param type api类型
 */
function apiTypeHandler(type: ApiTypeExp): ApiType {
  switch (type) {
    case 'L':
      return 'LIST';
    case 'A':
      return 'ADD';
    case 'R':
      return 'REMOVE';
    case 'U':
      return 'UPDATE';
    case 'D':
      return 'DETAIL';
    case 'O':
      return 'OPTION';
    default:
      return type;
  }
}
