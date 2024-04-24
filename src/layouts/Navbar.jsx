import React, { useState, useEffect } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { logout, resetStore } from "../store/AuthSlice";
import PersonIcon from "@mui/icons-material/Person";
import StoreOutlinedIcon from "@mui/icons-material/StoreOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
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
  Stack,
  IconButton,
  Badge,
  List
} from "rsuite";
import UserIcon from '@rsuite/icons/legacy/User';
import NoticeIcon from '@rsuite/icons/Notice';

function Navbar() {
  const customWidth = import.meta.env.VITE_CUSTOM_WIDTH
  const settings = ["Profile", "Logout"];
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const isLogin = useSelector((state) => state.auth.accessToken);
  const getRole = useSelector((state) => state.auth.userInfo.role);
  const getId = useSelector((state) => state.auth.userInfo.id);
  const getName = useSelector((state) => state.auth.userInfo.name) || "";
  const getImage = useSelector((state) => state.auth.userInfo.img) || "";
  const location = useLocation();
  // const [ownerData, setOwnerData] = useState({})

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetStore());
  }, [location]);

  const renderMenu = ({ onClose, left, top, className }, ref) => {
    const handleSelect = eventKey => {
      onClose();
      console.log(eventKey);
    };
    return (
      <Popover ref={ref} className={className} style={{ left, top }} title="Last updates" >
        <List size="md" style={{ width: 300 }}>
          <List.Item>
            <Stack spacing={4} alignItems="center">
              <Stack.Item><Badge /></Stack.Item>
              <Stack.Item></Stack.Item>
              <Stack.Item> <span>7 hours ago</span></Stack.Item>
            </Stack>
              <p className="">The charts of the dashboard have been fully upgraded and are more visually pleasing.</p>
          </List.Item>
          <List.Item>
            <Stack spacing={4} alignItems="center">
              <Stack.Item><Badge /></Stack.Item>
              <Stack.Item></Stack.Item>
              <Stack.Item> <span>7 hours ago</span></Stack.Item>
            </Stack>
              <p className="">The charts of the dashboard have been fully upgraded and are more visually pleasing.</p>
          </List.Item>
          <List.Item>
            <Stack spacing={4} alignItems="center">
              <Stack.Item><Badge /></Stack.Item>
              <Stack.Item></Stack.Item>
              <Stack.Item> <span>7 hours ago</span></Stack.Item>
            </Stack>
              <p className="">The charts of the dashboard have been fully upgraded and are more visually pleasing.</p>
          </List.Item>
          <List.Item>
            <Stack spacing={4} alignItems="center">
              <Stack.Item><Badge /></Stack.Item>
              <Stack.Item></Stack.Item>
              <Stack.Item> <span>7 hours ago</span></Stack.Item>
            </Stack>
              <p className="">The charts of the dashboard have been fully upgraded and are more visually pleasing.</p>
          </List.Item>
        </List>
        <div className="text-center mt-4">
          <Button appearance="default ">
            <Link to={"/at3/owner/" + getId}>
            Go to profile</Link></Button>
        </div>
      </Popover>
    );
  };
  const imageURL = getImage ? getRole === "Owner" ? import.meta.env.VITE_OWNER_IMAGE + getId + "/" + getImage : import.meta.env.VITE_KEEPER_IMAGE + getId + "/" + getImage : null

  const renderToggle = ({ onClose, left, top, className }, ref) => {
    const handleSelect = eventKey => {
      onClose();
      console.log(eventKey);
    };
    return (
      <Popover ref={ref} className={className} style={{ left, top }} full>
        <Dropdown.Menu onSelect={handleSelect}>
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
            <Dropdown.Item onClick={() => dispatch(logout())}>
              <LogoutIcon className="profile-icon" />
              <span>
                <a className="text-black" href="/at3">
                  Logout
                </a>
              </span>
            </Dropdown.Item>
        </Dropdown.Menu>
      </Popover>
    );
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <Container maxWidth={customWidth}>
          <Link className="navbar-brand navbar-head" to="/at3">
            <div className="d-flex align-items-center">
              <div>
                <img
                  className="me-3 object-fit-contain logo-default"
                  src="./assets/logo.png"
                  // src="https://i.imgur.com/ids0WFZ.png"
                  alt=""
                  // width={450}
                  width={100}
                />
                <img
                  className="me-3 object-fit-contain logo-responsive"
                  src="./assets/logo+sub.png"
                  // src="https://i.imgur.com/ids0WFZ.png"
                  alt=""
                  width={450}
                  // width={50}
                />
              </div>
            </div>
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
                  <Stack spacing={8} >
                  <Whisper preventOverflow placement="bottomEnd" trigger="click" speaker={renderMenu}>
                    <IconButton appearance="subtle" size="lg" className="noti-icon" icon={<NoticeIcon />} />
                  </Whisper>
                  <Whisper preventOverflow placement="bottomEnd" trigger="click" speaker={renderToggle}>
                    <Button
                      appearance="subtle"
                      size="md"
                      sx={{ p: 0 }}
                    >
                      <Avatar
                        className="avatar-navbar"
                        bordered
                        circle
                        size="md"
                        src={imageURL}
                        alt={getName}
                      >
                        {!imageURL && <UserIcon />}
                      </Avatar>
                      <KeyboardArrowDownIcon />
                    </Button>
                  </Whisper>
                  </Stack>
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
