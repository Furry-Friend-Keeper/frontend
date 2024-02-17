import React, {useEffect} from 'react'
import { useNavigate ,Navigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ProtectedKeeperRoute({ element: Element }) {
    const { loading, userInfo, error, success } = useSelector((state) => state.auth)  
    const { keeperId } = useParams(); // Extract keeperId from URL
    const navigate = useNavigate()
  
    useEffect(() => {
      if (!success) {
        // Redirect to login if not logged in
          navigate('/at3/');
      } else if (userInfo?.id !== keeperId) {
        // Redirect to their keeper edit page if keeperId doesn't match
          navigate(`/at3/keeper-edit/${userInfo?.id}`);
      }
      // Adding navigate, success, userInfo, and keeperId as dependencies ensures that
      // the effect runs again if any of these values change.
    }, [navigate, success, userInfo, keeperId]);
  
    // If everything checks out, render the requested component
    return <Element />;
}

export default ProtectedKeeperRoute