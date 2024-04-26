import React, { useState, useEffect } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, resetStore } from "../store/AuthSlice";
import { findSearch } from "../store/SearchSlice";
import { Container } from "@mui/material";
import NavbarContent from "./NavbarContent";
import HamburgerBar from "./HamburgerBar";
import { Input, InputGroup } from "rsuite";
import SearchIcon from "@rsuite/icons/Search";
import CloseIcon from "@rsuite/icons/Close";
import { Notification, useToaster, ButtonToolbar, SelectPicker, Button } from 'rsuite';
import Stomp from 'stompjs';
import { Mail } from "@mui/icons-material";

function Navbar() {
  const customWidth = import.meta.env.VITE_CUSTOM_WIDTH;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const isLogin = useSelector((state) => state.auth.accessToken);
  const getRole = useSelector((state) => state.auth.userInfo.role);
  const getId = useSelector((state) => state.auth.userInfo.id);
  const getName = useSelector((state) => state.auth.userInfo.name) || "";
  const getUserId = useSelector((state) => state.auth.userInfo.userId) || "";
  // const getSessionExpire = useSelector((state) => state.auth.error);
  const navigate = useNavigate()
  const location = useLocation();
  // const [ownerData, setOwnerData] = useState({})
  const handleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const dispatch = useDispatch();
  // const toaster = useToaster()
  // const message = (
  //   <Notification type="warning" header="Warning!" closable>
  //     <p>Authentication Failed. Your session token has expired.</p>
  //     <hr />
  //     <ButtonToolbar>
  //       <Button onClick={() => store.dispatch(logout())} appearance="primary">Login</Button>
  //       {/* <Button appearance="default">Close</Button> */}
  //     </ButtonToolbar>
  //   </Notification>
  // );
  const [searchInput, setSearchInput] = useState("");
  const [expanded, setExpanded] = useState(false);

  const handleExpandSearch = () => {
    setExpanded(!expanded);
  };

  const handleSearchInput = (value) => {
    setSearchInput(value);
  };

  const handleClearSearch = () => {
    setSearchInput("");
  };

  const handleSearch = (event) => {
    if (event.key === "Enter") {
      navigate("/at3/")
      dispatch(findSearch(searchInput));
      setSearchInput("");
    }
  };

  useEffect(() => {
    dispatch(resetStore());
  }, [location]);

  // useEffect(() => {
  //   console.log(getSessionExpire)
  //   if(getSessionExpire){
  //     toaster.push(message, { placement: "topCenter", duration: 5000 });
  //   }
  // },[getSessionExpire])
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    if(isLogin) {
      var socket = new SockJS(`https://capstone23.sit.kmutt.ac.th/at3-socket/api/web-s?userId=${getUserId}`);
      const client = Stomp.over(socket);
      client.connect({}, () => {
        client.subscribe('/topic/global-notifications', function (message) {
          setNotificationCount(prevCount => prevCount + 1);
          console.log(JSON.parse(message.body).content)
          // updateNotificationDisplay();
        });

        client.subscribe('/user/topic/private-notifications', function (message) {
          setNotificationCount(prevCount => prevCount + 1);
          console.log(JSON.parse(message.body).content)
          // updateNotificationDisplay();
          // showMessage(JSON.parse(message.body).content);
        });
      }
      
        // , function(error) {
        //     console.error('Connection failed: ' + error);
        //     // Handle connection failure here
        // }
      );
    }
  }, [isLogin])


  useEffect(() => {
    console.log(notificationCount)
  }, [notificationCount])

  const connect = () => {
    console.log("test");
    var socket = new SockJS(
      "https://capstone23.sit.kmutt.ac.th/at3-socket/api/web-s"
    );
    const client = Stomp.over(socket);
    client.connect({}, () => {
      console.log("test1")
      // console.log('Connected: ' + frame);
      // updateNotificationDisplay();
      // client.subscribe('/topic/messages', function (message) {
      //   console.log(JSON.parse(message.body).content)
      //     // showMessage(JSON.parse(message.body).content);
      // });

      // client.subscribe('/user/topic/private-messages', function (message) {
      //   console.log(JSON.parse(message.body).content)
      //     // showMessage(JSON.parse(message.body).content);
      // });

      client.subscribe('/topic/global-notifications', function (message) {
        setNotificationCount(prevCount => prevCount + 1);
        console.log(JSON.parse(message.body).content)
        // updateNotificationDisplay();
      });

      client.subscribe('/user/topic/private-notifications', function (message) {
        setNotificationCount(prevCount => prevCount + 1);
        console.log(JSON.parse(message.body).content)
        // updateNotificationDisplay();
        // showMessage(JSON.parse(message.body).content);
      });
    }
      // , function(error) {
      //     console.error('Connection failed: ' + error);
      //     // Handle connection failure here
      // }
    );
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
                  src={`${import.meta.env.VITE_PROJECT_URL}logo.png`}
                  // src="https://i.imgur.com/ids0WFZ.png"
                  alt=""
                  // width={450}
                  width={100}
                />
                <img
                  className="me-3 object-fit-contain logo-responsive"
                  src={`${import.meta.env.VITE_PROJECT_URL}logo+sub.png`}
                  // src="https://i.imgur.com/ids0WFZ.png"
                  alt=""
                  width={450}
                // width={50}
                />
              </div>
            </div>
          </Link>
          <div className="d-flex align-content-center">
            <InputGroup inside className="search-keeper">
              <InputGroup.Addon>
                <SearchIcon />
              </InputGroup.Addon>
              <Input
                placeholder="Search by name"
                value={searchInput}
                onChange={handleSearchInput}
                onKeyUp={handleSearch}
              />
              {searchInput && (
                <InputGroup.Button
                  onClick={handleClearSearch}
                  className="my-auto"
                >
                  <CloseIcon />
                </InputGroup.Button>
              )}
            </InputGroup>

            <InputGroup
              className="me-2 search-responsive"
              inside
              style={{
                width: expanded ? "300px" : "40px",
                transition: "width 0.3s ease",
              }}
            >
              <Input
                value={searchInput}
                onChange={handleSearchInput}
                onKeyUp={handleSearch}
                placeholder="Search..."
                style={{
                  visibility: expanded ? "visible" : "hidden",
                  padding: expanded ? "7px 11px" : 0,
                }}
              />
              <InputGroup.Button
                appearance="subtle"
                onClick={handleExpandSearch}
                className="h-100"
              >
                {expanded ? <CloseIcon /> : <SearchIcon />}
              </InputGroup.Button>
            </InputGroup>

            <HamburgerBar
              handleDropdown={handleDropdown}
              isDropdownOpen={isDropdownOpen}
              getName={getName}
              isLogin={isLogin}
              getRole={getRole}
              getId={getId}
            />
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
                    <NavbarContent notification={notificationCount} />
                  </li>
                )}
              </ul>
            </div>
          </div>
        </Container>
      </nav>
      <Outlet />
    </>
  );
}

export default Navbar;
