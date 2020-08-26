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
npm i superverser
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
在终端中使用命令行进行等

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
