import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes'
import App from './routes/App'
import ErrorPage from './routes/ErrorPage'
import Products from './routes/Products';
import Users from './routes/Users';
import Dashboard from './routes/Dashboard';

const router = createBrowserRouter([
  {
    path: '/', 
    element: <App/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: '/', 
        element: <Dashboard/>,
      },
      {
        path: '/dashboard', 
        element: <Dashboard/>,
      },
      {
        path: '/users', 
        element: <Users/>,
      },
      {
        path: '/products', 
        element: <Products/>,
      },
      {
        path: '/orders', 
        element: <h1>Orders</h1>,
      },
      {
        path: '/shipping', 
        element: <h1>Shipping</h1>,
      },
      {
        path: '/transactions', 
        element: <h1>Transactions</h1>,
      },
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <Theme appearance='dark'>
      <RouterProvider router={router}/>
    </Theme>
  // </React.StrictMode>,
)
