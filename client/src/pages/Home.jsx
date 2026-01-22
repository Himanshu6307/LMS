import React from 'react'
import { useSelector } from 'react-redux'

function Home() {
  
    const {loading} =useSelector(state=>state.user)


  return (
    <div>{!loading?<div> Home</div>:<div>Loading</div>}</div>
  )
}

export default Home