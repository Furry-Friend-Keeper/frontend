import React from 'react'
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
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import StoreOutlinedIcon from "@mui/icons-material/StoreOutlined";
import { Link, NavLink  } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/AuthSlice";

function NavbarContent({ notification }) {
    const getRole = useSelector((state) => state.auth.userInfo.role);
    const getId = useSelector((state) => state.auth.userInfo.id);
    const getName = useSelector((state) => state.auth.userInfo.name) || "";
    const getImage = useSelector((state) => state.auth.userInfo.img) || "";
    const dispatch = useDispatch();

    const newLink = (props) => { 
      const { 
          href, children, ...rest 
      } = props; 
      return ( 
          <Link to={href} {...rest}> 
                  {children} 
          </Link> 
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
                  <Dropdown.Item as={newLink} href={"/at3/keeper-edit/" + getId}>
                    <StoreOutlinedIcon className="profile-icon" />
                    <span
                      className="text-black"
                    >
                      My Shop
                    </span>
                  </Dropdown.Item>
                ) : (
                  <Dropdown.Item as={newLink} href={`/at3/owner/${getId}`}>
                    <PersonIcon className="profile-icon" />
                    <span className="text-black">
                      View profile
                    </span>
                  </Dropdown.Item>
                )}
                <Dropdown.Separator />
                <Dropdown.Item onClick={() => dispatch(logout())}>
                  <LogoutIcon className="profile-icon" />
                  <span>
                    <a className="text-black" href="/at3/login">
                      Logout
                    </a>
                  </span>
                </Dropdown.Item>
            </Dropdown.Menu>
          </Popover>
        );
      };
  return (
    <Stack spacing={8} >
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
  )
}

export default NavbarContent