import { useEffect, useState } from 'react'
import {Outlet} from 'react-router-dom'
import Header from './Header'
import { useAuth } from './context/AuthProvider';




function App() {

  const {user, login, logout, update} = useAuth();

  useEffect(()=>{
    checkUser()
  }, [])

  const checkUser = async () =>{
    try{ 
      const res = await fetch('/api/check_session')
      const userData = await res.json()
      if(res.ok){
        login(userData)
      } else {
        logout()
      }
    } catch (error) {
      console.error('Error - try logging in again', error.message)
    }
  }

  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default App
