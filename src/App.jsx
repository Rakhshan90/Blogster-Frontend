import { } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './components/HomePage/HomePage'
import Register from './components/Users/Register/Register'
import Login from './components/Users/Login/Login'
import Navbar from './components/Navigation/Navbar'
import AddNewCategory from './components/Categories/AddNewCategory'
import CategoryList from './components/Categories/CategoryList'
import UpdateCategory from './components/Categories/UpdateCategory'
import AdminProtectRoute from './components/Navigation/ProtectedRoutes/AdminProtectRoute'
import PrivateProtectRoute from './components/Navigation/ProtectedRoutes/PrivateProtectRoute'
import CreatePost from './components/Posts/CreatePost'
import PostsList from './components/Posts/PostsList'


function App() {


  return (
    <>
      <BrowserRouter >
        <Navbar />
        <Routes>
          <Route exact path='/' element={<HomePage />} />
          <Route exact path='/add-category' element={<AdminProtectRoute> <AddNewCategory /> </AdminProtectRoute>} />
          <Route exact path='/posts' element={<PostsList />} />
          <Route exact path='/create-post' element={<PrivateProtectRoute> <CreatePost /> </PrivateProtectRoute>} />
          <Route exact path='/update-category/:id' element={<AdminProtectRoute> <UpdateCategory /> </AdminProtectRoute>} />
          <Route exact path='/category-list' element={<AdminProtectRoute> <CategoryList /> </AdminProtectRoute>} />
          <Route exact path='/register' element={<Register />} />
          <Route exact path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
