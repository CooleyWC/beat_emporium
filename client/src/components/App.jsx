import { useEffect, useState } from 'react'
import {Outlet} from 'react-router-dom'
import Header from './Header'
import { useAuth } from './context/AuthProvider';


function App() {

  const {user, login, logout, update} = useAuth();
  const [allInstruments, setAllInstruments] = useState([])

  const [cartItems, setCartItems] = useState([])

  // console.log('cart items from app', cartItems)

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

  // this now adds the start and end dates to the instrumentobj selection
  const handleCartItems = (instrumentObjWithDates)=>{
    console.log('added')

    const itemsToAdd = cartItems.find((item)=>{
      return item.id === instrumentObjWithDates.id
    })

    if(itemsToAdd === undefined || itemsToAdd === null){
      setCartItems([...cartItems, instrumentObjWithDates])} else {
        console.log('this item is already in your cart')
      }
  }

  const handleRemoveCartItems = (obj)=>{
    const updatedItemsAfterDelete = cartItems.filter((item)=>{
      return item.id !== obj.id
    })
    setCartItems(updatedItemsAfterDelete)
  }

  const rentalPost = (obj)=>{
    console.log('from app', obj)
  }


  return (
    <>
      <Header />
      <Outlet context={{allInstruments, handleCartItems, cartItems, handleRemoveCartItems, rentalPost}}/>
    </>
  )
}

export default App
