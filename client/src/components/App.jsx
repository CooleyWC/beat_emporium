import { useState } from 'react'
import {Outlet} from 'react-router-dom'



function App() {


  return (
    <>
      <h1>Beat Emporium</h1>
      <Outlet />
    </>
  )
}

export default App
