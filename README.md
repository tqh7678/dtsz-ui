# vue3+ts+vite搭建组件库

**第五届青训营项目**



## 1、搭建monorepo环境

使用 `pnpm` 当做包管理工具，用`pnpm workspace`来实现`monorepo`。

```shell
# 安装
npm i pnpm -g # 全局安装pnpm
pnpm init
pnpm i vue typescript -D
```

创建 `.npmrc` 配置文件（作用：依赖扁平化）

```npmrc
shamefully-hoist = true
```

创建 `tsconfig.json` 文件

```json
{
    "compilerOptions": {
      "module": "ESNext", // 打包模块类型ESNext
      "declaration": false, // 默认不要声明⽂件
      "noImplicitAny": false, // ⽀持类型不标注可以默认any
      "removeComments": true, // 删除注释
      "moduleResolution": "node", // 按照node模块来解析
      "esModuleInterop": true, // ⽀持es6,commonjs模块
      "jsx": "preserve", // jsx 不转
      "noLib": false, // 不处理类库
      "target": "es6", // 遵循es6版本
      "sourceMap": true,
      "lib": [
        // 编译时⽤的库
        "ESNext",
        "DOM"
      ],
      "allowSyntheticDefaultImports": true, // 允许没有导出的模块中导⼊
      "experimentalDecorators": true, // 装饰器语法
      "forceConsistentCasingInFileNames": true, // 强制区分⼤⼩写
      "resolveJsonModule": true, // 解析json模块
      "strict": true, // 是否启动严格模式
      "skipLibCheck": true, // 跳过类库检测
      "types": ["unplugin-vue-define-options"] // sfc 添加 name属性的包需要的
    },
    "exclude": [
      // 排除掉哪些类库
      "node_modules",
      "**/__tests__",
      "dist/**"
    ]
}
```

创建`pnpm-workspace.yaml`配置文件

```yaml
packages:
  - 'packages/**' # 存放所有组件
  - 'docs' # 文档
```



## 2、配置组件环境

在根目录下

```shell
cd packages
mkdir components utils theme-chalk # 分别存放组件、工具方法、样式
# 初始化
cd components && pnpm init
cd ../utils && pnpm init
cd ../theme-chalk && pnpm init
```







**参考文章：**

https://juejin.cn/post/7145113345765408798

