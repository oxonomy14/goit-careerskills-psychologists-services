import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuthUser } from '../../redux/authSelector'; 

const PrivateRoute = ({ children }) => {
  const user = useSelector(selectAuthUser); 

  if (!user) {
    return <Navigate to="/" replace />; 
  }

  return children;
};

export default PrivateRoute;
