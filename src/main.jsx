import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import './styles/style.css'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx'
import Login from './auth/login.jsx';
import Signup from './auth/signup.jsx';
import SignupKeeper from './auth/SignupKeeper.jsx';
import KeeperDetail from './KeeperDetail.jsx';


const router = createBrowserRouter([
  {
    path : "/",
    element : <App />
  },
  {
    path : "/login",
    element : <Login />
  },
  {
    path : "/signup",
    element : <Signup />
  },
  {
    path : "/signup-keeper",
    element : <SignupKeeper />
  },
  {
    path : "/keepers",
    element : <KeeperDetail />
  }
  ], 
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
