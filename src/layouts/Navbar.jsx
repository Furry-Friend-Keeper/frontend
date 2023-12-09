import React,{ useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { useSelector, useDispatch } from 'react-redux'
import { authActions } from '../store/AuthReducer';

function Navbar() {
  const settings = ['Profile', 'Logout'];
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const isLogin = useSelector(state => state.auth.accessToken)
  const dispatch = useDispatch()
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
   <nav className="navbar navbar-expand-lg bg-white">
      <div className="container">
        <Link className="navbar-brand navbar-head fw-bold text-uppercase" to="/at3">
          Furry Friend Keeper
        </Link>
        <div className="dropdown">
          <button
            id="dropdownMenuButton"
            className="navbar-toggler"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="true"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <ul className={isDropdownOpen ? 'dropdown-menu show' : 'dropdown-menu'} aria-labelledby="dropdownMenuButton">
            <li><Link className="dropdown-item" to="/at3">Home</Link></li>
            <li><Link className="dropdown-item" to="#">About</Link></li>
            <li><Link className="dropdown-item" to="#">Contact</Link></li>
            <li><Link className="dropdown-item" to="/at3/login">Login</Link></li>
            <li><Link className="dropdown-item" to="/at3/signup">Sign up</Link></li>
          </ul>
        </div>
        <div className="nav-page collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav align-items-center">
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/at3">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#">
                Contact
              </Link>
            </li>
            {!isLogin &&
            <li className="nav-item">
              <Link className="nav-link" to="/at3/login">
                Login
              </Link>
            </li>
            }
            {!isLogin &&
            <li className="nav-item">
              <Link className="btn fw-semibold btn-primary" to="/at3/signup">
                Sign up
              </Link>
            </li>
          }
            {/* <li className="nav-item">
              <a className="nav-link" href="/owner">
                <AccountCircleIcon fontSize='large' />
              </a>
            </li> */}
            {isLogin &&
              <li  className="nav-item ">
                <Tooltip title="Open settings" className="ms-3">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="" />
                </IconButton>
              </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {/* {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center" ><Link to={setting === "Profile" ? "owner" : "logout"}>{setting}</Link></Typography>
                    </MenuItem>
                  ))} */}
                   {/* <MenuItem onClick={handleCloseUserMenu}>
                      <Typography textAlign="center" ><Link to="/at3/owner" >Profile</Link></Typography>
                    </MenuItem> */}
                   <MenuItem onClick={handleCloseUserMenu}>
                      <Typography onClick={() => dispatch(authActions.logout())} textAlign="center" ><a href="/at3" >Logout</a></Typography>
                    </MenuItem>
                </Menu>
              </li>
            }
          </ul>
        </div>
      </div>
    </nav>
    <Outlet />
    </>
  )
}

export default Navbar
