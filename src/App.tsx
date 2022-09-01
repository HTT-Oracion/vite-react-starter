import React from 'react'
import AppRouter from './router'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { decrement, increment } from '@/store/couter'
import { useAppDispatch, useAppSelector } from './hooks'
function App() {
  const [count, setCount] = useState(0)
  const counts = useAppSelector(state => state.counter.value)
  const dispatch = useAppDispatch()
  return (
    <div className="grid place-content-center h-screen text-center text-lg">
      <div className="flex mx-auto items-center gap-8">
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src="/vite.svg" className="w-28" alt="Vite logo" />
        </a>
      </div>
      <h1 className="my-20 font-semibold text-6xl">Vite + React</h1>
      <div>
        <p className="mt-4 mb-12">
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="opacity-40">Click on the Vite and React logos to learn more</p>
      <ul>
        <li>
          <Link to="/">首页</Link>
        </li>
        <li>
          <Link to="/about">关于</Link>
        </li>
      </ul>
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
      <AppRouter />
    </div>
  )
}

export default App
