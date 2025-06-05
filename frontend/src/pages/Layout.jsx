import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav className="w-full flex justify-end p-4 pr-8">
        <ul className="flex gap-6 list-none">
          <li>
            <Link className="no-underline" to="/">Home</Link>
          </li>
          <li>
            <Link className="no-underline" to="/login">Login</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;