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
import LoginIcon from "@mui/icons-material/Login";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Container } from "@mui/material";
import {
  Button,
  AvatarGroup,
  Avatar,
  Dropdown,
  Popover,
  Whisper,
  ButtonToolbar,
} from "rsuite";

function Navbar() {
  const settings = ["Profile", "Logout"];
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const isLogin = useSelector((state) => state.auth.accessToken);
  const getRole = useSelector((state) => state.auth.userInfo.role);
  const getId = useSelector((state) => state.auth.userInfo.id);
  const getName = useSelector((state) => state.auth.userInfo.name) || "";
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

  const renderToggle = (props) => (
    <Button
      {...props}
      appearance="subtle"
      // onClick={handleOpenUserMenu}
      sx={{ p: 0 }}
    >
      <Avatar
        circle
        src="https://avatars.githubusercontent.com/u/8225666"
        alt="@SevenOutman"
      />
      {/* <span className="person-navbar">{getName.charAt(0).toUpperCase() + getName.slice(1)}</span> */}
      <KeyboardArrowDownIcon />
    </Button>
  );

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
                isDropdownOpen
                  ? "profile-menu dropdown-menu show"
                  : "profile-menu dropdown-menu"
              }
              aria-labelledby="dropdownMenuButton"
            >
              <li style={{ padding: 10, width: 160 }}>
                <p>Signed in as</p>
                <strong>
                  {getName?.charAt(0)?.toUpperCase() + getName?.slice(1)}
                </strong>
              </li>
              <li className=" border-1 border my-2"></li>
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
              ) : (
                isLogin &&
                getRole === "Owner" && (
                  <li>
                    <a className="dropdown-item" href={`/at3/owner/${getId}`}>
                      <PersonIcon className="profile-icon" />
                      View profile
                    </a>
                  </li>
                )
              )}
              {!isLogin && (
                <li>
                  <a className="dropdown-item" href="/at3/login">
                    Login
                  </a>
                </li>
              )}
              {/* <br /> */}
              <li className=" border-1 border my-2"></li>
              {isLogin && (
                <li onClick={() => dispatch(logout())}>
                  <a className="dropdown-item" href="/at3">
                    <LogoutIcon className="profile-icon" />
                    Logout
                  </a>
                </li>
              )}
              {!isLogin && (
                <li>
                  <a className="dropdown-item" href="/at3/signup">
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
                  <Dropdown renderToggle={renderToggle} placement="bottomEnd">
                    <Dropdown.Item panel style={{ padding: 10, width: 160 }}>
                      <p>Signed in as</p>
                      <strong>
                        {getName.charAt(0).toUpperCase() + getName.slice(1)}
                      </strong>
                    </Dropdown.Item>
                    <Dropdown.Separator />
                    {getRole === "PetKeeper" ? (
                      <Dropdown.Item>
                        <StoreOutlinedIcon className="profile-icon" />
                        <Link
                          className="text-black"
                          to={"/at3/keeper-edit/" + getId}
                        >
                          My Shop
                        </Link>
                      </Dropdown.Item>
                    ) : (
                      <Dropdown.Item>
                        <PersonIcon className="profile-icon" />
                        <Link className="text-black" to={`/at3/owner/${getId}`}>
                          View profile
                        </Link>
                      </Dropdown.Item>
                    )}
                    <Dropdown.Separator />
                    <Dropdown.Item>
                      <LogoutIcon className="profile-icon" />
                      <span onClick={() => dispatch(logout())}>
                        <a className="text-black" href="/at3">
                          Logout
                        </a>
                      </span>
                    </Dropdown.Item>
                  </Dropdown>
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
