// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import './index.css'
// import {createBrowserRouter, RouterProvider} from 'react-router-dom';
// import routes from './routes';
// import {AuthProvider} from './components/context/AuthProvider'

// const router = createBrowserRouter(routes)

// const root = ReactDOM.createRoot(document.getElementById('root'))

// root.render(
//   <AuthProvider>
//     <RouterProvider router={router} />
//   </AuthProvider>
// )


import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './components/App';
import { CartProvider } from './components/context/CartProvider';
import {AuthProvider} from './components/context/AuthProvider';
import {ReviewProvider} from './components/context/ReviewProvider';

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <React.StrictMode>
        <AuthProvider>
            <CartProvider>
                <ReviewProvider>
                    <App />
                </ReviewProvider>
            </CartProvider>
        </AuthProvider>
    </React.StrictMode>
)