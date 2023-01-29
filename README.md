# vue3+ts+vite+scss搭建组件库

**第五届青训营项目（队名：动态数组）**

**组件库名称**：`dtsz-ui`

**github地址**：[zzyyhh22lx/dtsz-ui: vue3组件库-青训营项目 (github.com)](https://github.com/zzyyhh22lx/dtsz-ui)



## 1、搭建monorepo环境

[现代前端工程为什么越来越离不开 Monorepo? - 掘金 (juejin.cn)](https://juejin.cn/post/6944877410827370504)



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

可以直接生成 `npx tsc --init`

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
      "lib": [ // 编译时⽤的库
        "ESNext",
        "DOM"
      ],
      "allowSyntheticDefaultImports": true, // 允许没有导出的模块中导⼊
      "experimentalDecorators": true, // 装饰器语法
      "forceConsistentCasingInFileNames": true, // 强制区分⼤⼩写
      "resolveJsonModule": true, // 解析json模块
      "strict": true, // 是否启动严格模式
      "skipLibCheck": true, // 跳过类库检测
    },
    "exclude": [ // 排除掉哪些类库
      "node_modules",
      "**/__tests__",
      "dist/**"
    ]
}
```

创建`pnpm-workspace.yaml`配置文件

以将多个项目合并到一个仓库中

```yaml
packages:
  - 'packages/**' # 存放所有组件
  - 'docs' # 文档
  - 'play' # 测试
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

在 `components` 目录下修改  `package.json` 修改为 `dtsz-ui` 

其他俩个目录下的 `package.json` 修改 `name` ，加上 `@dtsz-ui/ ` 代表**该包是属于 `@dtsz` 这个组织下的**（子包）



在根目录下执行

```shell
pnpm i dtsz-ui -w 
pnpm i @dtsz-ui/theme-chalk -w 
pnpm i @dtsz-ui/utils -w  
```

此时 `pnpm` 会自动创建个软链接指向指定包，方便本地调试各个包直接的关联引用。（-w：workspace）

[工作空间（Workspace） | pnpm](https://pnpm.io/zh/workspaces)



在 `components` 目录下

```shell
pnpm i @dtsz-ui/utils # 安装utils依赖便于后续打包
pnpm i @dtsz-ui/theme-chalk
```

这样在该目录下就可以使用utils定义的工具函数了

```js
import xxx from '@dtsz-ui/utils'
```



## 3、本地调试

这里可以用脚手架直接生成vue模板（这里简单自己配置一下，减少内存占用）



在根目录下

```shell
mkdir play && cd play # 新建play目录
pnpm init
pnpm install vite @vitejs/plugin-vue -D -w # 支持对vue的转义 -w 这里安装的插件都放在根目录下
```

**配置vite.config.ts**

新建vite.config.ts

```javascript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    plugins:[vue()]
})
```

**新建index.html**

@vitejs/plugin-vue 会默认加载examples下的index.html

```xml
<!DOCTYPE html>
<html lang="en">
<body>
    <div id="app"></div>
    <!-- vite 是基于 `esmodule` 的 所以 `type="module"` -->
    <script src="main.ts" type="module"></script>
</body>
</html>
```

**新建app.vue模板**

```xml
<template>
    <div>
        测试组件
    </div>
</template>
```

**新建main.ts**

```javascript
import {createApp} from 'vue'
import App from './app.vue'
const app = createApp(App)
app.mount('#app')
```

此时会发现编译器会提示个错误：找不到模块“./app.vue”或其相应的类型声明

因为直接引入.vue文件 TS会找不到对应的类型声明；所以需要新建typings（命名没有明确规定，TS会自动寻找.d.ts文件）文件夹来专门放这些声明文件。

**新建 typings/vue-shim.d.ts**

TypeScriptTS默认只认ES 模块。如果你要导入.vue文件就要declare module把他们声明出来。

```typescript
declare module '*.vue' {
    import type { DefineComponent } from "vue";
    const component:DefineComponent<{},{},any>
}
```

**配置脚本启动项目**

最后在package.json文件中配置scripts脚本（play目录下）

```erlang
...
"scripts": {
    "dev": "vite"
  },
...
```

**运行**

```shell
pnpm run dev
```



## 4、编写组件

样例：button组件

目录

```lua
-- components
  -- index.ts
  -- src
  	-- index.ts
    -- button
		-- DtszButton.vue
```

 `DtszButton.vue` 

```vue
<template>
	<button>这是一个button</button>
</template>
```

**导出：**

`src/index.ts`

```ts
import DtszButton from './DtszButton.vue'

export default DtszButton
```

`index.ts`

```ts
import DtszButton from './src/button'

export { DtszButton }
```



## 5、使用组件

在 `play` 目录下

```shell
pnpm i dtsz-ui # 安装依赖（优先从pnpm-lock.yaml寻找）
```

`app.vue`

```vue
<template>
    <div>
        <dtsz-button></dtsz-button>
    </div>
</template>
<script lang="ts" setup>
import { DtszButton } from 'dtsz-ui'
</script>
```

新建 `vue-shim.d.ts` 声明文件

直接引入.vue文件 TS会找不到对应的类型声明；

新建typings（命名没有明确规定，TS会自动寻找.d.ts文件）文件夹来专门放这些声明文件。

TypeScriptTS默认只认ES 模块。如果你要导入.vue文件就要declare module把他们声明出来。

```ts
declare module '*.vue' {
    import type { DefineComponent } from "vue";
}
```



## 6、编写组件库文档

**使用 `vitepress`**

```shell
mkdir docs
cd docs
pnpm init
pnpm i vitepress -w
```



**`docs`目录下**

新建 `index.md`

```md
# helloworld
```

配置`package.json`

```json
...
"scripts": {
    "dev": "vitepress dev ."
}
...
```



根目录下配置`package.json`

```json
...
"scripts": {
    "docs:dev": "pnpm -C docs dev"
}
...
```



启动`docs`目录

```shell
pnpm run docs:dev
```



## 7、打包组件

**配置 `vite.config.ts`**

```ts

```

**配置 `package.json`**

发公共包：将各个包的协议改为**MIT开源协议**

```json
...
"license": "MIT",
...

// 配置script
```

**打包**

```shell

```



## 8、发布组件

**发布到npm官网**

[npm (npmjs.com)](https://www.npmjs.com/)

```shell
npm login # 登录 npm 账号 （输入账号密码邮箱）
npm config set registry=https://registry.npmjs.org # 需要确保自己用的 registry 是 npm 源而不是淘宝镜像源
npm publish
```



