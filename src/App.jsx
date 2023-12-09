import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/Store.jsx'; // Assuming you've created your Redux store

import Home from './pages/Home.jsx'
import Login from './auth/Login.jsx';
import OwnerSignup from './auth/owner/PageOwnerSignup.jsx';
import KeeperSignup from './auth/keeper/PageKeeperSignup.jsx';
import SignUp from './auth/SignUpPage.jsx';
import KeeperDetail from './pages/KeeperDetail.jsx';
import Navbar from './layouts/Navbar.jsx';
import OwnerDetail from './pages/OwnerDetail.jsx';
import KeeperEdit from './auth/keeper/EditKeeperDetail.jsx';
// import Account from './auth/owner/Account.jsx';
import Footer from './layouts/Footer.jsx';
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
    <Provider store={store}>
      <Router>
        <Navbar />
          <div className="main-container">
          <Routes>
            <Route index path="/at3" element={<Home />} />
            <Route path="/at3/login" element={<Login />} />
            <Route path="/at3/signup" element={<SignUp />} />
            <Route path="/at3/signup/owner" element={<OwnerSignup />} />
            <Route path="/at3/signup/keeper" element={<KeeperSignup />} />
            <Route path="/at3/keepers/:id" element={<KeeperDetail />} />
            <Route path="/at3/owner" element={<OwnerDetail />} />
            <Route path="/at3/keeper-edit/1" element={<KeeperEdit />} />
            {/* Add more routes as needed */}
      
          </Routes>
          </div>    
        <Footer />
      </Router>
    </Provider>
  )
}

export default App