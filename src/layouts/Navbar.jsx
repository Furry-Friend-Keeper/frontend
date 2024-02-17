import React,{ useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../store/AuthSlice';
import { Button } from '@mui/material';

function Navbar() {
  const settings = ['Profile', 'Logout'];
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const isLogin = useSelector(state => state.auth.accessToken)
  const getRole = useSelector(state => state.auth.role)
  const getId = useSelector(state => state.auth.id)
  const dispatch = useDispatch()
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
   <nav className="navbar navbar-expand-lg">
      <div className="container">
        <Link className="navbar-brand navbar-head" to="/at3">
          <div className='d-flex align-items-center'>
            <img className="me-3 object-fit-contain" src="/assets/cat.png" alt="" width={50} />
            <div className='logo-content'>
              <p className='m-0'>Furry Friend</p>
              <p className='m-0'>Keeper</p>
            </ div>
          </div>
          {/* <div className='d-flex align-items-center'>
            <img className="me-2 object-fit-contain" src="./assets/cat.png" alt="" width={50} />
            <p className="m-0">Furry Friend Keeper</p>
          </div> */}
          {/* Furry Friend Keeper */}
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
            {/* <li><Link className="dropdown-item" to="/at3">Home</Link></li> */}
            {/* <li><Link className="dropdown-item" to="/at3/about-us">About</Link></li> */}
            {/* <li><Link className="dropdown-item" to="#">Contact</Link></li> */}
            {!isLogin && <li><a className="dropdown-item" href="/at3/login">Login</a></li>}
            {!isLogin && <li><a className="dropdown-item" href="/at3/signup">Sign up</a></li>}

          </ul>
          {isLogin && 
          <Tooltip title="Open settings" className="ms-3 navbar-toggler">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="" />
              </IconButton>
            </Tooltip>
            }
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
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography onClick={() => dispatch(logout())} textAlign="center" ><a className="text-black" href="/at3" >Logout</a></Typography>
                  </MenuItem>
              </Menu>
        </div>
        <div className="nav-page collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav align-items-center">
            {/* <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/at3">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/at3/about-us">
                About
              </Link>
            </li> */}
            {/* <li className="nav-item">
              <Link className="nav-link" to="#">
                Contact
              </Link>
            </li> */}
            {!isLogin &&
            <li className="nav-item">
              <Link className="nav-link" to="/at3/login">
                Login
              </Link>
            </li>
            }
            {!isLogin &&
            <li className="nav-item">
              <Link className="btn btn-primary" to="/at3/signup">
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
                   {getRole === "PetKeeper" && <MenuItem onClick={handleCloseUserMenu}>
                      <Typography textAlign="center" ><Link className="text-black" to={"/at3/keeper-edit/"+ getId}>My Shop</Link></Typography>
                    </MenuItem>}
                   <MenuItem onClick={handleCloseUserMenu}>
                      <Typography onClick={() => dispatch(logout())} textAlign="center" ><a className="text-black" href="/at3" >Logout</a></Typography>
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
