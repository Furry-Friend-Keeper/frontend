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
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/AuthSlice";

function NavbarContent({ notification }) {
    const getRole = useSelector((state) => state.auth.userInfo.role);
    const getId = useSelector((state) => state.auth.userInfo.id);
    const getName = useSelector((state) => state.auth.userInfo.name) || "";
    const getImage = useSelector((state) => state.auth.userInfo.img) || "";
    const dispatch = useDispatch();

    const imageURL = getImage ? getRole === "Owner" ? import.meta.env.VITE_OWNER_IMAGE + getId + "/" + getImage : import.meta.env.VITE_KEEPER_IMAGE + getId + "/" + getImage : null
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
              <Button appearance="default">More notification</Button>
            </div>
          </Popover>
        );
      };

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
    <Whisper preventOverflow placement="bottomEnd" trigger="click" speaker={renderMenu}>
        <IconButton appearance="subtle" size="lg" className="noti-icon" icon={<Badge content={notification == 0 ? false : notification}><NoticeIcon /></Badge>} />
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
  )
}

export default NavbarContent