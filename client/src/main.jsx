import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import routes from './routes';
import {AuthProvider} from './components/context/AuthProvider'

const router = createBrowserRouter(routes)

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
)
