import './style/App.css'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import AddTask from './components/AddTask'
import UpdateTask from './components/UpdateTask'
import List from './components/List'
import SignUp from './components/SignUp'
import Login from './components/Login'
import Protected from './components/Protected'
import { useState } from 'react'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Protected><List /></Protected>} />
        <Route path='/add' element={<Protected><AddTask /></Protected>} />
        <Route path='/update/:id' element={<Protected><UpdateTask /></Protected>} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </>
  )
}

export default App
