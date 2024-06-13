import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Home from '../pages/Home.jsx'
import Login from '../pages/Login.jsx';
import OwnerSignup from '../auth/owner/PageOwnerSignup.jsx';
import KeeperSignup from '../auth/keeper/PageKeeperSignup.jsx';
import SignUp from '../pages/SignUpPage.jsx';
import KeeperDetail from '../pages/KeeperDetail.jsx';
import Navbar from '../layouts/Navbar.jsx';
import OwnerDetail from '../pages/OwnerDetail.jsx';
import EditKeeperDetail from '../pages/EditKeeperDetail.jsx';
import About from '../pages/About.jsx';
import ProtectedKeeperRoute from '../components/EditKeeperPage/ProtectedKeeperRoute.jsx';
import AuthVerify from '../components/Global/AuthVerify.jsx';
import AxiosService from '../components/Global/AxiosService.jsx';
import Footer from '../layouts/Footer.jsx';
import Unauthorized from '../components/Global/Unauthorized.jsx';
import NotFound from '../components/Global/NotFound.jsx';
import ScrollTop from '../components/Global/ScrollTop.jsx';
// const router = createBrowserRouter([
//   {
//     path : "/",
//     element : <Navbar/>,
//     children: [
//       { path : "/", element : <Home />},
//       { path : "/login", element : <Login />  },
//       { path : "/signup", element : <SignUp />  },
//       { path : "/signup/owner", element : <OwnerSignup /> },
//       { path : "/signup/keeper", element : <KeeperSignup /> },
//       { path : "/keepers/:id", element : <KeeperDetail /> },
//       { path : "/owner", element : <OwnerDetail /> },
//     ]
//   }
//   ], 
// )

function RouterPage() {
  return (
      <Router>
        <ScrollTop />
        <Navbar />
          <main className="main-container">
          <Routes>
            <Route index path="/at3" element={<Home />} />
            <Route path="/at3/login" element={<Login />} />
            <Route path="/at3/signup" element={<SignUp />} />
            <Route path="/at3/signup/owner" element={<OwnerSignup />} />
            <Route path="/at3/signup/keeper" element={<KeeperSignup />} />
            <Route path="/at3/keepers/:id" element={<KeeperDetail />} />
            <Route path="/at3/owner/:ownerId" element={<OwnerDetail />} />
            <Route path="/at3/keeper-edit/:keeperId" 
            element={<ProtectedKeeperRoute element={EditKeeperDetail} />} />
            <Route path="/at3/about-us" element={<About />} />
            {/* Add more routes as needed */}
            <Route path="/at3/unauthorized" element={<Unauthorized />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          </main>    
        <Footer />
        {/* <AxiosService /> */}
      </Router>
  )
}

export default RouterPage

axios.defaults.baseURL = 'https://capstone23.sit.kmutt.ac.th/at3/api/';
// // Axios interceptor for all requests
// axios.interceptors.request.use(async (config) => {
//   // Auto-refresh token before making any request
//   await autoRefreshToken();
//   // Get updated token from storage
//   const token = localStorage.getItem(TOKEN_STORAGE_KEY);
//   // Add token to request headers
//   config.headers.Authorization = Bearer ${token};
//   return config;
// });

// axios.interceptors.response.use((response) => response, (error) => {
//   if (typeof error.response === 'undefined') {
//     alert('A network error occurred. '
//         + 'This could be a CORS issue or a dropped internet connection. '
//         + 'It is not possible for us to know.')
//   }
//   return Promise.reject(error)
// })