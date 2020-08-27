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
        所有页面中需要用到的其他非公共组件,均在页面组件目录下再创建components进行管理
    3. 其他文件
        所有页面中需要用到的其他非公共服务/管道/指令等等同样在页面组件目录下再创建对应目录进行管理,比如: 服务文件放在services/  管道放在 pipes/
    4. 公共文件
        所有公共的组件,服务,指令,管道等等均放置在shared目录下进行管理

#### 添加路由/菜单
    页面组件创建完成后,需要添加路由才能进行访问.同时,如果需要在页面添加入口的话,还需要在菜单组件上添加相应按钮.
    在本调试项目中,对该两处配置做了集成处理,如果需要添加路由和菜单,在 /src/app/routes/routes.conf.ts文件内进行管理即可
    代码如下
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
    第四个参数为子级混合路由对象列表,用法相同



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
