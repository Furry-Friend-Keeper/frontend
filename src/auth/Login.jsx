import { useState } from "react";
import {useNavigate} from 'react-router-dom';
import Navbar from '../layouts/Navbar';

function Login() {
    const navigate = useNavigate();
    const clickToRoot = () => navigate('/');

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const handleUsernameChange = (event) => {
      setUsername(event.target.value);
    };
  
    const handlePasswordChange = (event) => {
      setPassword(event.target.value);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      // Add your login logic here
      console.log('Username:', username);
      console.log('Password:', password);
    };
  
    return (
      <>
      <Navbar/>
      <div className="container pt-5">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={username}
              onChange={handleUsernameChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <button type="submit" className="btn fw-semibold btn-primary" onClick={clickToRoot}>
            Submit
          </button>
        </form>
      </div>
      </>
    );
}

export default Login