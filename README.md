# SCNU Classroom Checker
华南师范大学教室使用情况展示  

# 简介
本程序依托教务处公开的全校课表数据，可以提供当天所有校区的教学楼上课情况（暂未包含课室借用的情况）。  
数据来源：正方教务系统->公用信息->课表查询

本程序为前后端分离架构  
前端采用 Vue.js，支持 Service Worker，可作为 PWA 应用使用  
后端采用 Koa 框架 + Sqlite3 数据库，位于 `backend` 目录  

# 数据的准备
由于数据来自教务系统的公用信息，所以每学期都需要手动导入一次数据  
具体操作参见 `backend/README.md`

# 部署
## 依赖
* Node.js >= 7.6, 推荐 8.x LTS 版本

## 前端的部署
1. 定位到项目根目录，安装前端的依赖
```
npm install
```

2. 构建生产代码
```
npm run build
```

此时生成的代码将位于 dist 目录

3. 配置 Web Server，将 i.scnu.edu.cn/zixi/ 指向 dist 目录

## 后端代码的部署
1. 切换到 `backend` 目录，安装依赖
```
npm install
```

2. 启动
```
node index.js
```

生产环境中可以通过进程管理器(例如 pm2)启动
```
pm2 index.js
```
程序默认监听 3000 端口提供 HTTP 服务，启动时候设置 PORT 环境变量来改变后端API监听的端口号
```
PORT=3001 pm2 index.js
```

3. 配置反向代理，将 i.scnu.edu.cn/zixi/api/ HTTP 转发至第二步指定的端口。

# 开发
## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
