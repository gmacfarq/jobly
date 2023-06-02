import { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
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
        <NavLink className="nav-link" to="/">Jobly</NavLink>
      </div>

      {currUser.data
        ?
        <div>
          <NavLink className="btn btn-secondary nav-link" to="/companies">
            Companies
          </NavLink>
          <NavLink className="btn btn-secondary nav-link" to="/jobs">
            Jobs
          </NavLink>
          <NavLink className="btn btn-secondary nav-link" to="/profile">
            Profile
          </NavLink>
          <p className="btn btn-secondary nav-link" onClick={logoutAndSendHome}>
            {`Log out ${currUser.data.username}`}
          </p>
        </div>
        :
        <div>
          <NavLink className="btn btn-secondary nav-link" to="/signup">
            Sign Up
          </NavLink>
          <NavLink className="btn btn-secondary nav-link" to="/login">
            Login
          </NavLink>
        </div>
      }

    </nav>
  );
}

export default Nav;