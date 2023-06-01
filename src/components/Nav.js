import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../stylesheets/Nav.css";
import userContext from './userContext';
/** Navigation bar present throughout Jobly App
 *
 * App -> Nav
 */
function Nav({ logout }) {

  const { currUser } = useContext(userContext);
  const navigate = useNavigate();

  function logoutAndSendHome() {
    logout();
    navigate("/");
  }

  return (
    <nav className="navbar navbar-light">
      <div>
        <Link className="nav-link" to="/">Jobly</Link>
      </div>

      {currUser.data
        ?
        <div>
          <Link className="btn btn-secondary nav-link" to="/companies">
            Companies
          </Link>
          <Link className="btn btn-secondary nav-link" to="/jobs">
            Jobs
          </Link>
          <Link className="btn btn-secondary nav-link" to="/profile">
            Profile
          </Link>
          <p className="btn btn-secondary nav-link" onClick={logoutAndSendHome}>
            {`Log out ${currUser.data.username}`}
          </p>
        </div>
        :
        <div>
          <Link className="btn btn-secondary nav-link" to="/signup">
            Sign Up
          </Link>
          <Link className="btn btn-secondary nav-link" to="/login">
            Login
          </Link>
        </div>
      }

    </nav>
  );
}

export default Nav;