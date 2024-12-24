import { useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
// import { authProvider } from "../auth";
import { LoaderFunctionArgs} from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export function loader({ request }: LoaderFunctionArgs) {
  /*
  if (!authProvider.isAuthenticated) {
    const params = new URLSearchParams();
    params.set("from", new URL(request.url).pathname);
    return redirect("login?" + params.toString());
  }
    */
  // will be handled inside the component
  // redirect is intended for use in loaders and actions
  // performs navigation after components have rendered
  return null;
}

const Notes = () => {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  // const fetcher = useFetcher();

  useEffect(() => {
    if (!isAuthenticated) {
      const params = new URLSearchParams();
      params.set("from", location.pathname);
      navigate("login?" + params.toString());
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    console.log('handleLogout ')
    logout();
    navigate("/login");
  }

  return (
    <>
      <div>Notes</div>
      <Link to="/login">Go to login page</Link>
      <button onClick={handleLogout}>Sign out</button>
      <Outlet />
    </>
  );
};

export default Notes;
