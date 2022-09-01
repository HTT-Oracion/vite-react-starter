# vite + react + ts + tailwind + antd

## tailwindcss

1. 安装依赖

```
    pnpm add -D tailwindcss@latest postcss@latest autoprefixer@latest

```

2. 初始化

```
    npx tailwindcss init
    // tailwind.config.cjs
    + content: ['./src/**/*.html', './src/**/*.js']
    // 创建postcss.config.cjs
    module.exports = {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    };
```

3. 引入

```
    在index.css中引入
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
```

4. 注意

```
    tailwind  v3 则配置用content
              v2 purge
    tailwindcss生成的typescript项目, 只支持cjs. 如postcss、eslint、prettier 使用 cjs
```

## eslint + prettier

1. 安装依赖

```
    npm i -D @typescript-eslint/parser eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-react prettier
```

2. 配置

```
   // 创建.eslintrc.cjs
   module.exports = {
    extends: ['eslint:recommended', 'plugin:react/recommended'],
    env: {
        browser: true,
        commonjs: true,
        es6: true,
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
        jsx: true,
        modules: true,
        },
        sourceType: 'module',
        ecmaVersion: 6,
    },
    plugins: ['react', 'standard', '@typescript-eslint'],
    settings: {
        'import/resolver': {
        node: {
            extensions: ['.tsx', '.ts', '.js', '.json'],
        },
        alias: [['@', './src']],
        },
    },
    rules: {
        semi: 0,
        indent: 0,
        'react/jsx-filename-extension': 0,
        'react/prop-types': 0,
        'react/jsx-props-no-spreading': 0,

        'jsx-a11y/click-events-have-key-events': 0,
        'jsx-a11y/no-static-element-interactions': 0,
        'jsx-a11y/no-noninteractive-element-interactions': 0,
        'jsx-a11y/anchor-is-valid': 0,

        'no-use-before-define': 0,
        'no-unused-vars': 0,
        'implicit-arrow-linebreak': 0,
        'consistent-return': 0,
        'arrow-parens': 0,
        'object-curly-newline': 0,
        'operator-linebreak': 0,
        'import/no-extraneous-dependencies': 0,
        'import/extensions': 0,
        'import/no-unresolved': 0,
        'import/prefer-default-export': 0,

        '@typescript-eslint/ban-ts-comment': 0,
        '@typescript-eslint/no-var-requires': 0,
        },
    }


    // 创建 .prettierrc
    {
        "singleQuote": true,
        "tabWidth": 2,
        "endOfLine": "lf",
        "trailingComma": "all",
        "printWidth": 100,
        "arrowParens": "avoid",
        "semi": false,
        "bracketSpacing": true
    }
```

## antd

1. 安装依赖

```
pnpm add antd @ant-design/icons
pnpm add -D less vite-plugin-imp
```

2. 修改 vite.config.ts

```
import { defineConfig } from 'vite';
import vitePluginImp from 'vite-plugin-imp';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    vitePluginImp({
      optimize: true,
      libList: [
        {
          libName: 'antd',
          style: (name) => `antd/es/${name}/style`,
        },
      ],
    }),
  ],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        // 如需定制 antd 主题，请取消以下内容注释 https://ant.design/docs/react/customize-theme
        // modifyVars: {
        //   hack: `true; @import "./src/theme.less";`,
        // },
      },
    },
  },
});
```

## react-router v6

```
pnpm add react-router-dom

```

### 第一种使用方式

在 main.tsx 挂载

```
import { BrowserRouter as Router } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
)
```

创建 router/index.tsx

```
import React from 'react'
import { Routes, Route } from 'react-router-dom'

const Home = () => {
  return <div>Home page</div>
}

const About = () => {
  return <div>About page</div>
}

const AppRouter = () => {
  return (
    <Routes>
      <Route index element={<Home />}></Route>
      <Route path="/about" element={<About />}></Route>
    </Routes>
  )
}

export default AppRouter

```

在 App.tsx 里引用 router

```
import AppRouter from './router'
import { Link } from 'react-router-dom'

function App () {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">首页</Link>
        </li>
        <li>
          <Link to="/about">关于</Link>
        </li>
      </ul>
      <AppRouter />
    </div>
  )
}
```

### 第二种方式: useRoutes 懒加载

... 待补充

## redux/toolkit

1. 安装依赖

```
pnpm add react-redux @redux/toolkit
```

2. 引入
   创建 store/index.tsx

```
import { configureStore } from '@reduxjs/toolkit'
import counter from './couter'

const store = configureStore({
  reducer: {
    counter
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store

```

创建一个 module store/couter.tsx

```
import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0
  },
  reducers: {
    increment: state => {
      state.value += 1
    },
    decrement: state => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    }
  }
})
// 每个 case reducer 函数会生成对应的 Action creators
export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer

```

3.使用

```
//main.tsx
import { Provider } from 'react-redux'
import store from '@/store'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <App />
  </Provider>
)
```

首先封装成 Hooks

```
import type { RootState, AppDispatch } from '@/store'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector


```

在组件里使用

```
import { decrement, increment } from '@/store/couter'
import { useAppDispatch, useAppSelector } from './hooks'

const counts = useAppSelector(state => state.counter.value)
const dispatch = useAppDispatch()
// jsx
      <div>
        <button aria-label="Increment value" onClick={() => dispatch(increment())}>
          Increment
        </button>
        <span>{count}</span>
        <button aria-label="Decrement value" onClick={() => dispatch(decrement())}>
          Decrement
        </button>
        <hr />
        <h1>--- {counts} --</h1>
      </div>
```

## stylelint..
