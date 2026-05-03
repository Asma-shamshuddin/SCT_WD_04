import React from 'react'
import Profile from './profile'
import Todoapp from './Todoapp'
import {Routes, Route} from 'react-router-dom'


const App = () => {
  return (
    <div>
      <Routes>
      <Route path = '/' element={<Profile/>} />
      <Route path = '/todo' element = {<Todoapp/>} />
      </Routes>
    </div>
  )
}

export default App
