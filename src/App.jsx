import { } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './components/HomePage/HomePage'
import Categories from './components/Categories/Categories'
import Register from './components/Users/Register/Register'
import Login from './components/Users/Login/Login'
import Navbar from './components/Navigation/Navbar'

function App() {


  return (
    <>
      <BrowserRouter >
        <Navbar />
        <Routes>
          <Route exact path='/' element={<HomePage />} />
          <Route path='/categories' element={<Categories />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
