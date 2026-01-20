import React from 'react'
import { BrowserRouter,Route,Routes } from 'react-router-dom'

function AppRouter() {
  return (
    <BrowserRouter>
       <Routes>
          <Route path='/' element={<div className='bg-red-500'>Hello Himanshu</div>}/>
       </Routes>
    </BrowserRouter>
  )
}

export default AppRouter