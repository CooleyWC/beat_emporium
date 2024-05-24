import { useEffect, useState } from 'react'
import {Outlet} from 'react-router-dom'
import Header from './Header'
import { useAuth } from './context/AuthProvider';


function App() {

  const {user, login, logout, update} = useAuth();
  const [allInstruments, setAllInstruments] = useState([])

  const [cartItems, setCartItems] = useState([])

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

  useEffect(()=>{
    fetch('/api/instruments')
    .then(res=>res.json())
    .then(instrumentsData=>{
      setAllInstruments(instrumentsData)
    })
  }, [])

  // console.log(allInstruments)

  const handleCartItems = (instrumentObj)=>{
    // add the incoming instuments to state
    // send the state down to shopping cart and dashboard
    const itemsToAdd = cartItems.find((item)=>{
      return item.id === instrumentObj.id
    })

    if(itemsToAdd === undefined || itemsToAdd === null){
      setCartItems([...cartItems, instrumentObj])} else {
        console.log('this item is already in your cart')
      }
  }

  // console.log(cartItems)

  // const handleCheckout = ()=>{

  // }

  return (
    <>
      <Header />
      <Outlet context={{allInstruments, handleCartItems, cartItems}}/>
    </>
  )
}

export default App
