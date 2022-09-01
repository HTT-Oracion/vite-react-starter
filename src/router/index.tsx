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
