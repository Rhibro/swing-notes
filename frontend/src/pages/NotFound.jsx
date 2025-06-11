import { Link } from "react-router";

const NotFound = () => {
  return (
    <>
      <h1>404</h1>
      <h1>Not Found</h1>
      <h1>¯\_(ツ)_/¯</h1>
      <p>Looks like this page isn't available...</p>
      <button>
        <Link className="no-underline" to="/">Login</Link>
      </button>
    </>
  ) 
};

export default NotFound;