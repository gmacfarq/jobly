import { Link } from 'react-router-dom';
import "../stylesheets/Nav.css"
/** Navigation bar present throughout Jobly App
 *
 * App -> Nav
 */
function Nav() {
  return (
    <nav className="navbar navbar-light">
      <div>
          <Link className="nav-link" to="/">Jobly</Link>
      </div>
      <div>
          <Link className="btn btn-secondary nav-link" to="/companies">
            Companies
          </Link>
          <Link className="btn btn-secondary nav-link" to="/jobs">
            Jobs
          </Link>
      </div>
    </nav>
  );
}

export default Nav;