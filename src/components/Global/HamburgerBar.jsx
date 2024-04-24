import React from "react";
import StoreOutlinedIcon from "@mui/icons-material/StoreOutlined";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch } from "react-redux";
import { logout } from "../../store/AuthSlice";

function HamburgerBar(props) {
  const { handleDropdown, isDropdownOpen, getName, isLogin, getRole, getId } =props;
  const dispatch = useDispatch();

  return (
    <div className="dropdown">
      <button
        id="dropdownMenuButton"
        className="navbar-toggler"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="true"
        onClick={handleDropdown}
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
            <a className="dropdown-item" href={`/at3/keeper-edit/${getId}`}>
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
  );
}

export default HamburgerBar;
