#项目描述
vue2.0 vuex  node.js webpack

#构建项目

下载依赖包 npm install (或者用cnpm install)
启动开发环境 npm start
sit部署文件 npm run sit
uat部署文件 npm run uat
生产部署文件 npm run prod 或者npm run prod:hk
压缩备份 gulp 或者 gulp zip:hk:pro

#目录结构
```
├── dist                                  # 项目build打包压缩编译目录
├── node_modules                          # node.js模块包文件夹
├── src                                   # 项目源码，开发目录。
  └──css                                  # 样式文件
  └──fonts                                # 字体文件
  └──html                                 # 入口html文件
  └──img                                  # 图片
  └──page                                 # 这里包括了页面组件
    └──service                            # 接口
    └──components                         # 公共组件
    └──config                             # 配置文件
    └──entry                              # JS入口文件，文件名对应../html目录下的html文件的文件名
    └──language                           # 多语言
    └──lib                                # 第三方库文件
    └──util                               # 全局工具库
├── static                                # 静态资源文件。
├── zip                                   # 压缩备份项目。
├── .babelrc                              # babel编译规则
├── .gitignore                            # GIT忽略的目录或文件
├── gulpfile                              # 备份压缩项目配置文件
├── package.json                          # NPM包管理配置文件，描述了一个NPM包的所有相关信息，包括作者、简介、包依赖、构建等信息。
├── README.md                             # 显目说明文件，现在你看到的这份文档，就是这个文件下写出来的。
├── webpack-dev-server.config.babel.js    # 开发构建配置文件
└── webpack-production.config.babel.js    # 生产构建配置文件
```

#参考文献
https://cn.vuejs.org/v2/api/
https://webpack.js.org/concepts/
https://www.npmjs.com/package/crypto-js
http://element-cn.eleme.io/1.4/#/zh-CN/component/installation

#备注


