import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home.jsx'
import Login from './auth/Login.jsx';
import OwnerSignup from './auth/owner/PageOwnerSignup.jsx';
import KeeperSignup from './auth/keeper/PageKeeperSignup.jsx';
import SignUp from './auth/SignUpPage.jsx';
import KeeperDetail from './pages/KeeperDetail.jsx';
import Navbar from './layouts/Navbar.jsx';
import OwnerDetail from './pages/OwnerDetail.jsx';
import EditKeeperDetail from './pages/EditKeeperDetail.jsx';
import About from './pages/About.jsx';
import ProtectedKeeperRoute from './components/ProtectedKeeperRoute.jsx';
import AuthVerify from './components/AuthVerify.jsx';
// import Account from './auth/owner/Account.jsx';
import Footer from './layouts/Footer.jsx';
import Unauthorized from './components/Unauthorized.jsx';
import NotFound from './components/NotFound.jsx';
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

function App() {
  return (
      <Router>
        <Navbar />
          <main className="main-container">
          <Routes>
            <Route index path="/at3" element={<Home />} />
            <Route path="/at3/login" element={<Login />} />
            <Route path="/at3/signup" element={<SignUp />} />
            <Route path="/at3/signup/owner" element={<OwnerSignup />} />
            <Route path="/at3/signup/keeper" element={<KeeperSignup />} />
            <Route path="/at3/keepers/:id" element={<KeeperDetail />} />
            <Route path="/at3/owner" element={<OwnerDetail />} />
            <Route path="/at3/keeper-edit/:keeperId" element={<ProtectedKeeperRoute element={EditKeeperDetail} />} />
            <Route path="/at3/about-us" element={<About />} />
            {/* Add more routes as needed */}
            <Route path="/at3/unauthorized" element={<Unauthorized />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          </main>    
        <Footer />
        <AuthVerify />
      </Router>
  )
}

export default App