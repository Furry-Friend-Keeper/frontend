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
import NotificationsIcon from '@mui/icons-material/Notifications';
import axiosAuth from "../components/Global/AxiosService"
import moment from "moment/moment";
import $ from 'jquery';

function Navbar() {
  const customWidth = import.meta.env.VITE_CUSTOM_WIDTH;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [notiMessage, setNotiMessage] = useState([])
  const [notiRealtimeMessage, setNotiRealtimeMessage] = useState([])
  const [notiRealtimeMessageSort, setNotiRealtimeMessageSort] = useState([])
  const [notificationCount, setNotificationCount] = useState(0);
  const isLogin = useSelector((state) => state?.auth?.accessToken);
  const test = useSelector((state) => state);
  const getRole = useSelector((state) => state?.auth?.userInfo.role);
  const getId = useSelector((state) => state?.auth?.userInfo.id);
  const getName = useSelector((state) => state?.auth?.userInfo.name) || "";
  const getUserId = useSelector((state) => state?.auth?.userInfo.userId) || "";

  const [loading, setLoading] = useState(true)
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const handleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

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
        // console.log(response.data)
        const data = response.data
        const sortData = data.sort((a, b) => b.date - a.date)
        setLoading(false)
        const filterDate = data.filter(item => item.readStatus === 0)
        setNotificationCount(filterDate.length)
        setNotiMessage(sortData)
      }).catch((error) => {
        console.log(error.message)
      })
  }

  const handleNoti = async (notiId) => {

    const getURL = getRole === "Owner" ? import.meta.env.VITE_NOTIFICATION_OWNER_READ + notiId : import.meta.env.VITE_NOTIFICATION_KEEPER_READ + notiId
    await axiosAuth.patch(getURL,{}).then(() => {
      const updateFunc = (item) => item.id === notiId ? { ...item, readStatus: 1 } : item;
      if(notiRealtimeMessage.length > 0) {
        const update = notiRealtimeMessage.map(updateFunc);
        setNotiRealtimeMessage(update)
      }
      const updateNoti = notiMessage.map(updateFunc);
      setNotiMessage(updateNoti)
      setNotificationCount((prev) => prev - 1)

      if (getRole === "Owner") {
        navigate(`/at3/owner/${getId}#take-care`, { replace: true });
      } else {
        navigate(`/at3/keeper-edit/${getId}#requestAll`, { replace: true });
      }
    })
  }

  useEffect(() => {
    if(isLogin){
      getNotification()
    }
  }, [isLogin])

    const getTagClassName = (status) => {
      switch (status) {
        case 'Pending':
          return 'tag-pending';
        case 'Scheduled':
          return 'tag-scheduled';
        case 'In Care':
          return 'tag-in-care';
        case 'Completed':
          return 'tag-completed';
        case 'Cancelled':
          return 'tag-cancelled';
        default:
          return '';
      }
    }

  useEffect(() => {
    dispatch(resetStore());
  }, [location, dispatch]);

  useEffect(() => {
    if (getUserId) {
      const socket = new SockJS(
        `https://capstone23.sit.kmutt.ac.th/at3-socket/api/web-s?userId=${getUserId}`
      );
      const client = Stomp.over(socket);
      client.connect(
        {},
        () => {
          client.subscribe(
            "/user/topic/private-notifications",
            function (message) {
              // console.log(JSON.parse(message.body))
              if(message.body){
                // if(notiMessage.length > 0){
                  setNotificationCount((prevCount) => prevCount + 1);
                  const new_message = JSON.parse(message.body)
                  console.log(new_message)
                  setNotiRealtimeMessage((prev) => [...prev, new_message])
                // }
              }
            }
          );
        }

        // , function(error) {
        //     console.error('Connection failed: ' + error);
        //     // Handle connection failure here
        // }
      );
    }
  }, []);

  useEffect(() => {
    const sortnoti = notiRealtimeMessage.sort((a,b) => moment(b.date) - moment(a.date))
    setNotiRealtimeMessageSort(sortnoti)
  }, [notiRealtimeMessage])


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
          {loading && 
            <Placeholder.Paragraph />
          }
          <List hover>
            {notiRealtimeMessageSort.length > 0 && notiRealtimeMessageSort.map((message, index) => (
              <List.Item key={"realtine" + index}  onClick={() => handleNoti(message.id)} >
            <div className="noti-drawer-body">
              <div className="drawer-tag">
              <Tag className={getTagClassName(message.status)}>{message.status}</Tag>
              {message.readStatus === 0 && <Badge className="badge-drawer" /> }
              </div>
              <div className="noti-drawer-content">
                  <div className="noti-drawer-message">
                    {message.message}
                  </div>
                  <div className="noti-drawer-time">
                    <small>{moment(message.date).format('DD/MM/YYYY HH:mm ')}</small>
                  </div>
              </div>
            </div>
            </List.Item>
           ))}
          {notiMessage.length > 0 && notiMessage.map((message, index) => (
             <List.Item key={index} onClick={() => handleNoti(message.id)}>
                <div className="noti-drawer-body">
                  <div className="drawer-tag">
                    <Tag className={getTagClassName(message.status)}>{message.status}</Tag>
                    {message.readStatus === 0 && <Badge className="badge-drawer" /> }
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
          </List>
        </Drawer.Body>
      </Drawer>
      <Outlet />
    </>
  );
}

export default Navbar;
