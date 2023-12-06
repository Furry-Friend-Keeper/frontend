import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import './styles/style.css'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './Home.jsx'
import Login from './auth/Login.jsx';
import OwnerSignup from './auth/owner/OwnerSignup.jsx';
import KeeperSignup from './auth/keeper/KeeperSignup.jsx';
import SignUp from './auth/SignUpPage.jsx';
import KeeperDetail from './KeeperDetail.jsx';
import Navbar from './layouts/Navbar.jsx';
import $ from 'jquery'

const router = createBrowserRouter([
  {
    path : "/",
    element : <Navbar/>,
    children: [
      { path : "/", element : <App />},
      { path : "/login", element : <Login />  },
      { path : "/signup", element : <SignUp />  },
      { path : "/signup/owner", element : <OwnerSignup /> },
      { path : "/signup/keeper", element : <KeeperSignup /> },
      { path : "/keepers", element : <KeeperDetail /> }
    ]
  }
  ], 
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
