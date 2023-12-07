import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import './styles/style.css'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home.jsx'
import Login from './auth/Login.jsx';
import OwnerSignup from './auth/owner/OwnerSignup.jsx';
import KeeperSignup from './auth/keeper/KeeperSignup.jsx';
import SignUp from './auth/SignUpPage.jsx';
import KeeperDetail from './pages/KeeperDetail.jsx';
import Navbar from './layouts/Navbar.jsx';
import OwnerDetail from './pages/OwnerDetail.jsx';

const router = createBrowserRouter([
  {
    path : "/at3",
    element : <Navbar/>,
    children: [
      { path : "/at3", element : <Home />},
      { path : "/at3/login", element : <Login />  },
      { path : "/at3/signup", element : <SignUp />  },
      { path : "/at3/signup/owner", element : <OwnerSignup /> },
      { path : "/at3/signup/keeper", element : <KeeperSignup /> },
      { path : "/at3/keepers/:id", element : <KeeperDetail /> },
      { path : "/at3/owner", element : <OwnerDetail /> },
    ]
  }
  ], 
)

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
)
