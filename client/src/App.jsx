import React from 'react'
import AppRouter from './AppRouter'
import useGetCurrentUser from './hooks/getCurrentUser'
export const ServerUrl = "http://localhost:8000/api/v1"


function App() {

  useGetCurrentUser()

  return (
     <AppRouter/>
  )
}

export default App