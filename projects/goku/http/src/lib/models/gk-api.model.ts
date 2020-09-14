type MethodType = 'GET' | 'POST' | 'PUT' | 'DELETE';

/**
 * 接口类,包含请求路径和请求方法
 * ### 示例:
 * ```typescript
 * new GKApi('/api/users')
 * ```
 */
export class GKApi {
  /** 发起请求的方法类型 */
  readonly method: MethodType;

  /**
   * 创建一个接口实例
   * @param url 请求路径
   * @param method 请求方法
   * ### 示例:
   * ```typescript
   * new GKApi('/api/users') // get请求
   * new GKApi('/api/users','post') // post请求
   * new GKApi('/api/users','put') // put请求
   * new GKApi('/api/users','delete') // delete请求
   * ```
   */
  constructor(readonly url: string, method: string = 'get') {
    this.method = this.methodHandler(method);
  }

  /**
   * 请求类型字符处理,传入简写方式 输出标准方法类型
   * @param type 请求类型
   */
  private methodHandler(type: string): MethodType {
    let mtd: MethodType;
    switch (type) {
      case 'g':
      case 'get':
      case 'GET':
      case 'Get':
        mtd = 'GET';
        break;
      case 'p':
      case 'post':
      case 'POST':
      case 'Post':
        mtd = 'POST';
        break;
      case 'put':
      case 'PUT':
      case 'Put':
        mtd = 'PUT';
        break;
      case 'd':
      case 'delete':
      case 'del':
      case 'Delete':
      case 'DELETE':
      case 'Del':
      case 'DEL':
        mtd = 'DELETE';
        break;
      default:
        throw new Error('无法识别请求方法类型.');
    }
    return mtd;
  }
}
