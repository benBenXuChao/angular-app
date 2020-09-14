# Goku-stuffing
> 悟空前端框架逻辑部分模块开发项目.非视图相关的功能模块均在该项目中进行开发管理
> 该项目中主要包含三个部分:
> 1. 各部分框架模块,即angular-library.位于projects目录下
> 2. 主应用程序用,用于本地开发时调试library的模拟项目.即library的调试环境
> 3. 内置调试用node服务 位于/server目录下.该node服务是基于express框架生成,用于生成接口,以便调试和http交互相关的服务
    
<br/>
<br/>

## 项目启动

### 安装模块
1. 安装主项目依赖
 进入到项目根目录,通过npm进行安装即可:

```
npm i
```

2. 安装服务模块依赖
 进入到server服务目录,然后安装相应依赖模块
```
cd ./server/
npm i
```
3. 安装node服务进程管理工具(在编辑node服务代码时,能够自动重启node服务)
```
npm i supervisor -g
```

<br/>

### 编译现有library
编译命令和官网相同  
`ng build <libraryName> --prod`  
<br/>
例如:
```
ng build @goku/http --prod
```

<br/>

### 启动node服务
```
npm run server
```

<br/>

### 启动本地调试项目
```
npm run start
```

完成以上步骤后,你将会看到如下界面:
<br/><br/>
![首页](https://note.youdao.com/yws/public/resource/09b78abda5bb411657035d805968ad0c/xmlnote/B3798235C7FB4E12AE6B3655EBC87B4C/8260)
点击菜单即可查看相对应的library演示页面

<br/>

## library开发

### 新增library  
`ng g lib <libraryName>`  
<br/>
例如:  
```
ng g lib @goku/http
```
注意,在本项目中,所有library命名均以`@goku/`为开头
<br/>

### 给library添加 组件/服务/管道...
创建组件管道服务等过程基本和在angualr主应用程序中添加是一样的 只不过需要添加`--porject`参数来指定library名:  
`ng g component <componentName> --project=<libraryName>`  
`ng g service <componentName> --project=<libraryName>`  
`ng g pipe <componentName> --project=<libraryName>`  
`...`  
例如:  
<br/>
```
ng g s tool --project=@goku/tools 
```

### 测试library
在开发完成library后,需要编写相应模块的单元测试文件,同时,要查看单元测试结果,可通过命令`ng test <libraryName>`来进行,例如:  
```
ng test @goku/http
```  
如果同时需要查看覆盖率报告的话,可以在命令后面添加参数`--codeCoverage`即:`ng test <libraryName> --codeCoverage`.例如:
```
ng test @goku/http --codeCoverage
```  
覆盖率报告可在`/coverage`目录下查看,该目录下会按照library名生成对应目录,在对应的目录下打开index.html文件即可查看覆盖率详细信息

### 编译library
如上文中所提,编译library只需要在`ng build` 后面添加上library名,同时添加上--prod即可:  
`ng build <libraryName> --prod`
<br/>
例如:
```
ng build @goku/http --prod
```

### 发布library
要发布一个library到内部npm库中,需要先注册/登录 你的npm账号 (请提前自行切换npm库地址为: [http://registry-npm.sndu.cn/](http://registry-npm.sndu.cn/))

#### 登录/注册npm账号  
在终端中使用`npm adduser`命令行进行登录/注册.期间会进行三次交互式提问,分别填入用户名,密码,以及邮箱即可(已经注册过账号的会直接登录,没有注册过且npm官方数据库中不存在该账号的会直接注册账号并登录.登录注册一条龙服务)
过程大致如下:  
![npm账号注册/登录](https://note.youdao.com/yws/public/resource/09b78abda5bb411657035d805968ad0c/xmlnote/96937CE84CBB4CA59C1BE93566150BF1/8264)  
注意,以上操作顺利的前提是你的npm源已经切换到内部库或者是在npm官方库,如果是npm的淘宝镜像源的话,是无法操作成功的.另一个前提是你在注册时,当前的账号没有被别人注册过,否则会导致登录以及注册失败
<br/>

#### 推送library  
推送library之前,需要先进入到编译完成的library目录当中,通常存在于dist目录下  
举例说明:
    在对`@goku/http`library模块进行编译后,会在项目的`dist`目录下生成 `/goku/http`目录,进入到该目录当中:
```
cd ./dist/goku/http
```  
然后执行命令:  
```
npm publish
```  
即可成功发布到npm库当中,可通过访问地址:[http://registry-npm.sndu.cn/](http://registry-npm.sndu.cn/)来查看包是否成功发布

<br />

## 调试
开发library时,需要在即时调试,以查看当前开发的library的效果,本项目的主程序就是一个调试用的前端应用,各位在开发library时,可以在当前的主程序中创建新的子页面,并且将页面路由添加到菜单中,以方便查看library效果,同时不影响到他人的library调试页面
    
### 主程序调试页面管理
    
#### 文件管理
1. 页面组件
        所有页面组件均放置于`pages`目录下,再往下可自行添加目录层级进行管理
2. 其他组件
    所有页面中需要用到的其他非公共组件,均在页面组件目录下再创建`components`进行管理
3. 其他文件
        所有页面中需要用到的其他非公共服务/管道/指令等等同样在页面组件目录下再创建对应目录进行管理,比如: 服务文件放在`services/`  管道放在 `pipes/`
4. 公共文件
        所有公共的组件,服务,指令,管道等等均放置在`shared`模块下进行管理,文件放在相对应的`components` `servers` `pipes`等目录当中

#### 添加路由/菜单
页面组件创建完成后,需要添加路由才能进行访问.同时,如果需要在页面添加入口的话,还需要在菜单组件上添加相应按钮.
在本调试项目中,对该两处配置做了集成处理,如果需要添加路由和菜单,在 /src/app/routes/routes.conf.ts文件内进行管理即可
代码如下:  
```
export const hybridRoutes = new GKRoutes([
  /**
   * MI为一级菜单对象
   * 第一个参数代表菜单文本
   * 第二个参数代表菜单前的图标类型
   * 第三个参数为列表,内部为二级混合路由对象
   */
  new MI('代码逻辑', 'dashboard', [
    new GKRoute('base-table', BaseTableComponent, '基础表格')
  ]),
]);
```
其中 `MI`对象为一级菜单:
    第一个参数为一级菜单文本
    第二个参数为菜单前的图标
    第三个参数为混合路由混合对象列表

`GKRoute`为混合路由对象,它同时影响着二级菜单以及路由配置信息:
    第一个参数为路径配置,相当于路由配置中的`path`
    第二个参数为对应路径所加载的组件  相当于`component`
    第三个参数为该路由映射到的二级菜单名  如果该路由配置不需要添加到菜单上(例如详情页路由配置) 则不填该参数,或者设置为undefined
    第四个参数为数组,数组元素依旧是`GKRoute`类型对象
    第五个参数为拓展对象,所有需要额外配置的路由属性均可在该对象中配置,用法同原生`Route`类型对象一样

#### 引入本地library
在主程序中,将library编译之后,直接通过library包名引入即可.用法同第三方包一样:
```
import { xxx } from '@goku/http'
```

## 新增本地node服务接口

node服务位于`/server/`目录当中

### 新增接口

所有调试用的ajax接口都用`/api`做开头,调试调用接口时请注意.
该node服务内部已经集成了自动加载功能,服务在启动时会自动读取`/server/apis`目录下的所有文件并生成api接口.路径和文件名关联,但不和目录关联.创建api文件时可无限嵌套目录,各位可按照自己需要创建目录进行管理

举例说明:
  现在我希望创建一个 路径为 `/api/department` 请求方式为`get` 的接口.可通过如下步骤完成

1. 新建文件
  在`apis`目录下新建文件`department.js`文件.
2. 编写接口代码
  进入文件中,通过 `module.exports = {}`的形式导出一个对象,对象下定义一个get属性,值为函数:
`department.js`  
```
module.exports = {
  get(req,res){
    res.json({ code: 0, message: 'success' })
  }
}
```  
3. 重启服务
  由于存在新增文件,supervisor自动重启机制对文件读取支持度并不很好,所以还是建议手动重启服务.
  重启完成后,可以通过前端程序访问 `/api/department` 接口查看效果.
  或者更快的方式是通过浏览器访问 `http://localhost:3000/api/department`, 能在页面中看到返回值,说明接口创建成功

说明: 当接口被请求时,上述说明被创建的api接口文件内的对应函数就会被调用执行.不同的请求方法会触发对应的函数,如没有该方法对应的函数,则接口会向前端响应404.而响应接口,需要通过函数的第二个形参(示例中的res)来进行响应.详细说明见后文

### 接口文件管理  
如果存在多人开发的情况,所有人创建的文件放在一块容易存在冲突.因此建议开发者们都在创建api文件时,将文件放在自己特定的目录当中,在自己的目录下,也可以根据需要模拟的业务场景进行再次创建目录进行分类.放心,只要文件存在于'/server/apis'目录下,无论多深,都能读取到.同时目录层级并不会对接口的路径产生影响
例如,我在创建刚才的`department.js`文件时 将其放到 `/server/apis/zhuiszhu/bussines/` 目录下.  而最终该接口的访问地址  依旧是`/api/department`


### 多层级路径接口
有时,我们想要模拟存在多层级接口的情况,此时只需要通过'.'来分割文件名即可达到新增接口路径层级的目的.
例如,我现在希望新增路径为`/api/users/list`的接口. 此时,你只需要在`/server/apis/`目录下的任意位置创建名字为`users.list.js`的文件即可.


### 使用路径参数
如果你想模拟后端使用路径参数的场景(即,将id等类型的参数当做路径传递,相当于前端路由当中的`/xxx/:id`).则只需要在对应的字段前用`_`替换`:`即可.
例如, 我希望新增一个路径为`/api/goods/detail/:id` 的商品详情接口, 商品id通过路径的最后一位传递到服务当中,此时的文件名为: `goods.detail._id.js`.

### 创建其他类型接口
诚然,不是所有的接口都是get类型,如果我需要创建post或者put类型的接口怎么办呢? 在文件导出的对象中 使用`post`或者`put`属性即可
`department.js`
```
module.exports = {
  post(req,res){
    res.json({ code: 0, message: 'success' })
  },
  put(req,res){
    res.json({ code: 0, message: 'success' })
  }
}
```
我们的接口当然不止支持三种类型,所有请求类型参考如下:
`get`, `post`, `put`, `delete`, `options`, `head`, `connect`, `trace`, `patch`,`all`
其中 `all` 代表所有类型的请求都会被该函数捕捉到


### 请求处理
通过上面的文档,我们可以看到,所有的请求都是由一个函数处理的.事实上,每当有一个用户请求接口,该接口对应的方法就会执行一次  
通过示例,我们可以看到该函数接收两个形参:
第一个是`request`对象,形参一般简写为`req`它包含了所有客户端发起请求时的信息.包括请求路径,请求头,请求参数等等.都能通过它获取到
第二个是`response`对象,形参一般简写为`res`.通过它,我们可以向发起请求的客户端进行响应,返回给客户端它所需要的值

#### 接收参数
我们都知道,在前端发起请求时,不同的请求方法,参数会放在不同的地方传递到后端.比如,get delete等方法,请求参数会放在url当中进行发送.而post,put等都会放在body当中进行发送.
因此,通过req来获取参数时,也会根据不同的属性来接收参数:
`get`,`delete`等方法发送的请求,通过`req.query`来接收
`post`,`put` 等方法发送的请求,通过`req.body`来接收
另外还有一种路径参数,即接口定义为 `/xxx/xxx/:id`形式的参数,可通过`req.params`来接收
`department.js`  
```
module.exports = {
  get(req,res){
    // 用get方法请求 /api/department  传递参数  {deptId:12}
    console.log(req.query) // 输出:  {deptId:12}
  },
  post(req,res){
    // 用post方法请求 /api/department  传递参数  {deptId:24}
    console.log(req.body) // 输出:  {deptId:24}
  }
}
```
`department._id.js`  
```
module.exports = {
  get(req,res){
    // 用get方法请求 /api/department/18 
    console.log(req.params) // 输出: {id:18}
  }
}
```

#### 获取请求路径
如想得知前端请求的路径是什么,可通过`req.originalUrl`来进行获取

#### 获取cookie
`req.cookies`

#### 获取请求的域名
`req.hostname`

#### 获取ip
`req.ip`

#### 获取请求头内的数据
如想要获取存放在请求头内的数据,调用`get`方法,并且传入请求头的key名即可:`req.get(keyName)`.比如,要获取请求头中的token信息:  
```
module.exports = {
  get(req,res){
    const token = req.get('token');
    console.log(token);
  }
}
```

#### 响应接口
通过`res.json()`函数即可向前端响应`json`类型的数据

#### 设置状态码
如需要将响应接口的http状态码进行设置,则通过`status()`函数即可,例如:
```
res.status(201).json({ code: 0, message: '请求成功', data: {...} })
```

#### 设置cookie
使用`cookie()`函数,用法同`status()`,例如:
```
  res
    .status(201)
    .cookie('test','cookie内容')
    .json({ ... })
```  

#### 重定向
如需要通过接口来实现重定向功能,使用`redirect()`函数即可:
```
res.redirect('/user/login')
// 或者
//  res.redirect('http://xxx.xxx.com/user/login')
```


<!--
## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
-->

## 生成文档  
library开发测试完毕之后,还需要对提供相关说明文档,这样框架开发出来才能达到能够被使用的目的. 在初期,开发人力资源不够充足的情况下,为了节约开发资源,现决定通过`typedoc`文档生成器来生成api文档.  
`typedoc`是专门针对ts注释来生成api文档的文档自动生成工具

### 工具安装
通过`npm`全局安装即可:
```
npm i typedoc -g
```

### 复制配置文件  

typedoc在执行的时候需要进行一些固定配置.该配置文件以及提前编写好,并存放在`/project/goku/http` 目录下, 文件名`typedoc.json`
在生成文档之前,需要将该文件复制到自己的library根目录当中

### 执行命令,生成说明文档

进入到自己的library开发目录的根目录当中(即上一步存放`typedoc.json`文件的目录).假设你的library是@goku/tools 那么你的开发目录则是 /projects/goku/tools/
然后执行命令`typedoc`即可
最终,会在你library开发目录的 `/src/docments` 下生成html格式的api文档,通过浏览器打开`index.html`即可

## library注释规范

所有对外暴露的接口,类,函数等等模块均需要书写注释,一来方便调用时IDE提供调用提示,二来是为了`typedoc`工具能够生成对应文档说明

### 基本用法
所有的对外暴露模块的注释,必须以 `/**` 标识为开头,  `*/` 为结尾  
对外暴露模块中,至少村长两部分注释内容  
1.模块的基本功能介绍  
2.模块使用代码案例,代码案例前需要用三级标题进行声明一下(使用三个`#`加空格即可,详见如下案例)
代码块标识同markdown语法,只不过是在`/**  */`注释的标识范围内书写完成的
例如:
```
/**
 * 接口类,包含请求路径和请求方法
 * ### 示例:
 * ```typescript
 * new GKApi('/api/users')
 * ```
 */
export class GKApi {
  ...
}
```

注意: 如果是函数类型,还需要通过`@param`标识来对每个形参添加说明  
而如果存在`@param`标识的时候,示例代码必须放在`@param` 部分的后面

### 成员描述

所有对外暴露的 类/抽象类 接口 枚举 除了对其本身添加注释描述,还需要对公共成员(被`public`访问修饰符修饰的成员)添加注释描述  

#### 属性成员  
对于简单的成员,比如属性成员,可通过以`/**`开头和以`*/`为结尾的单行注释来进行描述,例如:  
```
/**
 * 接口类,包含请求路径和请求方法
 * ```typescript
 * new GKApi('/api/users')
 * ```
 */
export class GKApi {
  /** 发起请求的方法类型 */
  readonly method: MethodType;

  ...
}
```

#### 函数成员

而对于复杂的函数成员以及构造函数成员,则需要采用正常对外函数的注释形式进行注释,至少包含三部分:  
1. 函数功能用法说明
2. 函数调用示例代码
3. 函数的参数说明  

例如:  
```
/**
 * ...
 */
export class GKApi {
  /** ... */
  readonly method: MethodType;

  /** ... */
  readonly url: string

  /**
  * 创建一个接口实例
  * @param url 请求路径
  * @param method 请求方法
  * ### 示例
  * ```typescript
  * let USER = new GKApi('/api/user/')
  * ```
  */
  constructor( url: string,
    method: string = 'get') {
    this.url = url
    this.method = this.methodHandler(method);
  }
}
```  
说明: 参数的注释描述,直接使用vs-code生成的 @param进行描述即可  不同于jsDoc 由于ts本身就具备属性类型声明,所以在tsDoc规范中,属性注释无需再对类型进行标记  属性名后面直接书写属性描述即可

#### 构造函数中的属性成员注释
在类的声明中,ts提供了属性成员声明的语法糖,可以快捷的让我们直接在构造函数中声明成员属性(在构造函数的形参前面加上访问修饰符,比如`public`)  
而要对这种类型的属性成员添加注释也很简单,只需要将该形参单独占一行,然后再上面添加`/**  */`类型注释即可,例如:
```
/**
 * ...
 */
export class GKApi {
  /** ... */
  readonly method: MethodType;

  /**
  * ...
  */
  constructor(
    /** 该api的请求路径 */
    readonly url: string,
    method: string = 'get') {
    this.method = this.methodHandler(method);
  }
}
```  

### 非文档输出性注释  
有些时候,代码当中的注释只是提供给开发人员自己或者内部团队查看和使用的.这种情况下,我们也强烈建议按照常见的tsDoc规范进行注释.但是这种注释并不需要被输出称文档提供给框架调用者阅读.此时,我们就需要通过一些手段来避免这些注释被生成到文档当中  

#### 私有属性注释
对于类/抽象类等类型的模块,如果成员被`private`访问修饰符给修饰,则该成员的注释默认不会被生成到api文档文件中.你无需做任何处理  
例如:
```
/**
 * 接口类,包含请求路径和请求方法
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
   */
  constructor(
    readonly url: string,
    method: string = 'get') {
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
```  
在如上代码中,`methodHandler`方法是GKApi类的私有函数成员.所以,在关于该类的api文档中,只会存在关于该类的整体介绍,构造函数说明, 以及`method`,`url`属性的说明介绍

#### 普通模块
而在开发过程中,除了私有属性,经常也会存在某些方法并非是对外提供,但是是需要在文件中暴露出去,提供给模块的其他部分代码使用的情况.这时候,该模块的注释并不需要被生成到文档中,而我们只需要通过`@internal`标识在注释中声明一下即可,例如:  
```
/**
 * @internal
 * 将简写api类型处理成全字符的
 * @param type api类型
 */
function apiTypeHandler(type: ApiTypeExp): ApiType { ... }
```
注意: `@internal`标识必须在注释的最开头部分声明