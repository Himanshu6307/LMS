import React from 'react'
import AppRouter from './AppRouter'
import useGetCurrentUser from './hooks/getCurrentUser'
import useGetCreatedCourse from './hooks/getCreatedCourse'
export const ServerUrl = "http://localhost:8000/api/v1"


function App() {

  useGetCurrentUser()
  useGetCreatedCourse()

  return (
     <AppRouter/>
  )
}

export default App