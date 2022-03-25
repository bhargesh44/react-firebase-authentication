import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { user } = useUserAuth();
  console.log("Check user in Private::", user);
  if (!user) {
    navigate("/login");
  }
  return children;
};

export default ProtectedRoute;
