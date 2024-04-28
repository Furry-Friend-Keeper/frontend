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
import { IconButton, Badge, Drawer, Placeholder, Button, Tag, List } from "rsuite";
import Stomp from "stompjs";
import NoticeIcon from "@rsuite/icons/Notice";
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Mail } from "@mui/icons-material";
import axiosAuth from "../components/Global/AxiosService"
import moment from "moment/moment";

function Navbar() {
  const customWidth = import.meta.env.VITE_CUSTOM_WIDTH;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [notiMessage, setNotiMessage] = useState([])
  const isLogin = useSelector((state) => state.auth.accessToken);
  const getRole = useSelector((state) => state.auth.userInfo.role);
  const getId = useSelector((state) => state.auth.userInfo.id);
  const getName = useSelector((state) => state.auth.userInfo.name) || "";
  const getUserId = useSelector((state) => state.auth.userInfo.userId) || "";
  // const getSessionExpire = useSelector((state) => state.auth.error);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const handleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
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
      navigate("/at3/");
      dispatch(findSearch(searchInput));
      setSearchInput("");
    }
  };

  const getNotification = async () => {
      let notiURL = getRole === "Owner" ? import.meta.env.VITE_NOTIFICATION_OWNER_ALL : import.meta.env.VITE_NOTIFICATION_KEEPER_ALL
      await axiosAuth.get(notiURL + getId).then(response => {
        console.log(response.data)
        setNotiMessage(response.data)
      }).catch((error) => {
        console.log(error.message)
      })
  }

  useEffect(() => {
    if(isLogin){
      getNotification()
    }
  }, [isLogin])

    const getTagClassName = (status) => {
      switch (status) {
        case 1:
          return 'tag-pending';
        case 2:
          return 'tag-scheduled';
        case 3:
          return 'tag-cancelled';
        case 4:
          return 'tag-in-care';
        case 5:
          return 'tag-completed';
        case 6:
          return 'tag-completed';
        default:
          return '';
      }
    }
    const getTagStatusName = (status) => {
      switch (status) {
        case 1:
          return 'Pending';
        case 2:
          return 'Scheduled';
        case 3:
          return 'Cancelled';
        case 4:
          return 'In Care';
        case 5:
          return 'Keeper Completed';
        case 6:
          return 'Completed'
        default:
          return '';
      }
    }
    // const getTagClassName = (status) => {
    //   switch (status) {
    //     case 'Pending':
    //       return 'tag-pending';
    //     case 'Scheduled':
    //       return 'tag-scheduled';
    //     case 'In Care':
    //       return 'tag-in-care';
    //     case 'Completed':
    //       return 'tag-completed';
    //     case 'Cancelled':
    //       return 'tag-cancelled';
    //     default:
    //       return '';
    //   }
    // }

  useEffect(() => {
    dispatch(resetStore());
  }, [location, dispatch]);

  // useEffect(() => {
  //   console.log(getSessionExpire)
  //   if(getSessionExpire){
  //     toaster.push(message, { placement: "topCenter", duration: 5000 });
  //   }
  // },[getSessionExpire])
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    if (isLogin) {
      const socket = new SockJS(
        `https://capstone23.sit.kmutt.ac.th/at3-socket/api/web-s?userId=${getUserId}`
      );
      const client = Stomp.over(socket);
      client.connect(
        {},
        () => {
          client.subscribe("/topic/global-notifications", function (message) {
            setNotificationCount((prevCount) => prevCount + 1);
            console.log(JSON.parse(message.body).content);
            // updateNotificationDisplay();
          });

          client.subscribe(
            "/user/topic/private-notifications",
            function (message) {
              setNotificationCount((prevCount) => prevCount + 1);
              console.log(JSON.parse(message.body).content);
              // updateNotificationDisplay();
              // showMessage(JSON.parse(message.body).content);
            }
          );
        }

        // , function(error) {
        //     console.error('Connection failed: ' + error);
        //     // Handle connection failure here
        // }
      );
    }
  }, [isLogin]);


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
      {isLogin &&
      <div className="noti-drawer" onClick={() => setOpen(true)}>
        <Badge className="noti-count"  content={notificationCount == 0 ? false : notificationCount}>
          <NotificationsIcon className="fs-5" />
        </Badge>
        <span className="noti-content">Notifaications</span>
      </div>
      }
      <Drawer open={open} onClose={() => setOpen(false)}>
        <Drawer.Header>
          <Drawer.Title>Notification</Drawer.Title>
        </Drawer.Header>
        <Drawer.Body>
          {/* <Placeholder.Paragraph /> */}
          <List hover>
          {notiMessage.length > 0 && notiMessage.map((message, index) => (
             <List.Item key={index}>
             <div className="noti-drawer-body">
               <div className="drawer-tag">
                   <Tag className={getTagClassName(message.statusId.id)}>{getTagStatusName(message.statusId.id)}</Tag>
               </div>
               <div className="noti-drawer-content">
                   {/* <h5>Mr.Beast</h5> */}
                   <div className="noti-drawer-message">
                    {message.message}
                   </div>
                   <div className="noti-drawer-time">
                     <small>{moment.unix(message.date).format('DD/MM/YYYY HH:mm ')}</small>
                   </div>
               </div>
             </div>
             </List.Item>
          ))}
            {/* <List.Item>
            <div className="noti-drawer-body">
              <div className="drawer-tag">
                  <Tag className={getTagClassName("Pending")}>Pending</Tag>
              </div>
              <div className="noti-drawer-content">
                  <h5>Mr.Beast</h5>
                  <div className="noti-drawer-message">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor in minus laboriosam repudiandae ipsa debitis, eius dolorum necessitatibus quod consectetur maxime quibusdam culpa eum ut architecto tenetur? Qui, ex. Id!
                  </div>
                  <div className="noti-drawer-time">
                    <small>{moment().format('DD/MM/YYYY HH:mm ')}</small>
                  </div>
              </div>
            </div>
            </List.Item>
            <List.Item>
            <div className="noti-drawer-body">
              <div className="drawer-tag">
                  <Tag className={getTagClassName("Scheduled")}>Scheduled</Tag>
              </div>
              <div className="noti-drawer-content">
                  <h5>Mr.Beast</h5>
                  <div className="noti-drawer-message">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor in minus laboriosam repudiandae ipsa debitis, eius dolorum necessitatibus quod consectetur maxime quibusdam culpa eum ut architecto tenetur? Qui, ex. Id!
                  </div>
                  <div className="noti-drawer-time">
                    <small>{moment().format('DD/MM/YYYY HH:mm ')}</small>
                  </div>
              </div>
            </div>
            </List.Item>
            <List.Item>
            <div className="noti-drawer-body">
              <div className="drawer-tag">
                  <Tag className={getTagClassName("In Care")}>In Care</Tag>
              </div>
              <div className="noti-drawer-content">
                  <h5>Mr.Beast</h5>
                  <div className="noti-drawer-message">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor in minus laboriosam repudiandae ipsa debitis, eius dolorum necessitatibus quod consectetur maxime quibusdam culpa eum ut architecto tenetur? Qui, ex. Id!
                  </div>
                  <div className="noti-drawer-time">
                    <small>{moment().format('DD/MM/YYYY HH:mm ')}</small>
                  </div>
              </div>
            </div>
            </List.Item>
            <List.Item>
            <div className="noti-drawer-body">
              <div className="drawer-tag">
                  <Tag className={getTagClassName("Completed")}>Completed</Tag>
              </div>
              <div className="noti-drawer-content">
                  <h5>Mr.Beast</h5>
                  <div className="noti-drawer-message">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor in minus laboriosam repudiandae ipsa debitis, eius dolorum necessitatibus quod consectetur maxime quibusdam culpa eum ut architecto tenetur? Qui, ex. Id!
                  </div>
                  <div className="noti-drawer-time">
                    <small>{moment().format('DD/MM/YYYY HH:mm ')}</small>
                  </div>
              </div>
            </div>
            </List.Item>
            <List.Item>
            <div className="noti-drawer-body">
              <div className="drawer-tag">
                  <Tag className={getTagClassName("Cancelled")}>Cancelled</Tag>
              </div>
              <div className="noti-drawer-content">
                  <h5>Mr.Beast</h5>
                  <div className="noti-drawer-message">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor in minus laboriosam repudiandae ipsa debitis, eius dolorum necessitatibus quod consectetur maxime quibusdam culpa eum ut architecto tenetur? Qui, ex. Id!
                  </div>
                  <div className="noti-drawer-time">
                    <small>{moment().format('DD/MM/YYYY HH:mm ')}</small>
                  </div>
              </div>
            </div>
            </List.Item> */}
          </List>
        </Drawer.Body>
      </Drawer>
      <Outlet />
    </>
  );
}

export default Navbar;
