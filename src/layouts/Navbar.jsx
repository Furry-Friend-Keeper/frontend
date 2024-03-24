import React, { useState, useEffect } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { useSelector, useDispatch } from "react-redux";
import { logout, resetStore } from "../store/AuthSlice";
import PersonIcon from "@mui/icons-material/Person";
import StoreOutlinedIcon from "@mui/icons-material/StoreOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from '@mui/icons-material/Login';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Container } from "@mui/material";

function Navbar() {
  const settings = ["Profile", "Logout"];
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const isLogin = useSelector((state) => state.auth.accessToken);
  const getRole = useSelector((state) => state.auth.userInfo.role);
  const getId = useSelector((state) => state.auth.userInfo.id);
  const location = useLocation();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetStore());
  }, [location]);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg">
          <Container maxWidth="lg">
          <Link className="navbar-brand navbar-head" to="/at3">
            <div className="d-flex align-items-center">
              <img
                className="me-3 object-fit-contain"
                src="https://i.imgur.com/ids0WFZ.png"
                alt=""
                width={50}
              />
              <div className="logo-content">
                <div className="m-0">Furry Friend</div>
                <div className="m-0">Keeper</div>
              </div>
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
            <ul
              className={
                isDropdownOpen ? "dropdown-menu show" : "dropdown-menu"
              }
              aria-labelledby="dropdownMenuButton"
            >
              {isLogin && getRole === "PetKeeper" ? (
                <li>
                  <a
                    className="dropdown-item"
                    href={`/at3/keeper-edit/${getId}`}
                  >
                    <StoreOutlinedIcon className="profile-icon" />
                    My Shop
                  </a>
                </li>
              ): 
              isLogin && getRole === "Owner" && 
                <li>
                  <a
                    className="dropdown-item"
                    href={`/at3/owner/${getId}`}
                  >
                    <PersonIcon className="profile-icon" />
                    View profile
                  </a>
                </li>
              }
              {!isLogin && (
                <li>
                  <a className="dropdown-item" href="/at3/login">
                    <LoginIcon className="profile-icon" />
                    Login
                  </a>
                </li>
              )}
              <br />
              {isLogin && (
                <li onClick={() => dispatch(logout())}>
                  <a className="dropdown-item border-1 border-top" href="/at3">
                    <LogoutIcon className="profile-icon" />
                    Logout
                  </a>
                </li>
              )}
              {!isLogin && (
                <li>
                  <a className="dropdown-item border-1 border-top" href="/at3/signup">
                    <SubscriptionsIcon className="profile-icon"  />
                    Sign up
                  </a>
                </li>
              )}
            </ul>
          </div>
          <div className="nav-page collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav align-items-center">
              {!isLogin && (
                <li className="nav-item">
                  <Link className="nav-link" to="/at3/login">
                    Login
                  </Link>
                </li>
              )}
              {!isLogin && (
                <li className="nav-item">
                  <Link className="btn btn-primary" to="/at3/signup">
                    Sign up
                  </Link>
                </li>
              )}
              {isLogin && (
                <li className="nav-item ">
                  <Tooltip title="Open settings" className="ms-3">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <PersonIcon className="person-icon" />
                      <KeyboardArrowDownIcon />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    {getRole === "PetKeeper" ? (
                      <MenuItem onClick={handleCloseUserMenu}>
                        <StoreOutlinedIcon className="profile-icon" />
                        <Typography textAlign="left">
                          <Link
                            className="text-black"
                            to={"/at3/keeper-edit/" + getId}
                          >
                            My Shop
                          </Link>
                        </Typography>
                      </MenuItem>
                    ) : (
                      <MenuItem onClick={handleCloseUserMenu}>
                        <PersonIcon className="profile-icon" />
                        <Typography textAlign="left">
                          <Link
                            className="text-black"
                            to={`/at3/owner/${getId}`}
                          >
                            View profile
                          </Link>
                        </Typography>
                      </MenuItem>
                    )}
                    <br />
                    <MenuItem
                      onClick={handleCloseUserMenu}
                      className="border-1 border-top"
                    >
                      <LogoutIcon className="profile-icon" />
                      <Typography
                        onClick={() => dispatch(logout())}
                        textAlign="left"
                      >
                        <a className="text-black" href="/at3">
                          Logout
                        </a>
                      </Typography>
                    </MenuItem>
                  </Menu>
                </li>
              )}
            </ul>
          </div>
          </Container>
      </nav>
      <Outlet />
    </>
  );
}

export default Navbar;
