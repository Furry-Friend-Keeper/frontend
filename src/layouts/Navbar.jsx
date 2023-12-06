import React,{ useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

function Navbar() {
  const settings = ['Profile', 'Logout'];
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
        <a className="navbar-brand navbar-head fw-bold text-uppercase" href="/">
          Furry Friend Keeper
        </a>
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
            <li><a className="dropdown-item" href="/">Home</a></li>
            <li><a className="dropdown-item" href="#">About</a></li>
            <li><a className="dropdown-item" href="#">Contact</a></li>
            <li><a className="dropdown-item" href="/login">Login</a></li>
            <li><a className="dropdown-item" href="/signup">Sign up</a></li>
          </ul>
        </div>
        <div className="nav-page collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav align-items-center">
            <li className="nav-item">
              <a className="nav-link" aria-current="page" href="/">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                About
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Contact
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/login">
                Login
              </a>
            </li>
            <li className="nav-item">
              <a className="btn fw-semibold btn-primary" href="/signup">
                Sign up
              </a>
            </li>
            {/* <li className="nav-item">
              <a className="nav-link" href="/owner">
                <AccountCircleIcon fontSize='large' />
              </a>
            </li> */}
            <li  className="nav-item ">

              <Tooltip title="Open settings" className="ms-3">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center" ><Link to={setting === "Profile" ? "owner" : "logout"}>{setting}</Link></Typography>
                  </MenuItem>
                ))}
              </Menu>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <Outlet />
    </>
  )
}

export default Navbar
