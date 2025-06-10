import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav className="w-full flex justify-end p-4 pr-8">
        <ul className="flex gap-6 list-none">
          <li className="p-2">
            <Link className="no-underline" to="/"></Link>
          </li>
          <li>
            <Link className="no-underline" to="/login">Logout</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;