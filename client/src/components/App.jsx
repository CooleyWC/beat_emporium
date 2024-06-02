import React, {useEffect, useState} from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {useCart} from './context/CartProvider'
import Login from './forms/Login'
import ErrorPage from './pages/ErrorPage'
import Signup from './forms/Signup'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import PaymentPage from './pages/PaymentPage'
import PaymentResult from './pages/PaymentResult'
import NavBar from './NavBar'
import { useAuth } from './context/AuthProvider'
import Instruments from './pages/Instruments'


function App(){

  const {login, user} = useAuth()
  const {cartItems} = useCart()

  const [allInstruments, setAllInstruments] = useState([])

  // console.log(`user from app: ${user}`)

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


  const stageRentals = ()=>{
    if(cartItems && user){
      const rentalObjArr = cartItems.map((instrument)=>{
        console.log(`instrument from rental map: ${instrument}`)
        return({
          "user_id": user.id,
          "instrument_id": instrument.id,
          "created_at": new Date(),
          "start_date": instrument.start_date,
          "return_date": instrument.end_date
        })
      })
      newRentalPost(rentalObjArr)
    } else {
      console.log('there was a problem creating rentalObjArr - the rental post will fail')
    }
  }

  const newRentalPost = (arr)=>{
        console.log(`rentalPost from inside the post: ${arr}`)
        fetch('/api/rentals', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify(arr)
        })
        .then((res)=>{
          if(res.ok){
            res.json()
            .then(data=>console.log(data))
          } else {
            res.json()
            .then(error=>console.log(error))
          }
        })
      }

  return(

    <Router>
      <Routes>
        <Route path='/' errorElement={<ErrorPage />} element={<NavBar />}>
          <Route index element={<Home />}/>
          <Route path='instruments' element={<Instruments allInstruments={allInstruments}/>}/>
          <Route path='*' element={<ErrorPage/>}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/signup' element={<Signup />}/>
          <Route path='/dashboard' element={<Dashboard />}/>
          <Route path='/payment_page' element={<PaymentPage />}/>
          <Route path='/payment_result' element={<PaymentResult user={user} stageRentals={stageRentals}/>}/>
        </Route>
    
      </Routes>
    </Router>
  )
}

export default App

// import { useEffect, useState, useRef } from 'react'
// import {Outlet} from 'react-router-dom'
// import Header from './Header'
// import { useAuth } from './context/AuthProvider';
// import PaymentResult from './pages/PaymentResult';


// function App() {

//   const {user, login, logout, update} = useAuth();
  // const [allInstruments, setAllInstruments] = useState([])

  // const [cartItems, setCartItems] = useState([])

//   const oldCart = useRef([])

//   useEffect(()=>{
//     oldCart.current = cartItems
//   }, [cartItems])

//   console.log(`app cart items: ${cartItems}`)
//   console.log(`old cart: ${oldCart.current}`)

  // useEffect(()=>{
  //   checkUser()
  // }, [])

  // const checkUser = async () =>{
  //   try{ 
  //     const res = await fetch('/api/check_session')
  //     const userData = await res.json()
  //     if(res.ok){
  //       login(userData)
  //     } else {
  //       logout()
  //     }
  //   } catch (error) {
  //     console.error('Error - try logging in again', error.message)
  //   }
  // }

  // useEffect(()=>{
  //   fetch('/api/instruments')
  //   .then(res=>res.json())
  //   .then(instrumentsData=>{
  //     setAllInstruments(instrumentsData)
  //   })
  // }, [])

//   // this now adds the start and end dates to the instrumentobj selection
  // const handleCartItems = (instrumentObjWithDates)=>{
  //   console.log('added')

  //   const itemsToAdd = cartItems.find((item)=>{
  //     return item.id === instrumentObjWithDates.id
  //   })

  //   if(itemsToAdd === undefined || itemsToAdd === null){
  //     setCartItems([...cartItems, instrumentObjWithDates])} else {
  //       console.log('this item is already in your cart')
  //     }
  // }

  // const handleRemoveCartItems = (obj)=>{
  //   const updatedItemsAfterDelete = cartItems.filter((item)=>{
  //     return item.id !== obj.id
  //   })
  //   setCartItems(updatedItemsAfterDelete)
  // }

//   const rentalPost = (obj)=>{
//     console.log('from app', obj)
//   }


//   return (
//     <>
//       <Header />
//       <Outlet context={{allInstruments, handleCartItems, cartItems, handleRemoveCartItems, rentalPost}}/>
//       <PaymentResult cartItems={cartItems}/>
//     </>
//   )
// }

// export default App
