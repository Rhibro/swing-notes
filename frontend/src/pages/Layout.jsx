import { Outlet, Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      <nav className="w-full flex justify-end p-4 pr-8">
        <ul className="flex gap-6 list-none">
          {/* <li className="p-2">
            <Link className="no-underline" to="/"></Link>
          </li> */}
          {location.pathname !== "/" && "/*" && (
            <li>
            <button className="formBtn" onClick={handleLogout}>
              <Link className="no-underline" to="/login">Logout</Link>
            </button>
          </li>
          )}
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;