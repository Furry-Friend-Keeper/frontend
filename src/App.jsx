import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
// import store from './store/Store.jsx'; // Assuming you've created your Redux store

import Home from './pages/Home.jsx'
import Login from './auth/Login.jsx';
import OwnerSignup from './auth/owner/OwnerSignup.jsx';
import KeeperSignup from './auth/keeper/KeeperSignup.jsx';
import SignUp from './auth/SignUpPage.jsx';
import KeeperDetail from './pages/KeeperDetail.jsx';
import Navbar from './layouts/Navbar.jsx';
import OwnerDetail from './pages/OwnerDetail.jsx';

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
    // <Provider store={store}>
      <Router>
        <Navbar />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signup/owner" element={<OwnerSignup />} />
          <Route path="/signup/keeper" element={<KeeperSignup />} />
          <Route path="/keepers/:id" element={<KeeperDetail />} />
          <Route path="/owner" element={<OwnerDetail />} />
          {/* Add more routes as needed */}
        </Routes>
      </Router>
    // </Provider>
  )
}

export default App